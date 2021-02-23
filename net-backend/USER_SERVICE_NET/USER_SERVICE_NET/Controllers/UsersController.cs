using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using USER_SERVICE_NET.Services.Emails;
using USER_SERVICE_NET.Services.StorageServices;
using USER_SERVICE_NET.Services.Users;
using USER_SERVICE_NET.Utilities;
using USER_SERVICE_NET.ViewModels.Accounts;
using USER_SERVICE_NET.ViewModels.Commons.Pagging;
using USER_SERVICE_NET.ViewModels.Customers;
using USER_SERVICE_NET.ViewModels.Emails;
using USER_SERVICE_NET.ViewModels.Sellers;

namespace USER_SERVICE_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;
        private readonly IStorageService _storageService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UsersController(IUserService userService, IEmailService emailService, IStorageService storageService, IWebHostEnvironment webHostEnvironment)
        {
            _userService = userService;
            _emailService = emailService;
            _storageService = storageService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("GetListCustomer")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetListCustomer([FromQuery] PaggingRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.GetAllCustomer(request);

            if (!result.IsSuccessed) return BadRequest(result);
            return Ok(result);
        }

        [HttpGet("GetAccountInfoByUserName")]
        public async Task<IActionResult> GetAccountInfoByUserName(string userName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.GetAccountInfoByUserName(userName);

            if (!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("GetListSeller")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetListSeller([FromQuery] PaggingRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.GetAllSeller(request);

            if (!result.IsSuccessed) return BadRequest(result);
            return Ok(result);
        }

        [HttpPost("cusomerRegister")]
        public async Task<IActionResult> CustomerRegister(CustomerRegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.RegisterForCustomer(request);

            if (!result.IsSuccessed) return BadRequest(result);
            return Ok(result);
        }

        [HttpPost("sellerRegister")]
        public async Task<IActionResult> SellerRegister(SellerRegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.RegisterForSeller(request);

            if (!result.IsSuccessed) return BadRequest(result);
            return Ok(result);
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.Authencate(request);

            if (!result.IsSuccessed) return BadRequest(result);
            return Ok(result);
        }

        [HttpPost("changepassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            request.AccountId = Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

            var result = await _userService.ChangePassword(request);

            if (!result.IsSuccessed) return BadRequest(result);
            return Ok(result);
        }

        [HttpGet("generateTokenResetPassword")]
        public async Task<IActionResult> GenerateTokenResetPassword([FromQuery] string email)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var emailToken = Helpers.GenerateRandomString();

            string contentTemplate = Helpers.GetStringFromHtml(_webHostEnvironment.WebRootPath, "ResetPassword.html");

            var emailRequest = new EmailRequest()
            {
                To = email,
                Subject = "Veritify code",
                Content = String.Format(contentTemplate,emailToken)
            };

            _emailService.SendEmailAsync(emailRequest);

            var result = await _userService.GenerateTokenResetPassword(email);

            if (result.IsSuccessed) {
                result.Data.EmailToken = emailToken;
                return Ok(result);

            } 
            return BadRequest(result);
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.ResetPassword(request);

            if (!result.IsSuccessed) return BadRequest(result);

            return Ok(result);

        }


        [HttpPost("socialLogin")]
        public async Task<IActionResult> SocialLogin(SocialLoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.SocialLogin(request);

            if (!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }

        [HttpPatch("UpdateInfo")]
        [Authorize]
        public async Task<IActionResult> UpdateInfo(UpdateInfoRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            request.AccountId = Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

            var result = await _userService.UpdateInfo(request);

            if (!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }
    }
}
