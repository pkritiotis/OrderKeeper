using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerManagement.API.Model
{
    public class CustomerRepository : ICustomerRepository
    {
        public Task<Customer> AddCustomerAsync(Customer customer)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteCustomerAsync(string customerId)
        {
            throw new NotImplementedException();
        }

        public Task<Customer> GetCustomerAsync(string customerId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Customer>> GetCustomersAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Customer> UpdateCustomerAsync(Customer customer)
        {
            throw new NotImplementedException();
        }
    }
}
