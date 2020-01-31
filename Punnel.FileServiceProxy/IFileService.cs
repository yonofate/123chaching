using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.FileServiceProxy
{
   public interface IFileService
    {
       Response<FileResponseModel> UploadFile(Stream fileStream, string fileName, string code);
        Response<FileResponseModel> UploadFile(Stream fileStream, string filePath);
        Response<FileResponseModel> UploadFileFromUrl(string imgUrl, string code);
       Response<string>[] UploadFileFromURL(string[] imgUrls);
       bool IsFromFileService(string URLServie);
        bool RemoveFile(string userId, string fileName);

        Task UploadFileToS3(Stream fileStream, string fileName, string code);
    }
}
