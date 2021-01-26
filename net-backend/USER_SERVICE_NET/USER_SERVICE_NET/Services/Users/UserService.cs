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
using USER_SERVICE_NET.Utilities.Enums;
using USER_SERVICE_NET.ViewModels.Commons;
using USER_SERVICE_NET.ViewModels.Users;

namespace USER_SERVICE_NET.Services.Users
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

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return new APIResultErrors<string>("UserName or Password is incorrect");
            }

            var token = Helpers.CreateToken((int)user.Type, user.Username, _configuration);
            return new APIResultSuccess<string>(token);
        }

        public async Task<APIResult<string>> RegisterForCustomer(RegisterRequest request)
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



        public async Task<APIResult<string>> RegisterForSeller(RegisterRequest request)
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
                Type = AccountTypes.Seller,
                Seller = new List<Seller>()
                {
                    new Seller()
                    {
                        SellerName = request.Fullname,
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

        public async Task<APIResult<string>> ChangePassword(ChangePasswordRequest request)
        {
            var user = await _context.Account.FirstOrDefaultAsync(ac => ac.Username == request.Email);
            if (user == null)
            {
                return new APIResultErrors<string>("Can not found user");
            }

            if(!BCrypt.Net.BCrypt.Verify(request.CurentPassword, user.Password))
            {
                return new APIResultErrors<string>("Current password is incorrect");
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);

            await _context.SaveChangesAsync();

            return new APIResultSuccess<string>("Change password successfully");

        }

        public async Task<APIResult<TokenResetPassword>> GenerateTokenResetPassword(string email)
        {
            var user = await _context.Account.FirstOrDefaultAsync(ac => ac.Username == email);
            if (user == null)
            {
                return new APIResultErrors<TokenResetPassword>("Can not found user");
            }

            var token = Helpers.Base64Encode(Helpers.GetCurrentTime());

            user.TokenResetPassword = token;

            await _context.SaveChangesAsync();

            var tokenResetPassword = new TokenResetPassword()
            {
                DatabaseToken = token
            };
            return new APIResultSuccess<TokenResetPassword>(tokenResetPassword);
        }

        public async Task<APIResult<bool>> ResetPassword(ResetPasswordRequest request)
        {
            var user = await _context.Account.FirstOrDefaultAsync(ac => ac.Username == request.Email);
            if (user == null)
            {
                return new APIResultErrors<bool>("Can not found user");
            }

            var tokenGenerateTime = Convert.ToInt64(Helpers.Base64Decode(request.DatabaseToken));
            var currentTime = Convert.ToInt64(Helpers.GetCurrentTime());
            if (currentTime - tokenGenerateTime > Constant.TokenExpireTime)
            {
                return new APIResultErrors<bool>("Token is expired");
            }

            if (String.Compare(user.TokenResetPassword, request.DatabaseToken) == 0)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
                user.TokenResetPassword = String.Empty;

                await _context.SaveChangesAsync();
                return new APIResultSuccess<bool>();
            }

            return new APIResultErrors<bool>("Token is invalid");

        }
    }
}
