using MediatR;
using AutoMapper;
using Hypesoft.Application.DTOs;
using Hypesoft.Application.Queries.Products;
using Hypesoft.Domain.Repositories;

namespace Hypesoft.Application.Handlers.Products
{
    public class GetAllProductsQueryHandler 
        : IRequestHandler<GetAllProductsQuery, IEnumerable<ProductDto>>
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;

        public GetAllProductsQueryHandler(IProductRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductDto>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            var products = await _repo.GetAllAsync();

            // FILTRO POR NOME
            if (!string.IsNullOrWhiteSpace(request.Name))
            {
                products = products
                    .Where(p => p.Name.Contains(request.Name, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            // FILTRO POR CATEGORYID
            if (request.CategoryId is not null)
            {
                products = products
                    .Where(p => p.CategoryId == request.CategoryId)
                    .ToList();
            }

            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }
    }
}
