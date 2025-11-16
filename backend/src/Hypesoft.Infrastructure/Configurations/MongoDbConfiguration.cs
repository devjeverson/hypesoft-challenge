using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Configurations
{
    public static class MongoDbConfiguration
    {
        public static IServiceCollection AddMongoDb(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Mongo");

            var mongoUrl = new MongoUrl(connectionString);
            var clientSettings = MongoClientSettings.FromUrl(mongoUrl);

            // GuidRepresentation now defaults to V3 internally — no need to configure.

            var client = new MongoClient(clientSettings);

            services.AddSingleton<IMongoClient>(client);

            // Register MongoContext with database
            services.AddScoped(sp =>
            {
                var client = sp.GetRequiredService<IMongoClient>();
                return client.GetDatabase(mongoUrl.DatabaseName);
            });

            return services;
        }
    }
}
