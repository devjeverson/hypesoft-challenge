using MediatR;
using Hypesoft.Application.Commands.Categories;
using Hypesoft.Domain.Repositories;

namespace Hypesoft.Application.Handlers.Categories
{
    public class DeleteCategoryHandler : IRequestHandler<DeleteCategoryCommand, bool>
    {
        private readonly ICategoryRepository _repo;

        public DeleteCategoryHandler(ICategoryRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            await _repo.DeleteAsync(request.Id);
            return true;
        }
    }
}
