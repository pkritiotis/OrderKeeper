using Microsoft.EntityFrameworkCore;
using Ordering.API.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderManagement.API.Repository
{
    public class DbOrderRepository : IOrderRepository
    {
        private OrderContext _orderContext;

        public DbOrderRepository(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }
        public async Task<Order> AddOrderAsync(Order order)
        {
            var orderResult = await _orderContext.AddAsync(order);
            await _orderContext.SaveChangesAsync();
            return orderResult.Entity;
        }

        public async Task<bool> DeleteOrderAsync(long orderId)
        {
            var order = new Order { Id = orderId };
            _orderContext.Order.Attach(order);
            _orderContext.Order.Remove(order);
            return await _orderContext.SaveChangesAsync() >0;
        }

        public async Task<Order> GetOrderAsync(long orderId)
        {
            return await _orderContext.Order.SingleAsync(c => c.Id == orderId);
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            return await _orderContext.Order.ToListAsync();
        }

        public async Task<Order> UpdateOrderAsync(Order order)
        {
            _orderContext.Order.Attach(order);
            _orderContext.Order.Update(order);
            await _orderContext.SaveChangesAsync();
            return order;
        }
    }
}
