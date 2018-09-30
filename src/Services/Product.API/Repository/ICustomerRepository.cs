using ProductManagement.API.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductManagement.API.Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> GetProductAsync(int customerId);
        Task<Product> AddProductAsync(Product customer);
        Task<Product> UpdateProductAsync(Product customer);
        Task<bool> DeleteProductAsync(int customerId);
    }
}