using MediatR;
using System;

namespace Hypesoft.Application.Commands.Categories
{
    public record DeleteCategoryCommandV2(Guid Id) : IRequest<Unit>;
}
