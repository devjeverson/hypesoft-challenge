FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copia todos os csproj
COPY src/Hypesoft.API/Hypesoft.API.csproj src/Hypesoft.API/
COPY src/Hypesoft.Application/Hypesoft.Application.csproj src/Hypesoft.Application/
COPY src/Hypesoft.Domain/Hypesoft.Domain.csproj src/Hypesoft.Domain/
COPY src/Hypesoft.Infrastructure/Hypesoft.Infrastructure.csproj src/Hypesoft.Infrastructure/
COPY tests/Hypesoft.Tests.Unit/Hypesoft.Tests.Unit.csproj tests/Hypesoft.Tests.Unit/
COPY Hypesoft.sln .

# Restore agora funciona
RUN dotnet restore Hypesoft.sln

# Copia o restante
COPY src ./src
COPY tests ./tests

RUN dotnet publish src/Hypesoft.API/Hypesoft.API.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Hypesoft.API.dll"]
