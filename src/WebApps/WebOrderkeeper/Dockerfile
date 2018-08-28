FROM microsoft/aspnetcore:2.0-nanoserver-1709 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0-nanoserver-1709 AS build
WORKDIR /src
COPY src/WebApps/WebOrderkeeper/WebOrderkeeper.csproj src/WebApps/WebOrderkeeper/
RUN dotnet restore src/WebApps/WebOrderkeeper/WebOrderkeeper.csproj
COPY . .
WORKDIR /src/src/WebApps/WebOrderkeeper
RUN dotnet build WebOrderkeeper.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish WebOrderkeeper.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "WebOrderkeeper.dll"]
