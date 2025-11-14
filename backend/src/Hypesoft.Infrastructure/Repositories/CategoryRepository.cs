using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;

namespace Hypesoft.Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IMongoCollection<Category> _collection;

        public CategoryRepository(MongoContext context)
        {
            _collection = context.Categories;
        }

        public async Task AddAsync(Category category)
        {
            await _collection.InsertOneAsync(category);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _collection.DeleteOneAsync(c => c.Id == id);
        }

        public async Task<Category?> GetByIdAsync(Guid id)
        {
            var cursor = await _collection.FindAsync(c => c.Id == id);
            return await cursor.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            var cursor = await _collection.FindAsync(FilterDefinition<Category>.Empty);
            return await cursor.ToListAsync();
        }

        public async Task<bool> UpdateAsync(Category category)
        {
            var result = await _collection.ReplaceOneAsync(c => c.Id == category.Id, category);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }
    }
}
