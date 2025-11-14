using MediatR;
using Hypesoft.Application.DTOs;

namespace Hypesoft.Application.Queries.Products
{
    public record GetProductsByCategoryQuery(Guid CategoryId) : IRequest<IEnumerable<ProductDto>>;
}
