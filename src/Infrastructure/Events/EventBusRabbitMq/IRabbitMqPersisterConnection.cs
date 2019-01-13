using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Text;

namespace OrderKeeper.EventBus.RabbitMq
{
    public interface IRabbitMqPersistentConnection : IDisposable
    {
        bool IsConnected { get; }

        bool TryConnect();

        IModel CreateModel();
    }
}
