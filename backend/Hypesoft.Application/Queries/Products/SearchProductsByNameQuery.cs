using MediatR;
using Hypesoft.Application.DTOs;

namespace Hypesoft.Application.Queries.Products
{
    public record SearchProductsByNameQuery(string Name) : IRequest<IEnumerable<ProductDto>>;
}
