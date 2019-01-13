using System;

namespace OrderKeeper.EventBus
{
    public partial class InMemoryEventBusSubscriptionsManager : IEventBusSubscriptionsManager
    {
        public class SubscriptionInfo
        {
            public bool IsDynamic { get; }
            public Type HandlerType { get; }

            public SubscriptionInfo(bool isDynamic, Type handlerType)
            {
                IsDynamic = isDynamic;
                HandlerType = handlerType;
            }
        }
    }
}
