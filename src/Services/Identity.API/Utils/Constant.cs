using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Identity.API.Utils
{
    internal static class Constant
    {
        internal static class Swagger
        {
            internal static readonly string Title = "Orderkeeper Identity API v1";
            internal static readonly string Version = "v1";
            internal static readonly string Endpoint = "/swagger/v1/swagger.json";
        }

        internal static class Configurations
        {
            internal static class Database
            {
                internal static readonly string ConnectionString = "ConnectionString";
            }
            internal static class Jwt
            {
                internal static readonly string Key = "JwtKey";
                internal static readonly string Issuer = "JwtIssuer";
                internal static readonly string ExpireDays = "JwtExpireDays";
            }
        }
    }
}
