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

namespace Punnel.WebImage
{
    public class UploadController : Controller
    {
        private static readonly ILog _log = LogManager.GetLogger("UploadController");
        private static readonly string baseURL = System.Configuration.ConfigurationManager.AppSettings["BaseURL"];
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
                            _log.Info(image.Width);
                            _log.Info(image.Height);
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
                    foreach(var dir in dirs)
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

        void UploadToS3()
        {
            var client = new AmazonS3Client("", "", Amazon.RegionEndpoint.APSoutheast1);
            //PutObjectRequest request = new PutObjectRequest()
            //{
            //    BucketName = "punnel-static",
            //    Key = "",
            //    InputStream = "",
            //    AutoCloseStream = true,
            //    CannedACL = S3CannedACL.PublicRead,
            //    StorageClass = S3StorageClass.ReducedRedundancy
            //};

            //PutObjectResponse response = client.PutObject(request);

            //if (response.HttpStatusCode == HttpStatusCode.OK)
            //{
               
            //}
        }
    }
}