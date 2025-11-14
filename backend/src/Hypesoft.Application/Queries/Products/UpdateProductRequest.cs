using System;

namespace Hypesoft.Application.Commands.Products
{
    public record UpdateProductRequest(
        string Name,
        string Description,
        decimal Price,
        int QuantityInStock,
        Guid CategoryId
    );
}
