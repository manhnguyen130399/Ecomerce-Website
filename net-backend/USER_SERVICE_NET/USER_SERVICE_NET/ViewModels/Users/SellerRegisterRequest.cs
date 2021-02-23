using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using USER_SERVICE_NET.Utilities.Enums;
using USER_SERVICE_NET.ViewModels.Address;

namespace USER_SERVICE_NET.ViewModels.Users
{
    public class SellerRegisterRequest
    {
        [Required]
        public string Fullname { get; set; }

        [Required]
        public AddressType Address { get; set; }

        [Required]
        public Genders Gender{ get; set; }

        public IFormFile ImageFile{ get; set; }

        [Phone]
        public string Phone{ get; set; }

        [EmailAddress, Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        // Store
        [Required]
        public string StoreName { get; set; }
        [Required]
        public AddressType StoreAddress { get; set; }
        public DateTime OpenTime { get; set; }
        public DateTime CloseTime { get; set; }

    }
}
