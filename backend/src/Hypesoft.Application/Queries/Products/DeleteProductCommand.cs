using MediatR;
using System;

namespace Hypesoft.Application.Commands.Products
{
    public record DeleteProductCommandV2(Guid Id) : IRequest<Unit>;
}
