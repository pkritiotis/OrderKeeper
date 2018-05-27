FROM microsoft/aspnetcore:2.0-nanoserver-1709 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0-nanoserver-1709 AS build
WORKDIR /src
COPY src/Services/Ordering.API/Ordering.API.csproj src/Services/Ordering.API/
RUN dotnet restore src/Services/Ordering.API/Ordering.API.csproj
COPY . .
WORKDIR /src/src/Services/Ordering.API
RUN dotnet build Ordering.API.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Ordering.API.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Ordering.API.dll"]
