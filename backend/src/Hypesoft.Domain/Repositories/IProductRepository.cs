using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Repositories
{
    public interface IProductRepository
    {
        Task AddAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(Guid id);
        Task<Product?> GetByIdAsync(Guid id);
        Task<IEnumerable<Product>> GetAllAsync();
        Task<IEnumerable<Product>> SearchByNameAsync(string name);
        Task<IEnumerable<Product>> GetByCategoryAsync(Guid categoryId);
        Task<IEnumerable<Product>> GetLowStockAsync();
    }
}
