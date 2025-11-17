using Hypesoft.Application.Commands.Categories;
using Hypesoft.Application.DTOs;
using Hypesoft.Domain.Repositories;
using Hypesoft.Domain.Entities;
using MediatR;

namespace Hypesoft.Application.Handlers.Categories
{
    public class CreateCategoryHandler : IRequestHandler<CreateCategoryCommand, CategoryDto>
    {
        private readonly ICategoryRepository _categoryRepository;

        public CreateCategoryHandler(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<CategoryDto> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            // Cria usando o novo construtor (somente name)
            var category = new Category(request.Name);

            // Salva no banco
            await _categoryRepository.AddAsync(category);

            // Retorna DTO usando o novo construtor também
            return new CategoryDto(category.Id, category.Name);
        }
    }
}
