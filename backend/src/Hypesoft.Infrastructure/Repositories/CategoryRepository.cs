using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;
using MongoDB.Driver;

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

        public async Task<bool> UpdateAsync(Category category)
        {
            var result = await _collection.ReplaceOneAsync(
                filter: c => c.Id == category.Id,
                replacement: category
            );

            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task DeleteAsync(Guid id)
        {
            await _collection.DeleteOneAsync(c => c.Id == id);
        }

        public async Task<Category?> GetByIdAsync(Guid id)
        {
            return await _collection.Find(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }
    }
}
