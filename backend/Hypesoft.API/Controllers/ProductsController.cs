using Microsoft.AspNetCore.Mvc;
using MediatR;
using Hypesoft.Application.Commands.Products;
using Hypesoft.Application.Queries.Products;
using Hypesoft.Application.DTOs;
using Hypesoft.API.DTOs;

namespace Hypesoft.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductsController(IMediator mediator) => _mediator = mediator;

        // CREATE
        [HttpPost]
        public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductCommand command)
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        // GET ALL
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll(
            [FromQuery] string? name,
            [FromQuery] Guid? categoryId)
        {
            var query = new GetAllProductsQuery(name, categoryId);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        // GET by ID
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ProductDto>> GetById(Guid id)
        {
            var result = await _mediator.Send(new GetProductByIdQuery(id));
            return result is null ? NotFound() : Ok(result);
        }

        // GET LOW STOCK
        [HttpGet("low-stock")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetLowStock()
        {
            var result = await _mediator.Send(new GetLowStockProductsQuery());
            return Ok(result);
        }

        // UPDATE
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<ProductDto>> Update(Guid id, [FromBody] UpdateProductRequest request)
        {
            var command = new Application.Commands.Products.UpdateProductCommand(
                id,
                request.Name,
                request.Description,
                request.Price,
                request.QuantityInStock,
                request.CategoryId
            );
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        // DELETE
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _mediator.Send(new Application.Commands.Products.DeleteProductCommand(id));
            return NoContent();
        }
    }
}
