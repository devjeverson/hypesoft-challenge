using MediatR;
using System;

namespace Hypesoft.Application.Commands.Categories;

public record UpdateCategoryCommand(Guid Id, string Name) : IRequest<bool>;
