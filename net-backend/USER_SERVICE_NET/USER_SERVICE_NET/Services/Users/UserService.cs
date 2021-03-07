using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using USER_SERVICE_NET.Models;
using USER_SERVICE_NET.Services.Communicates;
using USER_SERVICE_NET.Services.StorageServices;
using USER_SERVICE_NET.Utilities;
using USER_SERVICE_NET.Utilities.Enums;
using USER_SERVICE_NET.ViewModels.Accounts;
using USER_SERVICE_NET.ViewModels.Address;
using USER_SERVICE_NET.ViewModels.Commons;
using USER_SERVICE_NET.ViewModels.Commons.Pagging;
using USER_SERVICE_NET.ViewModels.Customers;
using USER_SERVICE_NET.ViewModels.Sellers;
using USER_SERVICE_NET.ViewModels.Stores;

namespace USER_SERVICE_NET.Services.Users
{
    public class UserService : IUserService
    {
        private readonly ShopicaContext _context;
        private readonly IConfiguration _configuration;
        private readonly IStorageService _storageService;
        private readonly ICommunicateService _communicateService;

        public UserService(ShopicaContext context, IConfiguration configuration, IStorageService storageService, ICommunicateService communicateService)
        {
            _context = context;
            _configuration = configuration;
            _storageService = storageService;
            _communicateService = communicateService;
        }
        public async Task<APIResult<string>> Authencate(LoginRequest request)
        {
            var user = await _context.Account.Include(x => x.Seller).FirstOrDefaultAsync(u => u.Username == request.Email);

            if (user == null) return new APIResultErrors<string>("Email not found");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return new APIResultErrors<string>("UserName or Password is incorrect");
            }

            var token = Helpers.CreateToken(user, false, _configuration);
            return new APIResultSuccess<string>(token);
        }

        public async Task<APIResult<string>> RegisterForCustomer(CustomerRegisterRequest request)
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
                        Address = JsonConvert.SerializeObject(request.Address),
                        Phone = request.Phone,
                        Email = request.Email,
                        Gender = request.Gender,
                    }
                }
            };

            if (request.ImageFile != null)
            {
                account.ImageUrl = await _storageService.UploadFileAsync(request.ImageFile);
            }

            _context.Account.Add(account);

            await _context.SaveChangesAsync();

            return new APIResultSuccess<string>("register successfully");

        }

        public async Task<APIResult<string>> RegisterForSeller(SellerRegisterRequest request)
        {
            if (await _context.Account.FirstOrDefaultAsync(ac => ac.Username == request.Email) != null)
            {
                return new APIResultErrors<string>("Email is already");
            }

            var storeRequest = new StoreRequest();
            storeRequest.Owner = request.Fullname;
            storeRequest.Address = JsonConvert.SerializeObject(request.StoreAddress);
            storeRequest.StoreName = request.StoreName;
            storeRequest.Website = Helpers.ConverToSlug(request.StoreName);

            var store = await _communicateService.CreateStoreForSeller(storeRequest);

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
                        Address = JsonConvert.SerializeObject(request.Address),
                        Phone = request.Phone,
                        Email = request.Email,
                        Gender = request.Gender,
                        StoreId = store.Data.Id
                    }
                }
            };

            if (request.ImageFile != null)
            {
                account.ImageUrl = await _storageService.UploadFileAsync(request.ImageFile);
            }

            _context.Account.Add(account);
            await _context.SaveChangesAsync();



            return new APIResultSuccess<string>("register successfully");
        }

        public async Task<APIResult<string>> ChangePassword(ChangePasswordRequest request)
        {
            var user = await _context.Account.FindAsync(request.AccountId);
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

        public async Task<APIResult<string>> SocialLogin(SocialLoginRequest request)
        {
            string result;
            var user = await _context.Account.FirstOrDefaultAsync(ac => 
                                            ac.ProviderKey == request.ProviderKey && ac.Provider == request.Provider);
            if (user == null)
            {
                var account = new Account()
                {
                    Username = request.Email,
                    Provider = request.Provider,
                    ProviderKey = request.ProviderKey,
                    ImageUrl = request.ImageUrl,
                    IsActive = 1,
                    Type = AccountTypes.Customer,
                    Customer = new List<Customer>()
                {
                    new Customer()
                    {
                        CustomerName = request.FullName,
                        Email = request.Email,
                    }
                }
                };

                _context.Account.Add(account);
                await _context.SaveChangesAsync();

                result = Helpers.CreateToken(account, true, _configuration);
                return new APIResultSuccess<string>(result);
            }

            result = Helpers.CreateToken(user, true, _configuration);
            return new APIResultSuccess<string>(result);

        }

        public async Task<APIResult<bool>> UpdateInfo(UpdateInfoRequest request)
        {
            dynamic user;

            if (request.IsCustomer)
            {
               user = await _context.Customer.FirstOrDefaultAsync(c => c.AccountId == request.AccountId);
            }
            else
            {
                user = await _context.Seller.FirstOrDefaultAsync(c => c.AccountId == request.AccountId);
            }
            
            if (user == null)
            {
                return new APIResultErrors<bool>("Can not found user");
            }

            if (request.ImageFile != null)
            {
                user.Account.ImageUrl = await _storageService.UploadFileAsync(request.ImageFile);
            }

            user.CustomerName = (!String.IsNullOrEmpty(request.Fullname) && user.CustomerName != request.Fullname) ? request.Fullname : user.CustomerName;
            user.Gender = (!String.IsNullOrEmpty(request.Gender.ToString()) && user.Gender != request.Gender) ? request.Gender : user.Gender;
            user.Phone = (!String.IsNullOrEmpty(request.Phone) && user.Phone != request.Phone) ? request.Phone : user.Phone;
            user.Address = (request.Address == null && user.Address != request.Address) ? JsonConvert.SerializeObject(request.Address) : user.Address;
         
            await _context.SaveChangesAsync();

            return new APIResultSuccess<bool>();

        }

        public async Task<APIResult<PaggingView<CustomerView>>> GetAllCustomer(PaggingRequest request)
        {
            var listCustomer = await _context.Customer
                .Include(c => c.Account)
                .ToListAsync();

            var totalRow = listCustomer.Count();

            var data = listCustomer
                .Skip(request.pageSize * (request.pageIndex - 1))
                .Take(request.pageSize)
                .Select(x => new CustomerView()
                {
                    CustomerName = x.CustomerName,
                    Address = x.Address != null ? JsonConvert.DeserializeObject<AddressInfo>(x.Address) : null,
                    Phone = x.Phone,
                    Email = x.Email,
                    Gender = x.Gender == Genders.Male ? "Male" : "Female",
                    Image = x.Account.ImageUrl
                }).ToList();

            var customerView = new PaggingView<CustomerView>()
            {
                TotalRecord = totalRow,
                Datas = data,
                Pageindex = request.pageIndex,
                PageSize = request.pageSize
            };

            return new APIResultSuccess<PaggingView<CustomerView>>(customerView);
        }

        public async Task<APIResult<PaggingView<SellerView>>> GetAllSeller(PaggingRequest request)
        {

            var listSeller = await _context.Seller
                .Include(c => c.Account)
                .ToListAsync();

            var totalRow = listSeller.Count();

            var listStoreId = listSeller.Select(x => x.StoreId).ToList();

            var listStore = await _communicateService.GetListStore(listStoreId);

            var fullList = from s in listSeller
                           join st in listStore.Data on s.StoreId equals st.Id
                           select new { s, st };

            var data = fullList
                .Skip(request.pageSize * (request.pageIndex - 1))
                .Take(request.pageSize)
                .Select(x => new SellerView()
            {
                SellerName = x.s.SellerName,
                Address = x.s.Address!=null? JsonConvert.DeserializeObject<AddressInfo>(x.s.Address):null,
                Phone = x.s.Phone,
                Email = x.s.Email,
                Gender = x.s.Gender == Genders.Male ? "Male" : "Female",
                Image = x.s.Account.ImageUrl,
                StoreName = x.st.StoreName,
                Website = x.st.Website
            }).ToList();

            var sellerView = new PaggingView<SellerView>()
            {
                TotalRecord = totalRow,
                Datas = data,
                Pageindex = request.pageIndex,
                PageSize = request.pageSize
            };

            return new APIResultSuccess<PaggingView<SellerView>>(sellerView);
        }

        public async Task<APIResult<AccountView>> GetAccountInfoByUserName(string userName)
        {
            var account = await _context.Account.FirstOrDefaultAsync(a => a.Username == userName);
            if(account == null)
            {
                return new APIResultErrors<AccountView>("Not found");
            }
            var accountView = new AccountView()
            {
                Id = account.Id,
                UserName = account.Username,
                Password = account.Password,
                Type = account.Type,
                ImageUrl = account.ImageUrl,
                IsActive = account.IsActive
            };

            return new APIResultSuccess<AccountView>(accountView);
        }
    }
}
