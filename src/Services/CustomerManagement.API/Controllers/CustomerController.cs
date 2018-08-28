using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomerManagement.API.Model;
using CustomerManagement.API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CustomerManagement.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class CustomerController : Controller
    {
        private readonly ICustomerRepository _repository;

        public CustomerController(ICustomerRepository repository)
        {
            _repository = repository;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            return Ok(await _repository.GetCustomersAsync());
        }

        [Route("{CustomerId:int}")]
        [HttpGet]
        public async Task<IActionResult> GetCustomer(int CustomerId)
        {
            try
            {
                var Customer = await _repository
                    .GetCustomerAsync(CustomerId);

                return Ok(Customer);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddCustomer([FromBody]Customer Customer)
        {
            try
            {
                var newCustomer = await _repository
                    .AddCustomerAsync(Customer);

                return Ok(newCustomer);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCustomer([FromBody]Customer Customer)
        {
            try
            {
                var updatedCustomer = await _repository
                    .UpdateCustomerAsync(Customer);

                return Ok(updatedCustomer);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCustomer(int CustomerId)
        {
            try
            {
                var deleteCustomerResult = await _repository
                    .DeleteCustomerAsync(CustomerId);

                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                return NotFound();
            }

        }

    }
}
