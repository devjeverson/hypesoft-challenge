using Moq;
using AutoMapper;
using Hypesoft.Domain.Repositories;

namespace Hypesoft.Tests.Unit.Utils
{
    public static class MockRepositoryFactory
    {
     
        public static Mock<IProductRepository> ProductRepo()
        {
            return new Mock<IProductRepository>();
        }

        public static Mock<ICategoryRepository> CategoryRepo()
        {
            return new Mock<ICategoryRepository>();
        }

        public static IMapper Mapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Hypesoft.Domain.Entities.Product, Hypesoft.Application.DTOs.ProductDto>();
                cfg.CreateMap<Hypesoft.Domain.Entities.Category, Hypesoft.Application.DTOs.CategoryDto>();
            });

            return config.CreateMapper();
        }
    }
}
