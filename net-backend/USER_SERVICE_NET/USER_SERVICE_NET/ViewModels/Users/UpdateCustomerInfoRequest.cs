using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using USER_SERVICE_NET.Utilities.Enums;

namespace USER_SERVICE_NET.ViewModels.Users
{
    public class UpdateCustomerInfoRequest
    {
        public int AccountId { get; set; }
        public string Fullname { get; set; }
        public string Address { get; set; }
        public Genders Gender { get; set; }
        public IFormFile ImageFile { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
