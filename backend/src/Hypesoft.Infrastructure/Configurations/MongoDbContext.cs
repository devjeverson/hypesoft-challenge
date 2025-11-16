using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Mongo");
            var mongoUrl = new MongoUrl(connectionString);
            var client = new MongoClient(mongoUrl);

            var dbName = mongoUrl.DatabaseName;
            _database = client.GetDatabase(dbName);
        }

        public IMongoCollection<T> GetCollection<T>(string name) => _database.GetCollection<T>(name);
    }
}