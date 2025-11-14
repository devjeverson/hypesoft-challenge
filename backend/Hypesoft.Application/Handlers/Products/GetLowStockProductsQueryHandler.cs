using MediatR;
using AutoMapper;
using Hypesoft.Application.DTOs;
using Hypesoft.Application.Queries.Products;
using Hypesoft.Domain.Repositories;

namespace Hypesoft.Application.Handlers.Products
{
    public class GetLowStockProductsQueryHandler 
        : IRequestHandler<GetLowStockProductsQuery, IEnumerable<ProductDto>>
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;

        public GetLowStockProductsQueryHandler(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductDto>> Handle(GetLowStockProductsQuery request, CancellationToken cancellationToken)
        {
            var products = await _repository.GetLowStockAsync();
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }
    }
}
