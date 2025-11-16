using Hypesoft.Application.Abstractions.Repositories;
using Hypesoft.Infrastructure.Data;
using Hypesoft.Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Hypesoft.Infrastructure.Configurations
{
    public static class InfrastructureServiceRegistration
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // Registra o MongoDbContext como Singleton. Ele resolverá IConfiguration automaticamente.
            services.AddSingleton<MongoDbContext>();

            // Registra os repositórios
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<CategoryRepository>();

            return services;
        }
    }
}
