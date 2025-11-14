using System;
using FluentAssertions;
using Hypesoft.Domain.Entities;
using Xunit;

namespace Hypesoft.Tests.Unit.Domain
{
    public class CategoryTests
    {
        [Fact]
        public void Constructor_ShouldCreateCategory()
        {
            var c = new Category("Periféricos");
            c.Name.Should().Be("Periféricos");
        }

        [Fact]
        public void Update_ShouldModifyCategory()
        {
            var c = new Category("Old");
            c.Update("New");

            c.Name.Should().Be("New");
        }
    }
}
