using System;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OrderKeeper.EventBus.Events;
using OrderKeeper.EventBus.Interfaces;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace OrderKeeper.EventBus.RabbitMq
{
    public class RabbitMqEventBus : IEventBus
    {
        private string BROKER_NAME = "OrderKeeper";
        private string _queueName;
        private IEventBusSubscriptionsManager _subsManager;

        public RabbitMqEventBus(string QueueName, IEventBusSubscriptionsManager subsManager)
        {
            _queueName = QueueName;
            _subsManager = subsManager;


            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: _queueName,
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += async (model, ea) =>
                {
                    var eventName = ea.RoutingKey;
                    var message = Encoding.UTF8.GetString(ea.Body);

                    await ProcessEvent(eventName, message);

                    channel.BasicAck(ea.DeliveryTag, multiple: false);
                };

                channel.BasicConsume(queue: _queueName,
                                     autoAck: false,
                                     consumer: consumer);
            }
        }

        public void Publish(IntegrationEvent @event)
        {
            var eventName = @event.GetType()
                   .Name;
            var message = JsonConvert.SerializeObject(@event);
            var body = Encoding.UTF8.GetBytes(message);

            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.BasicPublish(exchange: BROKER_NAME,
                                routingKey: eventName,
                                basicProperties: null,
                                body: body);
            }
        }

        public void Subscribe<T, TH>()
            where T : IntegrationEvent
            where TH : IIntegrationEventHandler<T>
        {
            var eventName = _subsManager.GetEventKey<T>();
            DoInternalSubscription(eventName);
            _subsManager.AddSubscription<T, TH>();
        }

        private void DoInternalSubscription(string eventName)
        {
            var containsKey = _subsManager.HasSubscriptionsForEvent(eventName);
            if (!containsKey)
            {
                var factory = new ConnectionFactory() { HostName = "localhost" };
                using (var connection = factory.CreateConnection())
                {

                    using (var channel = connection.CreateModel())
                    {
                        channel.QueueBind(queue: _queueName,
                                          exchange: BROKER_NAME,
                                          routingKey: eventName);
                    }
                }
            }
        }

        public void SubscribeDynamic<TH>(string eventName) where TH : IDynamicIntegrationEventHandler
        {
            throw new NotImplementedException();
        }

        public void Unsubscribe<T, TH>()
            where T : IntegrationEvent
            where TH : IIntegrationEventHandler<T>
        {
            throw new NotImplementedException();
        }

        public void UnsubscribeDynamic<TH>(string eventName) where TH : IDynamicIntegrationEventHandler
        {
            throw new NotImplementedException();
        }

        private async Task ProcessEvent(string eventName, string message)
        {
            if (_subsManager.HasSubscriptionsForEvent(eventName))
            {
                var subscriptions = _subsManager.GetHandlersForEvent(eventName);
                foreach (var subscription in subscriptions)
                {
                    var eventType = _subsManager.GetEventTypeByName(eventName);
                    var integrationEvent = JsonConvert.DeserializeObject(message, eventType);
                    var concreteType = typeof(IIntegrationEventHandler<>).MakeGenericType(eventType);
                    await (Task)concreteType.GetMethod("Handle").Invoke(subscription.HandlerType, new object[] { integrationEvent });
                }
            }
        }
    }
}
