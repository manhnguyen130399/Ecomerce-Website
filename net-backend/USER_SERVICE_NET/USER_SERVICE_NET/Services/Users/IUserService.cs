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
        Task<APIResult<string>> RegisterForCustomer(RegisterRequest request);
        Task<APIResult<string>> RegisterForSeller(RegisterRequest request);
        Task<APIResult<bool>> ResetPassword(ResetPasswordRequest request);
        Task<APIResult<string>> ChangePassword(ChangePasswordRequest request);
        Task<APIResult<TokenResetPassword>> GenerateTokenResetPassword(string email);
    }
}
