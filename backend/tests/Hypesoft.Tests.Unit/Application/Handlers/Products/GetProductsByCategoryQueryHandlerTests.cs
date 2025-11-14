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
using Hypesoft.Domain.Entities;
using Hypesoft.Tests.Unit.Utils;

namespace Hypesoft.Tests.Unit.Application.Handlers.Products
{
    public class GetProductsByCategoryQueryHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldReturnProductsFromCategory()
        {
            var repo = MockRepositoryFactory.ProductRepo();
            var mapper = MockRepositoryFactory.Mapper();

            var categoryId = Guid.NewGuid();

            var list = new List<Product>
            {
                new Product("Mouse", "Gamer", 200, 5, categoryId),
                new Product("Teclado", "Mecânico", 300, 10, Guid.NewGuid()),
            };

            repo.Setup(r => r.GetByCategoryAsync(categoryId)).ReturnsAsync(list.Where(p => p.CategoryId == categoryId));

            var handler = new GetProductsByCategoryQueryHandler(repo.Object, mapper);

            var result = await handler.Handle(new GetProductsByCategoryQuery(categoryId), CancellationToken.None);

            result.Should().HaveCount(1);
            result.First().CategoryId.Should().Be(categoryId);
        }
    }
}
