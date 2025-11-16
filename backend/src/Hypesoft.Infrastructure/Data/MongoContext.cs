using MongoDB.Driver;
using Hypesoft.Domain.Entities;

namespace Hypesoft.Infrastructure.Data
{
    public class MongoContext
    {
        private readonly IMongoDatabase _database;

        public MongoContext(IMongoDatabase database)
        {
            _database = database;
        }

        public IMongoCollection<Category> Categories =>
            _database.GetCollection<Category>("categories");

        public IMongoCollection<Product> Products =>
            _database.GetCollection<Product>("products");
    }
}
