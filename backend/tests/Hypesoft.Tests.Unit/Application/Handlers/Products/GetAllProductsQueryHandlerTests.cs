using System;
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
using Hypesoft.Application.DTOs;
using Hypesoft.Domain.Entities;
using Hypesoft.Tests.Unit.Utils;

namespace Hypesoft.Tests.Unit.Application.Handlers.Products
{
    public class GetAllProductsQueryHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldReturnAllProducts()
        {
            var repo = MockRepositoryFactory.ProductRepo();
            var mapper = MockRepositoryFactory.Mapper();

            var list = new List<Product>
            {
                new Product("Mouse", "Gamer", 200, 5, Guid.NewGuid()),
                new Product("Teclado", "Mecânico", 350, 2, Guid.NewGuid()),
            };

            repo.Setup(r => r.GetAllAsync()).ReturnsAsync(list);

            var handler = new GetAllProductsQueryHandler(repo.Object, mapper);

            var result = await handler.Handle(new GetAllProductsQuery(null, null), CancellationToken.None);

            result.Should().HaveCount(2);
        }

        [Fact]
        public async Task Handle_ShouldFilterByName()
        {
            var repo = MockRepositoryFactory.ProductRepo();
            var mapper = MockRepositoryFactory.Mapper();

            var list = new List<Product>
            {
                new Product("Mouse Gamer", "RGB", 200, 5, Guid.NewGuid()),
                new Product("Teclado", "ABNT2", 300, 10, Guid.NewGuid())
            };

            repo.Setup(r => r.GetAllAsync()).ReturnsAsync(list);

            var handler = new GetAllProductsQueryHandler(repo.Object, mapper);

            var result = await handler.Handle(new GetAllProductsQuery("Mouse", null), CancellationToken.None);

            result.Should().HaveCount(1);
            result.First().Name.Should().Be("Mouse Gamer");
        }

        [Fact]
        public async Task Handle_ShouldFilterByCategoryId()
        {
            var repo = MockRepositoryFactory.ProductRepo();
            var mapper = MockRepositoryFactory.Mapper();

            var categoryId = Guid.NewGuid();

            var list = new List<Product>
            {
                new Product("Mouse", "Gamer", 200, 5, categoryId),
                new Product("Teclado", "Mecânico", 350, 2, Guid.NewGuid())
            };

            repo.Setup(r => r.GetAllAsync()).ReturnsAsync(list);

            var handler = new GetAllProductsQueryHandler(repo.Object, mapper);

            var result = await handler.Handle(new GetAllProductsQuery(null, categoryId), CancellationToken.None);

            result.Should().HaveCount(1);
            result.First().CategoryId.Should().Be(categoryId);
        }
    }
}
