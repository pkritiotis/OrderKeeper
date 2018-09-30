using Microsoft.EntityFrameworkCore;
using ProductManagement.API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagement.API.Repository
{
    public class DbProductRepository : IProductRepository
    {
        private ProductContext _productContext;

        public DbProductRepository(ProductContext productContext)
        {
            _productContext = productContext;
        }
        public async Task<Product> AddProductAsync(Product product)
        {
            var productResult = await _productContext.AddAsync(product);
            await _productContext.SaveChangesAsync();
            return productResult.Entity;
        }

        public async Task<bool> DeleteProductAsync(int productId)
        {
            var product = new Product { Id = productId };
            _productContext.Product.Attach(product);
            _productContext.Product.Remove(product);
            return await _productContext.SaveChangesAsync() > 0;
        }

        public async Task<Product> GetProductAsync(int productId)
        {
            return await _productContext.Product.SingleAsync(c => c.Id == productId);
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _productContext.Product.ToListAsync();
        }

        public async Task<Product> UpdateProductAsync(Product product)
        {
            _productContext.Product.Attach(product);
            _productContext.Product.Update(product);
            await _productContext.SaveChangesAsync();
            return product;
        }
    }
}
