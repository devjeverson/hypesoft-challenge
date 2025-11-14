using System;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Xunit;
using Hypesoft.Application.Commands.Products;
using Hypesoft.Application.Handlers.Products;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using AutoMapper;
using Hypesoft.Application.DTOs;

namespace Hypesoft.Tests.Unit.Application.Handlers.Products
{
    public class UpdateProductHandlerTests
    {
        private readonly IMapper _mapper;

        public UpdateProductHandlerTests()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Product, ProductDto>();
            });

            _mapper = config.CreateMapper();
        }

        [Fact]
        public async Task Handle_ShouldUpdateProduct_WhenValid()
        {
            // Arrange
            var productId = Guid.NewGuid();
            var categoryId = Guid.NewGuid();

            var existing = new Product("Old Name", "Old Desc", 50, 2, categoryId);

            var repo = new Mock<IProductRepository>();
            repo.Setup(r => r.GetByIdAsync(productId))
                .ReturnsAsync(existing);

            repo.Setup(r => r.UpdateAsync(It.IsAny<Product>()))
                .Returns(Task.CompletedTask);

            var handler = new UpdateProductHandler(repo.Object, _mapper);

            var cmd = new UpdateProductCommand(
                productId,
                "New Name",
                "New Desc",
                100,
                10,
                categoryId
            );

            // Act
            var result = await handler.Handle(cmd, CancellationToken.None);

            // Assert
            result.Name.Should().Be("New Name");
            result.Price.Should().Be(100);
            result.QuantityInStock.Should().Be(10);

            repo.Verify(r => r.UpdateAsync(existing), Times.Once);
        }
    }
}
