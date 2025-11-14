using System;

namespace Hypesoft.Domain.Entities
{
    public sealed class Category
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; } = string.Empty;

        public Category(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Nome da categoria é obrigatório.");
            Id = Guid.NewGuid();
            Name = name;
        }

        public void Update(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Nome da categoria é obrigatório.");
            Name = name;
        }
    }
}
