using MongoDB.Driver;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;

namespace Hypesoft.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IMongoCollection<Product> _collection;

        public ProductRepository(MongoContext context)
        {
            _collection = context.Products;
        }

        public async Task AddAsync(Product product)
        {
            await _collection.InsertOneAsync(product);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _collection.DeleteOneAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            var cursor = await _collection.FindAsync(FilterDefinition<Product>.Empty);
            return await cursor.ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetLowStockAsync()
        {
            var cursor = await _collection.FindAsync(p => p.QuantityInStock < 10);
            return await cursor.ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(Guid id)
        {
            var cursor = await _collection.FindAsync(p => p.Id == id);
            return await cursor.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Product>> GetByCategoryAsync(Guid categoryId)
        {
            var cursor = await _collection.FindAsync(p => p.CategoryId == categoryId);
            return await cursor.ToListAsync();
        }

        public async Task UpdateAsync(Product product)
        {
            await _collection.ReplaceOneAsync(p => p.Id == product.Id, product);
        }

        public async Task<IEnumerable<Product>> SearchByNameAsync(string name)
        {
            var filter = Builders<Product>.Filter.Regex(
                x => x.Name,
                new MongoDB.Bson.BsonRegularExpression(name, "i")
            );

            var cursor = await _collection.FindAsync(filter);
            return await cursor.ToListAsync();
        }
    }
}
