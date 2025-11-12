using MediatR;
using System;

namespace Hypesoft.Application.Commands.Categories
{
    public record DeleteCategoryCommand(Guid Id) : IRequest<Unit>;
}
