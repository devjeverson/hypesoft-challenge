using System;

namespace Hypesoft.API.DTOs
{
    public record UpdateProductRequest(
        string Name,
        string Description,
        decimal Price,
        int QuantityInStock,
        Guid CategoryId
    );
}
