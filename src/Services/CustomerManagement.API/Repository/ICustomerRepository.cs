using CustomerManagement.API.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CustomerManagement.API.Repository
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetCustomersAsync();
        Task<Customer> GetCustomerAsync(string customerId);
        Task<Customer> AddCustomerAsync(Customer customer);
        Task<Customer> UpdateCustomerAsync(Customer customer);
        Task<bool> DeleteCustomerAsync(string customerId);
    }
}