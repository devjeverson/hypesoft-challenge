using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Configurations
{
    public static class MongoDbConfiguration
    {
        public static IServiceCollection AddMongoDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            var settings = new MongoDbSettings
            {
                ConnectionString = configuration.GetConnectionString("Mongo")
                    ?? throw new ArgumentNullException("ConnectionStrings:Mongo não foi encontrada."),
                
                DatabaseName = configuration["Database:Name"]
                    ?? throw new ArgumentNullException("Database:Name não foi encontrado.")
            };

            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            services.AddSingleton(database);

            return services;
        }
    }
}
