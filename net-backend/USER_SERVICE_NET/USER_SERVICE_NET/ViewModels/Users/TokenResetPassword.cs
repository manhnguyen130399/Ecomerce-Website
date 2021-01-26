using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace USER_SERVICE_NET.ViewModels.Users
{
    public class TokenResetPassword
    {
        public string DatabaseToken { get; set; }
        public string EmailToken { get; set; }
    }
}
