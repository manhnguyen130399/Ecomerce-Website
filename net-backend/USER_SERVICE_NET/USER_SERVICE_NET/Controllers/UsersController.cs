using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using USER_SERVICE_NET.Services;
using USER_SERVICE_NET.ViewModels.Users;

namespace USER_SERVICE_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("cusomerRegister")]
        public async Task<IActionResult> CustomerRegister(CustomerRegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.CustomerRegister(request);

            if (result.IsSuccessed == false) return BadRequest(result);
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

            if (result.IsSuccessed == false) return BadRequest(result);
            return Ok(result);
        }
    }
}
