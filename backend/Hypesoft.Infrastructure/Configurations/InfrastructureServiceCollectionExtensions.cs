using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Hypesoft.Infrastructure.Data;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Repositories;

namespace Hypesoft.Infrastructure.Configurations
{
    public static class InfrastructureServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // Configurações do MongoDB
            var connectionString = configuration["Mongo:ConnectionString"] ?? "mongodb://localhost:27017";
            var database = configuration["Mongo:Database"] ?? "hypesoft";

            services.AddSingleton<IMongoClient>(_ => new MongoClient(connectionString));

            // Contexto central
            services.AddSingleton<MongoContext>(sp =>
                new MongoContext(
                    sp.GetRequiredService<IMongoClient>(),
                    database
                ));

            // Registrar Repositórios
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();

            return services;
        }
    }
}
