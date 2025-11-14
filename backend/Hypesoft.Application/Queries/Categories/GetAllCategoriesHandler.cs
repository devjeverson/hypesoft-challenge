using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Hypesoft.Application.Queries.Categories;
using Hypesoft.Domain.Repositories;
using Hypesoft.Application.DTOs;

namespace Hypesoft.Application.Handlers.Categories
{
    public sealed class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, IEnumerable<CategoryDto>>
    {
        private readonly ICategoryRepository _repo;

        public GetAllCategoriesQueryHandler(ICategoryRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<CategoryDto>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            var categories = await _repo.GetAllAsync();
            return categories.Select(c => new CategoryDto(c.Id, c.Name));
        }
    }
}
