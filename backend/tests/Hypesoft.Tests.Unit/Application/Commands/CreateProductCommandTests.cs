using System;
using FluentAssertions;
using Hypesoft.Application.Commands.Products;
using Xunit;

namespace Hypesoft.Tests.Unit.Application.Commands
{
    public class CreateProductCommandTests
    {
        [Fact]
        public void Command_ShouldStoreProperties()
        {
            var cmd = new CreateProductCommand(
                "Mouse",
                "RGB",
                200,
                5,
                Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")
            );

            cmd.Name.Should().Be("Mouse");
            cmd.Price.Should().Be(200);
        }
    }
}
