using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using USER_SERVICE_NET.Services.Emails;
using USER_SERVICE_NET.Services.StorageServices;
using USER_SERVICE_NET.Services.Users;
using USER_SERVICE_NET.Utilities;
using USER_SERVICE_NET.ViewModels.Emails;
using USER_SERVICE_NET.ViewModels.Users;

namespace USER_SERVICE_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;
        private readonly IStorageService _storageService;
        public UsersController(IUserService userService, IEmailService emailService, IStorageService storageService)
        {
            _userService = userService;
            _emailService = emailService;
            _storageService = storageService;
        }

        [HttpPost("cusomerRegister")]
        public async Task<IActionResult> CustomerRegister([FromForm] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.RegisterForCustomer(request);

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

            var emailRequest = new EmailRequest()
            {
                To = email,
                Subject = "Veritify code",
                Content = emailToken
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

        [HttpPost("UploadFile")]
        public async Task<IActionResult> UploadFileAsync([FromForm] IFormFile file)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var fileUrl = await _storageService.FileUploadAsync(file);

            return Ok(fileUrl);
        }
    }
}
