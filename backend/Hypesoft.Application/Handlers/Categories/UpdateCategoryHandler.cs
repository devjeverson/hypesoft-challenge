using MediatR;
using Hypesoft.Application.Commands.Categories;
using Hypesoft.Domain.Repositories;
using Hypesoft.Domain.Entities;

namespace Hypesoft.Application.Handlers.Categories
{
    public class UpdateCategoryHandler : IRequestHandler<UpdateCategoryCommand, bool>
    {
        private readonly ICategoryRepository _repo;

        public UpdateCategoryHandler(ICategoryRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _repo.GetByIdAsync(request.Id);

            if (category == null) return false;

            category.Update(request.Name);
            return await _repo.UpdateAsync(category);
        }
    }
}
