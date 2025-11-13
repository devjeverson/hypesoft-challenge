using System;

namespace Hypesoft.Domain.Entities
{
    public sealed class Product
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; } = string.Empty;
        public string Description { get; private set; } = string.Empty;
        public decimal Price { get; private set; }
        public int QuantityInStock { get; private set; }
        public Guid CategoryId { get; private set; }

        public bool LowStock => QuantityInStock < 10;

        public Product(string name, string description, decimal price, int quantity, Guid categoryId)
        {
            if (string.IsNullOrWhiteSpace(name)) throw new ArgumentException(nameof(name));
            if (price <= 0) throw new ArgumentException(nameof(price));
            if (quantity < 0) throw new ArgumentException(nameof(quantity));

            Id = Guid.NewGuid();
            Name = name;
            Description = description;
            Price = price;
            QuantityInStock = quantity;
            CategoryId = categoryId;
        }

        public void Update(string name, string description, decimal price, int quantity, Guid categoryId)
        {
            if (string.IsNullOrWhiteSpace(name)) throw new ArgumentException(nameof(name));
            if (price <= 0) throw new ArgumentException(nameof(price));
            if (quantity < 0) throw new ArgumentException(nameof(quantity));

            Name = name;
            Description = description;
            Price = price;
            QuantityInStock = quantity;
            CategoryId = categoryId;
        }

        public void UpdateStock(int newQuantity)
        {
            if (newQuantity < 0) throw new ArgumentException(nameof(newQuantity));
            QuantityInStock = newQuantity;
        }
    }
}
