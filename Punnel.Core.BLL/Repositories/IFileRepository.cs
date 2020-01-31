using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public interface IFileRepository: IBaseRepository<File>
    {
        void UpdateCollection(FileCollectionRequestModel files,string userId);
        FileResponseModel UploadImg(System.IO.Stream file, string fileName, int type,Guid? coid, string userId);
        FileResponseModel UploadImgFromUrl(string url, Guid? coid, string userId);
        Task<Tuple<List<FileSearchResult>, int>> SearchAsync(FileRequestModel req);
        string UploadThumFromBase64(string base64String, string userId);
        void Delete(List<Guid> id, string userId);

        Task<FileResponseModel> UploadImgToS3(System.IO.Stream file, string fileName, int type, Guid? coid, string userId);
    }
}