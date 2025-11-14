using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Xunit;
using Hypesoft.Application.Commands.Categories;
using Hypesoft.Application.Handlers.Categories;
using Hypesoft.Domain.Entities;
using Hypesoft.Tests.Unit.Utils;
using AutoMapper;

namespace Hypesoft.Tests.Unit.Application.Handlers
{
    public class CreateCategoryHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldCreateCategory()
        {
            var repo = MockRepositoryFactory.CategoryRepo();

            repo.Setup(r => r.AddAsync(It.IsAny<Category>()))
                .Returns(Task.CompletedTask);

            var mapper = new Mock<IMapper>();


            var handler = new CreateCategoryHandler(repo.Object, mapper.Object);

            var cmd = new CreateCategoryCommand("Headsets");

            var result = await handler.Handle(cmd, CancellationToken.None);

            result.Name.Should().Be("Headsets");
        }
    }
}
