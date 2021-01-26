using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using USER_SERVICE_NET.Models;
using USER_SERVICE_NET.Utilities;
using USER_SERVICE_NET.ViewModels.Commons;
using USER_SERVICE_NET.ViewModels.Users;

namespace USER_SERVICE_NET.Services
{
    public class UserService : IUserService
    {
        private readonly ShopicaContext _context;
        private readonly IConfiguration _configuration;

        public UserService(ShopicaContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<APIResult<string>> Authencate(LoginRequest request)
        {
            var user = await _context.Account.FirstOrDefaultAsync(u => u.Username == request.Email);
            if (user == null) return new APIResultErrors<string>("Email not found");

            if(!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return new APIResultErrors<string>("UserName or Password is incorrect");
            }

            var token = CreateToken((int)user.Type,user.Username);
            return new APIResultSuccess<string>(token);

        }

        public async Task<APIResult<string>> CustomerRegister(CustomerRegisterRequest request)
        {
            if (await _context.Account.FirstOrDefaultAsync(ac => ac.Username == request.Email) != null)
            {
                return new APIResultErrors<string>("Email is already");
            }

            var account = new Account()
            {
                Username = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                IsActive = 1,
                Type = AccountTypes.Customer,
                Customer = new List<Customer>()
                {
                    new Customer()
                    {
                        CustomerName = request.Fullname,
                        Address = request.Address,
                        Phone = request.Phone,
                        Email = request.Email,
                        Gender = request.Gender,
                    }
                }
            };

            _context.Account.Add(account);

            await _context.SaveChangesAsync();

            return new APIResultSuccess<string>("register successfully");

        }

        public string CreateToken(int role, string email)
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

            //var token = new JwtSecurityToken(null,
            //   null,
            //   claims,
            //   expires: DateTime.Now.AddHours(3),
            //   signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256));
            //return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
