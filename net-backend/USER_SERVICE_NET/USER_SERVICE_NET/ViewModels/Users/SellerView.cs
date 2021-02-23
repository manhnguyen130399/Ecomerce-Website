using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using USER_SERVICE_NET.ViewModels.Address;

namespace USER_SERVICE_NET.ViewModels.Users
{
    public class SellerView
    {
        public string SellerName { get; set; }
        public AddressType Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
        public string Gender { get; set; }
        public string StoreName { get; set; }
        public string Website { get; set; }

    }
}
