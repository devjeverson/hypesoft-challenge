using System;
using Xunit;
using Hypesoft.Domain.Entities;

namespace Hypesoft.Tests.Domain
{
    public class ProductTests
    {
        [Fact]
        public void LowStock_ShouldBeTrue_WhenQuantityBelow10()
        {
            // Arrange
            var product = new Product(
                name: "Mouse",
                description: "Gamer",
                price: 100,
                quantity: 5,            // abaixo de 10
                categoryId: Guid.NewGuid()
            );

            // Act
            var result = product.LowStock;

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void LowStock_ShouldBeFalse_WhenQuantity10OrAbove()
        {
            var product = new Product(
                "Mouse",
                "Gamer",
                100,
                10,                     // 10 não é baixo
                Guid.NewGuid()
            );

            Assert.False(product.LowStock);
        }

        [Fact]
        public void Constructor_ShouldThrow_WhenNameIsEmpty()
        {
            Action action = () =>
                new Product(
                    name: "",
                    description: "Desc",
                    price: 100,
                    quantity: 1,
                    categoryId: Guid.NewGuid()
                );

            Assert.Throws<ArgumentException>("name", action);
        }

        [Fact]
        public void Constructor_ShouldThrow_WhenPriceIsZeroOrNegative()
        {
            Action action = () =>
                new Product(
                    "Mouse",
                    "Gamer",
                    price: 0,             // inválido
                    quantity: 1,
                    categoryId: Guid.NewGuid()
                );

            Assert.Throws<ArgumentException>("price", action);
        }

        [Fact]
        public void Update_ShouldApplyChangesCorrectly()
        {
            // Arrange
            var product = new Product(
                "Old",
                "Old Desc",
                50,
                3,
                Guid.NewGuid()
            );

            var newCategory = Guid.NewGuid();

            // Act
            product.Update(
                name: "New",
                description: "New Desc",
                price: 200,
                quantity: 15,
                categoryId: newCategory
            );

            // Assert
            Assert.Equal("New", product.Name);
            Assert.Equal("New Desc", product.Description);
            Assert.Equal(200, product.Price);
            Assert.Equal(15, product.QuantityInStock);
            Assert.Equal(newCategory, product.CategoryId);
        }

        [Fact]
        public void UpdateStock_ShouldApplyQuantity()
        {
            var product = new Product(
                "Mouse",
                "Gamer",
                100,
                5,
                Guid.NewGuid()
            );

            product.UpdateStock(30);

            Assert.Equal(30, product.QuantityInStock);
        }

        [Fact]
        public void UpdateStock_ShouldThrow_WhenQuantityIsNegative()
        {
            var product = new Product(
                "Mouse",
                "Gamer",
                100,
                5,
                Guid.NewGuid()
            );

            Action action = () => product.UpdateStock(-1);

            Assert.Throws<ArgumentException>("newQuantity", action);
        }
    }
}
