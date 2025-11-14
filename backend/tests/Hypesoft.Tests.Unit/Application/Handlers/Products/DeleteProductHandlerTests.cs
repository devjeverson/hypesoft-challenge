using System;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Xunit;
using Hypesoft.Application.Commands.Products;
using Hypesoft.Application.Handlers.Products;
using Hypesoft.Tests.Unit.Utils;

namespace Hypesoft.Tests.Unit.Application.Handlers.Products
{
    public class DeleteProductHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldDeleteProduct_AndReturnTrue()
        {
            // Arrange
            var repo = MockRepositoryFactory.ProductRepo();

            var id = Guid.NewGuid();

            // DeleteAsync returns Task, not Task<bool>
            repo.Setup(r => r.DeleteAsync(id))
                .Returns(Task.CompletedTask);

            var handler = new DeleteProductHandler(repo.Object);

            // Act
            var result = await handler.Handle(new DeleteProductCommand(id), CancellationToken.None);

            // Assert repository was called once
            repo.Verify(r => r.DeleteAsync(id), Times.Once);

            // Assert handler returns `true`
            result.Should().BeTrue();
        }
    }
}


