using MediatR;
using System;

namespace Hypesoft.Application.Commands.Products
{
    public record DeleteProductCommand(Guid Id) : IRequest<Unit>;
}
