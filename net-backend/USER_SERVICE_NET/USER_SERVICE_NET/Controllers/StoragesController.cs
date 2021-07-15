using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using USER_SERVICE_NET.Services.StorageServices;

namespace USER_SERVICE_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoragesController : ControllerBase
    {
        private readonly IStorageService _storageService;

        public StoragesController(IStorageService storageService)
        {
            _storageService = storageService;
        }

        [HttpPost("UploadFiles")]

        public async Task<IActionResult> UploadFiles(IFormFile files)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _storageService.UploadFileAsync(files);

            if (!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }
    }
}
