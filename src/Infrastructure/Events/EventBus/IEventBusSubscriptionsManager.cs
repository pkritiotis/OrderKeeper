using OrderKeeper.EventBus.Events;
using OrderKeeper.EventBus.Interfaces;
using System;
using System.Collections.Generic;
using static OrderKeeper.EventBus.InMemoryEventBusSubscriptionsManager;

namespace OrderKeeper.EventBus
{
    public interface IEventBusSubscriptionsManager
    {
        bool IsEmpty { get; }
        event EventHandler<string> OnEventRemoved;

        void AddSubscription<T, TH>()
           where T : IntegrationEvent
           where TH : IIntegrationEventHandler<T>;

        void RemoveSubscription<T, TH>()
           where TH : IIntegrationEventHandler<T>
           where T : IntegrationEvent;

        void RemoveSubscription<TH>(string eventName)
            where TH : IDynamicIntegrationEventHandler;

        void AddSubscription<TH>(string eventName)
            where TH : IDynamicIntegrationEventHandler;

        bool HasSubscriptionsForEvent<T>() where T : IntegrationEvent;
        bool HasSubscriptionsForEvent(string eventName);
        Type GetEventTypeByName(string eventName);
        void Clear();
        IEnumerable<SubscriptionInfo> GetHandlersForEvent<T>() where T : IntegrationEvent;
        IEnumerable<SubscriptionInfo> GetHandlersForEvent(string eventName);
        string GetEventKey<T>();
    }
}
