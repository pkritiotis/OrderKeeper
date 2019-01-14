using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ordering.API.Model;

namespace Ordering.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : Controller
    {
        private readonly IOrderRepository _repository;

        public OrderController(IOrderRepository repository)
        {
            _repository = repository;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            return Ok(await _repository.GetOrdersAsync());
        }

        [Route("{orderId}")]
        [HttpGet]
        public async Task<IActionResult> GetOrder(string orderId)
        {
            try
            {
                var order = await _repository
                    .GetOrderAsync(orderId);

                return Ok(order);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder(Order order)
        {
            try
            {
                var newOrder = await _repository
                    .AddOrderAsync(order);

                return Ok(newOrder);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateOrder(Order order)
        {
            try
            {
                var updatedOrder = await _repository
                    .UpdateOrderAsync(order);

                return Ok(updatedOrder);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteOrder(string orderId)
        {
            try
            {
                var deleteOrderResult = await _repository
                    .DeleteOrderAsync(orderId);

                return Ok(deleteOrderResult);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

    }
}
