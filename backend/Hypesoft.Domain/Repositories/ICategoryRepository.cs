using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Repositories
{
    public interface ICategoryRepository
    {
        Task AddAsync(Category category);
        Task DeleteAsync(Guid id);
        Task<Category?> GetByIdAsync(Guid id);
        Task<IEnumerable<Category>> GetAllAsync();
    }
}
