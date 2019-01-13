using OrderKeeper.EventBus.Events;

namespace OrderKeeper.EventBus.Interfaces
{
    public interface IEventBus
    {
        void Publish(IntegrationEvent @event);

        void Subscribe<T, TH>()
            where T : IntegrationEvent
            where TH : IIntegrationEventHandler<T>;

        void Unsubscribe<T, TH>()
            where T : IntegrationEvent
            where TH : IIntegrationEventHandler<T>;

        void Subscribe<TH>(string eventName)
            where TH : IDynamicIntegrationEventHandler;

        void Unsubscribe<TH>(string eventName)
            where TH : IDynamicIntegrationEventHandler;
    }
}
