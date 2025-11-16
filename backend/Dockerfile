FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia apenas os csproj e sln
COPY ["src/Hypesoft.API/Hypesoft.API.csproj", "Hypesoft.API/"]
COPY ["src/Hypesoft.Domain/Hypesoft.Domain.csproj", "Hypesoft.Domain/"]
COPY ["src/Hypesoft.Application/Hypesoft.Application.csproj", "Hypesoft.Application/"]
COPY ["src/Hypesoft.Infrastructure/Hypesoft.Infrastructure.csproj", "Hypesoft.Infrastructure/"]
COPY ["tests/Hypesoft.Tests.Unit/Hypesoft.Tests.Unit.csproj", "tests/Hypesoft.Tests.Unit/"]
COPY Hypesoft.sln .

# Restore
RUN dotnet restore

# Copia o restante sem duplicar pastas
COPY src/Hypesoft.API/ Hypesoft.API/
COPY src/Hypesoft.Domain/ Hypesoft.Domain/
COPY src/Hypesoft.Application/ Hypesoft.Application/
COPY src/Hypesoft.Infrastructure/ Hypesoft.Infrastructure/
COPY tests/Hypesoft.Tests.Unit/ tests/Hypesoft.Tests.Unit/

# Publish
RUN dotnet publish Hypesoft.API/Hypesoft.API.csproj -c Release -o /app/publish

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Hypesoft.API.dll"]

