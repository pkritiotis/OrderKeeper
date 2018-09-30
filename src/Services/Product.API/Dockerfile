FROM microsoft/aspnetcore:2.0-nanoserver-1709 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0-nanoserver-1709 AS build
WORKDIR /src
COPY src/Services/Product.API/Product.API.csproj src/Services/Product.API/
RUN dotnet restore src/Services/Product.API/Product.API.csproj
COPY . .
WORKDIR /src/src/Services/Product.API
RUN dotnet build Product.API.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Product.API.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Product.API.dll"]
