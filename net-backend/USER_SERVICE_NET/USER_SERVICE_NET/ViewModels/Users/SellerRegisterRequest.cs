using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using USER_SERVICE_NET.Utilities.Enums;

namespace USER_SERVICE_NET.ViewModels.Users
{
    public class SellerRegisterRequest
    {
        [Required]
        public string Fullname { get; set; }

        [Required]
        public string Address{ get; set; }

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
        public string StoreAddress { get; set; }
        public DateTime OpenTime { get; set; }
        public DateTime CloseTime { get; set; }

    }
}
