using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace USER_SERVICE_NET.Services.StorageServices
{
    public interface IStorageService
    {
        Task SaveFileAsync(Stream mediaBinaryStream, string folder, string fileName);
        Task DeleteFileAsync(string folder, string fileName);
    }
}
