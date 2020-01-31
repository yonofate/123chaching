using Punnel.Core.Utils;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using Punnel.FileServiceProxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Punnel.Core.BLL.Repositories
{
    public class FileRepository : BaseRepository<File>, IFileRepository
    {
        private static readonly int FILE_MAXSIZE = int.Parse(ConfigSettings.Get("FILE_MAXSIZE", "5"));
        private static readonly string FILE_IMG_ALLOW = ConfigSettings.Get("FILE_IMG_ALLOW", "'.jpg,image/*,.jpeg,.png,.gif,.svg,.ico'");
        private static readonly string FILE_API_DOMAIN = ConfigSettings.Get("ApiStatic", "https://hstatic.punnel.com");
        public FileRepository(IUow uow) : base(uow) { }

        public void AddFile(File file)
        {          
            this.Add(file);
            this.Commit();
        }

        public void UpdateCollection(FileCollectionRequestModel files,string userId)
        {
            foreach (var item in files.Ids)
            {
                var f = _dbSet.SingleOrDefault(x => x.Id == item);
                if (f != null)
                {
                    if (IsOwnerOrAdmin(f.UserId, userId) == false) return;
                    f.CollectionId = files.CollectionId;                   
                    //this.RemoveCache(item);
                }
            }
            this.Commit();
        }

        public void Delete(List<Guid> ids,string userId)
        {
            foreach(var id in ids){
                var file = _dbSet.Find(id);
                if (file != null)
                {
                    if (IsOwnerOrAdmin(file.UserId, userId) == false) return;
                    uow.FileService.RemoveFile(file.UserId, file.Name);
                    _dbSet.Remove(file);
                    this.Commit();
                }
            }
            //this.RemoveCache(id);
        }

        public async Task<Tuple<List<FileSearchResult>, int>> SearchAsync(FileRequestModel req)
        {
            return await (_dbContext as Model.PunnelContext).msp_File_SearchAsync(req);
        }

        #region Upload File
        public FileResponseModel UploadImg(System.IO.Stream file, string fileName, int type,Guid? coid, string userId)
        {
            if ((file.Length / (1024 * 1024)) > FILE_MAXSIZE)
            {
                throw new BusinessException(Entities.Resources.Messages.Image_Err_MaxSize);
            }
            var ext = System.IO.Path.GetExtension(fileName);
            if (!FILE_IMG_ALLOW.Contains(ext))
            {
                throw new BusinessException(Entities.Resources.Messages.Image_Err_Ext);
            }

            using (file)
            {
                var path = MakeFileUrl(fileName, type,userId, coid);
                //var rp = uow.FileService.UploadFile(file, fileName, userId);
                var rp = uow.FileService.UploadFile(file, path);
                if (rp.IsError)
                {
                    throw new BusinessException(rp.Message);
                }
                else
                {
                    if (type == (int)FileType.Image)
                    {
                        var id = Guid.NewGuid();
                        this.AddFile(new File()
                        {
                            Id = id,
                            CollectionId = coid,
                            UserId = userId,
                            NameRaw = fileName,
                            Name = System.IO.Path.GetFileName(rp.Data.path),
                            Size = file.Length,
                            Type = type,
                            Path = rp.Data.path.Replace(FILE_API_DOMAIN, "")
                        });
                        rp.Data.id = id;
                        rp.Data.file_s3_size = file.Length;
                    }
                    else if (type == (int)FileType.Avatar)
                    {
                        uow.UserProfile.UpdateAvatar(userId,rp.Data.path.Replace(FILE_API_DOMAIN, ""));
                    }
                    else if (type == (int)FileType.ImageStock)
                    {
                        uow.ImageStock.AddNew(new ImageStock()
                        {
                            Id = Guid.NewGuid(),
                            Path = rp.Data.path.Replace(FILE_API_DOMAIN, ""),
                            Size= file.Length,
                            Width=0,
                            Height=0,
                            CateId= coid,
                            CreatedDate= DateTime.Now
                        });
                    }

                    return rp.Data;
                }
            }
        }


        public string UploadThumFromBase64(string base64String,string userId)
        {
            byte[] imageBytes = Convert.FromBase64String(base64String.Replace("data:image/png;base64,", ""));
            System.IO.MemoryStream file = new System.IO.MemoryStream(imageBytes);
            using (file)
            {
                var rp = uow.FileService.UploadFile(file, "thumb" + DateTime.Now.GetHashCode().ToString("x")+".png", userId);
                if (rp.IsError)
                {
                    throw new BusinessException(rp.Message);
                }
                else
                {                  
                    return rp.Data.path.Replace(FILE_API_DOMAIN, "");
                }
            }
        }

        public FileResponseModel UploadImgFromUrl(string url,Guid? coid,string userId)
        {
            if (string.IsNullOrWhiteSpace(url))
            {
                throw new BusinessException("Url hình ảnh không hợp lệ");
            }
            if (url.StartsWith(FILE_API_DOMAIN))
            {
                throw new BusinessException("Bạn có thể sử dụng trực tiếp link {url}");
            }
            string pattern = @"(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg)";
            Regex rgx = new Regex(pattern, RegexOptions.IgnoreCase);
            var ok = rgx.IsMatch(url);
            if (ok)
            {
                var rp = uow.FileService.UploadFileFromUrl(url, userId);
                if (rp.IsError)
                {
                    throw new BusinessException(rp.Message);
                }
                else
                {
                    var id = Guid.NewGuid();
                    this.AddFile(new File()
                    {
                        Id = id,
                        CollectionId= coid,
                        UserId = userId,
                        NameRaw = System.IO.Path.GetFileName(url),
                        Name = System.IO.Path.GetFileName(rp.Data.path),
                        Size = 1,
                        Type = (int)FileType.Image,
                        Path = rp.Data.path.Replace(FILE_API_DOMAIN, "")
                    });
                    rp.Data.id = id;
                    rp.Data.file_s3_size =1;

                    return rp.Data;
                }
            }
            else
            {
                throw new BusinessException("Url hình ảnh không hợp lệ");
            }
        }
        #endregion

        #region Upload File S3
        public async Task<FileResponseModel> UploadImgToS3(System.IO.Stream file, string fileName, int type, Guid? coid, string userId)
        {
            await uow.FileService.UploadFileToS3(file, fileName, userId);
            return null;
        }
        #endregion

        #region utils
        public string MakeFileUrl(string fileName, int type, string userId, Guid? coid)
        {
            string path = "";
            fileName = fileName.Replace(" ", "_");
            switch (type)
            {
                case (int)FileType.Image:
                    path += string.Join("/", userId, fileName);
                    break;
                case (int)FileType.ImageStock:
                    path += string.Join("/", "stock" + coid.ToString(), fileName);
                    break;
                case (int)FileType.Avatar:
                    path += string.Join("/", userId, fileName);
                    break;
                case (int)FileType.TemplateThumbnail:
                    path += string.Join("/", userId, fileName);
                    break;
            }
            return path;
        }
        #endregion
    }
}
