using Hypesoft.Application.Abstractions.Repositories;
using Hypesoft.Infrastructure.Repositories;
using Hypesoft.Infrastructure.Repositories.MongoDb;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Hypesoft.Infrastructure.Configurations
{
    public static class InfrastructureServiceRegistration
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // 1. Configura e registra as opções do MongoDbSettings
            services.Configure<MongoDbSettings>(configuration.GetSection(nameof(MongoDbSettings)));

            // 2. Registra o MongoDbContext como Singleton, garantindo que ele receba as opções configuradas
            services.AddSingleton<MongoDbContext>(sp =>
            {
                var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
                var connectionString = configuration.GetConnectionString("Mongo");
                return new MongoDbContext(connectionString, settings.DatabaseName);
            });

            // 3. Registra os repositórios
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();

            return services;
        }
    }
}
