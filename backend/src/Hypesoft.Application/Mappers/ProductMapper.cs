using System.Collections.Generic;
using System.Linq;
using Hypesoft.Application.DTOs;
using Hypesoft.Domain.Entities;

namespace Hypesoft.Application.Mappers
{
    public static class ProductMapper
    {
        public static ProductDto? ToDto(Product? product)
        {
            if (product is null)
            {
                return null;
            }

            return new ProductDto(
                product.Id,
                product.Name,
                product.Description,
                product.Price,
                product.QuantityInStock,
                product.CategoryId,
                product.LowStock
            );
        }

        public static IEnumerable<ProductDto> ToDto(IEnumerable<Product> products)
        {
            return products.Select(p => ToDto(p)!);
        }
    }
}
