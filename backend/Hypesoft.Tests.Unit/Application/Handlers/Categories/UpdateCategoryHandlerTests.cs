using System;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Xunit;
using Hypesoft.Application.Commands.Categories;
using Hypesoft.Application.Handlers.Categories;
using Hypesoft.Domain.Entities;
using Hypesoft.Tests.Unit.Utils;

namespace Hypesoft.Tests.Unit.Application.Handlers.Categories
{
    public class UpdateCategoryHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldReturnTrue_WhenCategoryIsUpdated()
        {
            // Arrange
            var repo = MockRepositoryFactory.CategoryRepo();

            var existing = new Category("Headsets");

            repo.Setup(r => r.GetByIdAsync(existing.Id))
                .ReturnsAsync(existing);

            repo.Setup(r => r.UpdateAsync(existing))
                .ReturnsAsync(true);

            var handler = new UpdateCategoryHandler(repo.Object);

            var cmd = new UpdateCategoryCommand(existing.Id, "Periféricos");

            // Act
            var result = await handler.Handle(cmd, CancellationToken.None);

            // Assert
            result.Should().BeTrue();
            existing.Name.Should().Be("Periféricos");
        }

        [Fact]
        public async Task Handle_ShouldReturnFalse_WhenCategoryNotFound()
        {
            // Arrange
            var repo = MockRepositoryFactory.CategoryRepo();

            repo.Setup(r => r.GetByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync((Category?)null);

            var handler = new UpdateCategoryHandler(repo.Object);

            var cmd = new UpdateCategoryCommand(Guid.NewGuid(), "Whatever");

            // Act
            var result = await handler.Handle(cmd, CancellationToken.None);

            // Assert
            result.Should().BeFalse();
        }
    }
}
