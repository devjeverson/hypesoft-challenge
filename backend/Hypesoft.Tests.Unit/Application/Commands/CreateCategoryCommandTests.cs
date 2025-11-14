using FluentAssertions;
using Hypesoft.Application.Commands.Categories;
using Xunit;

namespace Hypesoft.Tests.Unit.Application.Commands
{
    public class CreateCategoryCommandTests
    {
        [Fact]
        public void Command_ShouldStoreName()
        {
            var cmd = new CreateCategoryCommand("Headsets");
            cmd.Name.Should().Be("Headsets");
        }
    }
}
