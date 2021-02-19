using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using USER_SERVICE_NET.ViewModels.Commons;
using USER_SERVICE_NET.ViewModels.Users;

namespace USER_SERVICE_NET.Services.Users
{
    public interface IUserService
    {
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
