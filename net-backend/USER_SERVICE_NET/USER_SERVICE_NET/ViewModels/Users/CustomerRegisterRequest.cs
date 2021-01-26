using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using USER_SERVICE_NET.Utilities;

namespace USER_SERVICE_NET.ViewModels.Users
{
    public class CustomerRegisterRequest
    {
        [Required]
        public string Fullname { get; set; }
        [Required]
        public string Address{ get; set; }
        [Required]
        public Genders Gender{ get; set; }
        public string ImageUrl{ get; set; }
        [Phone]
        public string Phone{ get; set; }
        [EmailAddress, Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
