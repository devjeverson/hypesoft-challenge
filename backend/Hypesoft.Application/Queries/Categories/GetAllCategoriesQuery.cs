using MediatR;
using Hypesoft.Application.DTOs;
using System.Collections.Generic;

namespace Hypesoft.Application.Queries.Categories
{
    public record GetAllCategoriesQuery() : IRequest<IEnumerable<CategoryDto>>;
}
