FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia os arquivos de projeto (.csproj) e solução (.sln) primeiro.
# Isso otimiza o cache do Docker, pois o 'dotnet restore' só será executado novamente se as dependências mudarem. 
# Os caminhos agora incluem a pasta 'src'.
COPY ["src/Hypesoft.API/Hypesoft.API.csproj", "src/Hypesoft.API/"]
COPY ["src/Hypesoft.Domain/Hypesoft.Domain.csproj", "src/Hypesoft.Domain/"]
COPY ["src/Hypesoft.Application/Hypesoft.Application.csproj", "src/Hypesoft.Application/"]
COPY ["src/Hypesoft.Infrastructure/Hypesoft.Infrastructure.csproj", "src/Hypesoft.Infrastructure/"]
COPY ["tests/Hypesoft.Tests.Unit/Hypesoft.Tests.Unit.csproj", "tests/Hypesoft.Tests.Unit/"]
COPY ["Hypesoft.sln", "."]
RUN dotnet restore "Hypesoft.sln"

# Copia o resto do código-fonte e publica a aplicação
COPY . .
RUN dotnet publish "src/Hypesoft.API/Hypesoft.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Hypesoft.API.dll"]
