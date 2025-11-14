using Hypesoft.Application.Extensions;
using Hypesoft.Infrastructure.Configurations;
using Serilog;
using Swashbuckle.AspNetCore.SwaggerGen;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;



var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));



// SERILOG
Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(builder.Configuration).CreateLogger();

builder.Host.UseSerilog();

// SWAGGER
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// MVC
builder.Services.AddControllers();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// Application + Infrastructure
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

// (Opcional – Keycloak)
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.Authority = builder.Configuration["Auth:Authority"];
//         options.Audience = builder.Configuration["Auth:Audience"];
//         options.RequireHttpsMetadata = false;
//     });

var app = builder.Build();

// DEV TOOLS
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// MIDDLEWARES
app.UseSerilogRequestLogging();

app.UseCors(MyAllowSpecificOrigins);

// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();

app.Run();
