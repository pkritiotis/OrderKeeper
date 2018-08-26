using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerManagement.API.Model
{
    public class CustomerContext : DbContext
    {
        public CustomerContext(DbContextOptions<CustomerContext> options) : base(options)
        {
        }
        
        public DbSet<Customer> Customer { get; set; }
    }

    public class CustomerContextDesignFactory : IDesignTimeDbContextFactory<CustomerContext>
    {
        public CustomerContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<CustomerContext>()
                .UseSqlServer(@"Server=pk\sqlexpress;Database=orderkeeper.customer;User Id=orderkeeper_identity;Password=Just4now;");

            return new CustomerContext(optionsBuilder.Options);
        }
    }
}
