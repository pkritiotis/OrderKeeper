FROM microsoft/aspnetcore:2.0-nanoserver-1709 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0-nanoserver-1709 AS build
WORKDIR /src
COPY src/Services/CustomerManagement.API/CustomerManagement.API.csproj src/Services/CustomerManagement.API/
RUN dotnet restore src/Services/CustomerManagement.API/CustomerManagement.API.csproj
COPY . .
WORKDIR /src/src/Services/CustomerManagement.API
RUN dotnet build CustomerManagement.API.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish CustomerManagement.API.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "CustomerManagement.API.dll"]
