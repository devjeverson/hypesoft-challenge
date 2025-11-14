using Microsoft.AspNetCore.Mvc;
using MediatR;
using Hypesoft.Application.Commands.Categories;
using Hypesoft.Application.Queries.Categories;
using Hypesoft.Application.DTOs;

namespace Hypesoft.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CategoriesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // CREATE
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> Create([FromBody] CreateCategoryCommand command)
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        // GET BY ID
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<CategoryDto>> GetById(Guid id)
        {
            var result = await _mediator.Send(new GetCategoryByIdQuery(id));
            return result is null ? NotFound() : Ok(result);
        }

        // GET ALL
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll()
        {
            var result = await _mediator.Send(new GetAllCategoriesQuery());
            return Ok(result);
        }

        // UPDATE
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateCategoryCommand command)
        {
            var updated = await _mediator.Send(command with { Id = id });
            return updated ? Ok() : NotFound();
        }

        // DELETE
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _mediator.Send(new DeleteCategoryCommand(id));
            return NoContent();
        }
    }

    // Local query type used by the controller when the application-level query type is not available
    internal record GetCategoryByIdQuery(Guid Id) : IRequest<CategoryDto>;
}

