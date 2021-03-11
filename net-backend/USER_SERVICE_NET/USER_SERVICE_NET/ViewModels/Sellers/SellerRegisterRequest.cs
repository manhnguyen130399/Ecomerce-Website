using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using USER_SERVICE_NET.Utilities.Enums;
using USER_SERVICE_NET.ViewModels.Address;

namespace USER_SERVICE_NET.ViewModels.Sellers
{
    public class SellerRegisterRequest
    {
        [Required]
        public string Fullname { get; set; }

        //public AddressInfo Address { get; set; }

        public Genders Gender { get; set; }

        public IFormFile ImageFile { get; set; }
        public string Phone { get; set; }

        [EmailAddress, Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        // Store
        [Required]
        public string StoreName { get; set; }
        [Required]
        //public AddressInfo StoreAddress { get; set; }
        public string OpenTime { get; set; }
        public string CloseTime { get; set; }

    }
}
