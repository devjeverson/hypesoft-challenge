using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;

namespace Hypesoft.Infrastructure.Configurations
{
    public static class MongoGuidConfiguration
    {
        public static void Configure()
        {
            // Define serialização padrão dos GUIDs como GUID padrão do .NET (C# format)
            BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));
        }
    }
}
