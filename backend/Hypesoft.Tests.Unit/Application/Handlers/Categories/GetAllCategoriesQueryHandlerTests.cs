using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Xunit;
using Hypesoft.Application.Handlers.Categories;
using Hypesoft.Application.Queries.Categories;
using Hypesoft.Domain.Entities;
using Hypesoft.Tests.Unit.Utils;

namespace Hypesoft.Tests.Unit.Application.Handlers.Categories
{
    public class GetAllCategoriesQueryHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldReturnAllCategories()
        {
            var repo = MockRepositoryFactory.CategoryRepo();

            var data = new List<Category>
            {
                new Category("Periféricos"),
                new Category("Monitores")
            };

            repo.Setup(r => r.GetAllAsync())
                .ReturnsAsync(data);

            var handler = new GetAllCategoriesQueryHandler(repo.Object);

            var result = await handler.Handle(new GetAllCategoriesQuery(), CancellationToken.None);

            result.Should().HaveCount(2);
        }
    }
}
