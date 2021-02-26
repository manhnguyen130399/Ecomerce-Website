using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using USER_SERVICE_NET.ViewModels.Accounts;
using USER_SERVICE_NET.ViewModels.Commons;
using USER_SERVICE_NET.ViewModels.Commons.Pagging;
using USER_SERVICE_NET.ViewModels.Customers;
using USER_SERVICE_NET.ViewModels.Sellers;

namespace USER_SERVICE_NET.Services.Users
{
    public interface IUserService
    {
        Task<APIResult<PaggingView<CustomerView>>> GetAllCustomer(PaggingRequest request);
        Task<APIResult<PaggingView<SellerView>>> GetAllSeller(PaggingRequest request);
        Task<APIResult<AccountView>> GetAccountInfoByUserName(string userName);
        Task<APIResult<string>> Authencate(LoginRequest request);
        Task<APIResult<string>> SocialLogin(SocialLoginRequest request);
        Task<APIResult<string>> RegisterForCustomer(CustomerRegisterRequest request);
        Task<APIResult<string>> RegisterForSeller(SellerRegisterRequest request);
        Task<APIResult<bool>> ResetPassword(ResetPasswordRequest request);
        Task<APIResult<bool>> UpdateInfo(UpdateInfoRequest request);
        Task<APIResult<string>> ChangePassword(ChangePasswordRequest request);
        Task<APIResult<TokenResetPassword>> GenerateTokenResetPassword(string email);
    }
}
