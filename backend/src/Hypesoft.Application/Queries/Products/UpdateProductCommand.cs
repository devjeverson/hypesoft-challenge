using MediatR;

namespace Hypesoft.Application.Queries.Products
{
    public record UpdateProductCommand(
        Guid Id,
        string Name,
        string Description,
        decimal Price,
        int QuantityInStock,
        Guid CategoryId
    ) : IRequest<bool>;
}
