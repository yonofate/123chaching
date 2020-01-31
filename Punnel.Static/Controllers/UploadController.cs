using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using log4net;
using Punnel.Utils;
using Amazon.S3;
using Amazon.S3.Model;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using System.Text;

namespace Punnel.Static
{
    public class UploadController : Controller
    {
        private static readonly ILog _log = LogManager.GetLogger("UploadController");
        private static readonly string baseURL = System.Configuration.ConfigurationManager.AppSettings["BaseURL"];
        private readonly static string accessKey = System.Configuration.ConfigurationManager.AppSettings["AccessKey"];
        private readonly static string secretKey = System.Configuration.ConfigurationManager.AppSettings["SecretKey"];
        private readonly static string bucketName = System.Configuration.ConfigurationManager.AppSettings["BucketName"];
        // GET: Upload
        [HttpPost]
        public ActionResult Index(string code)
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    var file = Request.Files[0];
                    if (file == null || file.ContentLength < 500) return Content(string.Empty);

                    String fileName = file.FileName;
                    string mimeType = Path.GetExtension(fileName);
                    string fileId = FileHelper.generateID();
                    var newFileName = string.Format("img_{0}{1}", fileId, mimeType); 
                    System.IO.Directory.CreateDirectory(Server.MapPath("~/img/"));
                    System.IO.Directory.CreateDirectory(Server.MapPath("~/img/" + code + "/"));
                    var path = Path.Combine(Server.MapPath("~/img/" + code + "/"), newFileName);

                    if (mimeType == ".png" || mimeType == ".jpg" || mimeType == ".bmp")
                    {
                        //Stream fileStream = file.InputStream;
                        //fileStream.Position = 0;
                        //byte[] fileContents = new byte[file.ContentLength];
                        System.Drawing.Image image = System.Drawing.Image.FromStream(file.InputStream);
                        if (image.Width > 1920 || image.Height > 1200)
                        {
                            //_log.Info(image.Width);
                            //_log.Info(image.Height);
                            var newImg = ImageHelper.Resize(image, 1920, 1200, true);
                            newImg.Save(path);
                            //MemoryStream mem = new MemoryStream();
                            //if (mimeType == ".png") newImg.Save(mem, ImageFormat.Png);
                            //else if (mimeType == ".bmp") newImg.Save(mem, ImageFormat.Bmp);
                            //else newImg.Save(path, ImageFormat.Jpeg);
                        }
                        else
                        {
                            file.SaveAs(path);
                        }
                    }
                    else
                        file.SaveAs(path);

                    string fullfn = "/" + code + "/" + newFileName;
                    return Content(fullfn);
                }catch(Exception ex)
                {
                    _log.Error(ex);
                    
                    return Content(string.Empty);
                }
            }
            return Content(string.Empty);
        }


        public ActionResult New()
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    var file = Request.Files[0];
                    
                    if (file == null || file.ContentLength < 500) return Content(string.Empty);
                    String fileName = file.FileName;
                    string mimeType = Path.GetExtension(fileName);
                    string fileId = FileHelper.generateID();
                    var newFileName = string.Format("img_{0}{1}", fileId, mimeType);
                    string dirRoot = "~/img/";
                    System.IO.Directory.CreateDirectory(Server.MapPath(dirRoot));
                    var dirs = fileName.Split(new char[1] { '/' });
                    string path = "";
                    
                    //try
                    //{
                    //    await UploadImageToS3(dirs.FirstOrDefault(), newFileName, file.InputStream);
                    //}
                    //catch (Exception ex)
                    //{
                    //    _log.ErrorFormat("Upload to S3 error: {0}", ex);
                    //    _log.ErrorFormat("Folder: {0} , FileName: {2}", dirs.FirstOrDefault(), newFileName);
                    //}


                    foreach (var dir in dirs)
                    {
                        if (dir.Contains(mimeType) == false)
                        {
                            dirRoot = string.Join("/", dirRoot, dir, "");
                            System.IO.Directory.CreateDirectory(Server.MapPath(dirRoot));
                        }
                        else
                        {
                            path = Path.Combine(Server.MapPath(dirRoot), newFileName);
                        }
                    }

                    if (mimeType == ".png" || mimeType == ".jpg" || mimeType == ".bmp")
                    {
                        System.Drawing.Image image = System.Drawing.Image.FromStream(file.InputStream);
                        if (image.Width > 1920 || image.Height > 1200)
                        {
                            //_log.Info(image.Width);
                            //_log.Info(image.Height);
                            var newImg = ImageHelper.Resize(image, 1920, 1200, true);
                            newImg.Save(path);
                        }
                        else
                        {
                            file.SaveAs(path);
                        }
                    }
                    else
                        file.SaveAs(path);

                    //try
                    //{
                    //    var pathname = Path.Combine(dirRoot.Replace("~/", ""), newFileName);
                    //    _log.Info(pathname);
                    //    UploadToGooleCloud(pathname, mimeType, file.InputStream);
                    //}
                    //catch (Exception ex)
                    //{
                    //    _log.ErrorFormat("Upload to google cloud error: {0}", ex);
                    //}

                    string fullfn = Path.Combine(dirRoot.Replace("~/img/", ""),newFileName); //"/" + code + "/" + newFileName;
                    return Content(fullfn);
                }
                catch (Exception ex)
                {
                    _log.Error(ex);
                    return Content(string.Empty);
                }
            }
            return Content(string.Empty);
        }

        public ActionResult DeleteFile(string fileName)
        {
            try
            {
                return Content("deleted");
                // string path = $"~/img/{userId}/{fileName}";
                string localpath = HttpContext.Server.MapPath(fileName);
                if (System.IO.File.Exists(localpath))
                {
                    System.IO.File.Delete(localpath);
                    return Content("deleted");
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Content(ex.Message);
            }
            return Content(string.Empty);
        }

        public ActionResult RemoveFile(string userId, string fileName)
        {
            try
            {
                return Content("deleted");
                string path = $"~/img/{userId}/{fileName}";
                string localpath = HttpContext.Server.MapPath(path);
                if (System.IO.File.Exists(localpath))
                {
                    System.IO.File.Delete(localpath);
                    return Content("deleted");
                }
            }catch(Exception ex)
            {
                _log.Error(ex);
                return Content(ex.Message);
            }
            return Content(string.Empty);
        }

        async System.Threading.Tasks.Task UploadImageToS3(string folder, string fileName, Stream stream)
        {
            var client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.USEast2);
            PutObjectRequest request = new PutObjectRequest()
            {
                BucketName = bucketName + "/" + folder,
                Key = fileName,
                InputStream = stream,
                AutoCloseStream = true,
                CannedACL = S3CannedACL.PublicRead,
                StorageClass = S3StorageClass.ReducedRedundancy
            };
            PutObjectResponse response = await client.PutObjectAsync(request);
        }


        void UploadToGooleCloud(string pathToFileName, string contentType, Stream stream)
        {
            GoogleCredential credential = null;
            using (var jsonStream = new FileStream(Server.MapPath("google-cloud-credential.json"), FileMode.Open,
                FileAccess.Read, FileShare.Read))
            {
                credential = GoogleCredential.FromStream(jsonStream);
            }

            if (pathToFileName.StartsWith("/")) pathToFileName= pathToFileName.Remove(0, 1);

            using (var storageClient = StorageClient.Create(credential))
            {
                storageClient.UploadObject("cloud.punnel.com", pathToFileName, GetMimeType(contentType), stream);
            }
        }

        string GetMimeType(string ext)
        {
            string mimeType = null;
            switch (ext){
                case ".apng":
                    mimeType = "image/apng";
                    break;
                case ".bmp":
                    mimeType = "image/bmp";
                    break;
                case ".gif":
                    mimeType = "image/gif";
                    break;
                case ".ico":
                    mimeType = "image/x-icon";
                    break;
                case ".jpg":
                    mimeType = "image/jpeg";
                    break;
                case ".png":
                    mimeType = "image/png";
                    break;
                case ".svg":
                    mimeType = "image/svg+xml";
                    break;
                case ".webp":
                    mimeType = "image/webp";
                    break;
            }
            return mimeType;
        }
    }
}