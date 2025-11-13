using MediatR;
using AutoMapper;
using Hypesoft.Application.Queries.Products;
using Hypesoft.Application.DTOs;
using Hypesoft.Domain.Repositories;

namespace Hypesoft.Application.Handlers.Products
{
    public class GetAllProductsHandler : IRequestHandler<GetAllProductsQuery, IEnumerable<ProductDto>>
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;

        public GetAllProductsHandler(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductDto>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Hypesoft.Domain.Entities.Product> products;

            if (!string.IsNullOrWhiteSpace(request.Name))
            {
                products = await _repository.SearchByNameAsync(request.Name);
            }
            else if (request.CategoryId.HasValue)
            {
                products = await _repository.GetByCategoryAsync(request.CategoryId.Value);
            }
            else
            {
                products = await _repository.GetAllAsync();
            }

            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }
    }
}
