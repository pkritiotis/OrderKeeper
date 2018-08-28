using CustomerManagement.API.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerManagement.API.Repository
{
    public class DbCustomerRepository : ICustomerRepository
    {
        private CustomerContext _customerContext;

        public DbCustomerRepository(CustomerContext customerContext)
        {
            _customerContext = customerContext;
        }
        public async Task<Customer> AddCustomerAsync(Customer customer)
        {
            var customerResult = await _customerContext.AddAsync(customer);
            await _customerContext.SaveChangesAsync();
            return customerResult.Entity;
        }

        public async Task<bool> DeleteCustomerAsync(int customerId)
        {
            var customer = new Customer { Id = customerId };
            _customerContext.Customer.Attach(customer);
            _customerContext.Customer.Remove(customer);
            return await _customerContext.SaveChangesAsync() >0;
        }

        public async Task<Customer> GetCustomerAsync(int customerId)
        {
            return await _customerContext.Customer.SingleAsync(c => c.Id == customerId);
        }

        public async Task<IEnumerable<Customer>> GetCustomersAsync()
        {
            return await _customerContext.Customer.ToListAsync();
        }

        public async Task<Customer> UpdateCustomerAsync(Customer customer)
        {
            _customerContext.Customer.Attach(customer);
            _customerContext.Customer.Update(customer);
            await _customerContext.SaveChangesAsync();
            return customer;
        }
    }
}
