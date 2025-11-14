using MediatR;

namespace Hypesoft.Application.Commands.Products
{
    public record DeleteProductCommand(Guid Id) : IRequest<bool>;
}
