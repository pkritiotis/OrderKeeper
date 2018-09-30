using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagement.API.Model;
using ProductManagement.API.Repository;

namespace ProductManagement.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class ProductController : Controller
    {
        private readonly IProductRepository _repository;

        public ProductController(IProductRepository repository)
        {
            _repository = repository;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return Ok(await _repository.GetProductsAsync());
        }

        [Route("{ProductId:int}")]
        [HttpGet]
        public async Task<IActionResult> GetProduct(int ProductId)
        {
            try
            {
                var Product = await _repository
                    .GetProductAsync(ProductId);

                return Ok(Product);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody]Product Product)
        {
            try
            {
                var newProduct = await _repository
                    .AddProductAsync(Product);

                return Ok(newProduct);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromBody]Product Product)
        {
            try
            {
                var updatedProduct = await _repository
                    .UpdateProductAsync(Product);

                return Ok(updatedProduct);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProduct(int ProductId)
        {
            try
            {
                var deleteProductResult = await _repository
                    .DeleteProductAsync(ProductId);

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
