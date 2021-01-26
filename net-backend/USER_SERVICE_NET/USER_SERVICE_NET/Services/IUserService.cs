using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using USER_SERVICE_NET.ViewModels.Commons;
using USER_SERVICE_NET.ViewModels.Users;

namespace USER_SERVICE_NET.Services
{
    public interface IUserService
    {
        Task<APIResult<string>> Authencate(LoginRequest request);
        Task<APIResult<string>> CustomerRegister(CustomerRegisterRequest request);
    }
}
