using MediatR;
using Hypesoft.Application.DTOs;
using System;

namespace Hypesoft.Application.Commands.Products
{
    public record CreateProductCommand(
        string Name,
        string Description,
        decimal Price,
        int QuantityInStock,
        Guid CategoryId
    ) : IRequest<ProductDto>;
}
