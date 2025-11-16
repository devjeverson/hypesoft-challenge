using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Repositories.MongoDb
{
    // Tornando a classe pública para ser acessível por outros projetos.
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(string connectionString)
        {
            var mongoUrl = new MongoUrl(connectionString);
            var client = new MongoClient(mongoUrl);
            // Usa o nome do banco de dados da string de conexão.
            var dbName = mongoUrl.DatabaseName;
            _database = client.GetDatabase(dbName);
        }

        public IMongoCollection<T> GetCollection<T>(string name) => _database.GetCollection<T>(name);
    }
}
using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Repositories.MongoDb
{
    // Tornando a classe pública para ser acessível por outros projetos.
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(string connectionString)
        {
            var mongoUrl = new MongoUrl(connectionString);
            var client = new MongoClient(mongoUrl);
            // Usa o nome do banco de dados da string de conexão.
            var dbName = mongoUrl.DatabaseName;
            _database = client.GetDatabase(dbName);
        }

        public IMongoCollection<T> GetCollection<T>(string name) => _database.GetCollection<T>(name);
    }
}