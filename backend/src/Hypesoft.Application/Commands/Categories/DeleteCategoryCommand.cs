using MediatR;

namespace Hypesoft.Application.Commands.Categories
{
    public record DeleteCategoryCommand(Guid Id) : IRequest<bool>;
}
