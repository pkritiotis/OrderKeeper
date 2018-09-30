using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagement.API.Model
{
    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options) : base(options)
        {
        }
        
        public DbSet<Product> Product { get; set; }
    }

    public class CustomerContextDesignFactory : IDesignTimeDbContextFactory<ProductContext>
    {
        public ProductContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ProductContext>()
                .UseSqlServer(@"Server=pk\sqlexpress;Database=orderkeeper.product;User Id=orderkeeper_identity;Password=Just4now;");

            return new ProductContext(optionsBuilder.Options);
        }
    }
}
