using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace USER_SERVICE_NET.Utilities
{
    public static class Helpers
    {
        public static string CreateToken(int role, string email, IConfiguration _configuration)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var claims = new[]
           {
                new Claim(ClaimTypes.Email,email),
                new Claim(ClaimTypes.Role, role.ToString()),
            };
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("SecretKey").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static string GenerateRandomString()
        {
            Random random = new Random();
            return random.Next(100000, 999999).ToString();
        }

        public static bool VeritifyHashString(string text, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(text, hash);
        }

        public static string Base64Encode(string str)
        {
            var strBytes = Encoding.UTF8.GetBytes(str);
            return Convert.ToBase64String(strBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return Encoding.UTF8.GetString(base64EncodedBytes);
        }
         
        public static string GetCurrentTime()
        {
            return DateTimeOffset.Now.ToUnixTimeMilliseconds().ToString();
        }
    }
}
