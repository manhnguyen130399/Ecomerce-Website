using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace USER_SERVICE_NET.Services.StorageServices
{
    public class StorageService : IStorageService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public StorageService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task SaveFileAsync(Stream mediaBinaryStream, string folder, string fileName)
        {
            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, folder, fileName);
            using FileStream output = new FileStream(filePath, FileMode.Create);
            {
                await mediaBinaryStream.CopyToAsync(output);
            }
            
        }

        public async Task DeleteFileAsync(string folder, string fileName)
        {
            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, folder, fileName);
            if (File.Exists(filePath))
            {
                await Task.Run(() => File.Delete(filePath));
            }
        }
    }
}
