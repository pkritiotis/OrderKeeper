using System.Threading.Tasks;

namespace OrderKeeper.EventBus.Interfaces
{
    public interface IDynamicIntegrationEventHandler
    {
        Task Handle(dynamic eventData);
    }
}
