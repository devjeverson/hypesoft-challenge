using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Configurations;

public static class MongoDbConfiguration
{
    public static IServiceCollection AddMongoDb(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Mongo");

        var mongoUrl = new MongoUrl(connectionString);
        var settings = MongoClientSettings.FromUrl(mongoUrl);

        // Versão moderna do driver — GuidRepresentation é V3 por padrão
        var client = new MongoClient(settings);

        services.AddSingleton<IMongoClient>(client);

        services.AddScoped(sp =>
        {
            var client = sp.GetRequiredService<IMongoClient>();
            return client.GetDatabase(mongoUrl.DatabaseName);
        });

        return services;
    }
}
