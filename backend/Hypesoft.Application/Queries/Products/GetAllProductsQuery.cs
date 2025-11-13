using MediatR;
using Hypesoft.Application.DTOs;
using System;

namespace Hypesoft.Application.Queries.Products
{
    public record GetAllProductsQuery(string? Name, Guid? CategoryId) : IRequest<IEnumerable<ProductDto>>;
}
