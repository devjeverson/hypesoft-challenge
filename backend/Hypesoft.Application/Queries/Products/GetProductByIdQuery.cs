using MediatR;
using Hypesoft.Application.DTOs;
using System;

namespace Hypesoft.Application.Queries.Products
{
    public record GetProductByIdQuery(Guid Id) : IRequest<ProductDto?>;
}
