using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using Moq;
using Xunit;
using Hypesoft.Application.Handlers.Products;
using Hypesoft.Application.Queries.Products;
using Hypesoft.Domain.Entities;
using Hypesoft.Tests.Unit.Utils;
using System;


namespace Hypesoft.Tests.Unit.Application.Handlers.Products
{
    public class GetLowStockProductsQueryHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldReturnLowStockProducts()
        {
            var repo = MockRepositoryFactory.ProductRepo();
            var mapper = MockRepositoryFactory.Mapper();

            var list = new List<Product>
            {
                new Product("Mouse", "Gamer", 200, 3, Guid.NewGuid()),
                new Product("Teclado", "Mecânico", 300, 15, Guid.NewGuid()),
            };

            repo.Setup(r => r.GetLowStockAsync())
                .ReturnsAsync(list.Where(p => p.QuantityInStock < 10));

            var handler = new GetLowStockProductsQueryHandler(repo.Object, mapper);

            var result = await handler.Handle(new GetLowStockProductsQuery(), CancellationToken.None);

            result.Should().HaveCount(1);
            result.First().LowStock.Should().BeTrue();
        }
    }
}
