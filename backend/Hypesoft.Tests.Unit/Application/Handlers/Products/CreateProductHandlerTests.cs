using System;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Xunit;
using Hypesoft.Application.Commands.Products;
using Hypesoft.Application.Handlers.Products;
using Hypesoft.Domain.Entities;
using Hypesoft.Tests.Unit.Utils;
using AutoMapper;
using Hypesoft.Application.DTOs;



namespace Hypesoft.Tests.Unit.Application.Handlers
{
    public class CreateProductHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldCreateProduct()
        {
            var repo = MockRepositoryFactory.ProductRepo();

            repo.Setup(r => r.AddAsync(It.IsAny<Product>()))
                .Returns(Task.CompletedTask);

            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Product, ProductDto>();
            });
            var mapper = config.CreateMapper();

            var handler = new CreateProductHandler(repo.Object, mapper);

            var cmd = new CreateProductCommand(
                "Mouse",
                "Gamer",
                250,
                3,
                Guid.NewGuid()
            );

            var result = await handler.Handle(cmd, CancellationToken.None);

            result.Name.Should().Be("Mouse");
            repo.Verify(x => x.AddAsync(It.IsAny<Product>()), Times.Once);
        }
    }

   
}
