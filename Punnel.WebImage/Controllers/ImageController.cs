using Amazon.S3;
using Amazon.S3.Model;
using CF.WebImage.Filters;
using Dapper;
using ImageResizer;
using log4net;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CF.WebImage.Controllers
{
    [TCCorsPolicyProvider]
    [RoutePrefix("image")]
    public class ImageController : ApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("ImageController");
        private readonly static string accessKey = "AKIAR5V5D26TTOQYAWNX";//"AKIAI7KETQ5YDBCCYM4Q";
        private readonly static string secretKey = "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";//"+E0RHNOphv9i9X7qwyws7J0lmKx7hvO1RgbUcmCX";
        private readonly static string bucketName = "bcs-s3/products";
        private readonly static string bucketBlogName = "bcs-s3/blogs";
        private readonly static string bucketRatingName = "bcs-s3/ratings";
        private readonly static string host = "//cdn.becungshop.vn";        
        //private readonly static string host = "//localhost:63851";


        [HttpPost]        
        [Route("product/upload")]
        public HttpResponseMessage UploadProductImg()
        {
            //Get the uploaded image from the Files collection
            if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
            {
                //Get data from request file
                var httpPostedFile = System.Web.HttpContext.Current.Request.Files["HelpSectionImages"];
                var productId = int.Parse(System.Web.HttpContext.Current.Request.Form["ProductId"]);
                var hiddenImg = System.Web.HttpContext.Current.Request.Form["hiddenImg"];
                var isHiddenImg = string.IsNullOrEmpty(hiddenImg) ? false : bool.Parse(hiddenImg);

                if (httpPostedFile != null && productId > 0)
                {
                    var query = string.Format("SELECT Id,Sku,FriendlyUrl,ImgOriginal,Img100x100,Img300x300, Img500x500 FROM dbo.Product WHERE Id = {0}", productId);
                    Product productImage;

                    using (var cnn = SqlHelper.OpenConnection())
                    {
                        productImage = cnn.Query<Product>(query).FirstOrDefault();
                    }

                    if (productImage == null) return Request.CreateResponse(HttpStatusCode.BadRequest, new { success = false, message = "Sản phẩm không tồn tại" });

                    var client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.USEast2);
                    var keyName = (isHiddenImg?"be-cung-shop-":"") + productImage.FriendlyUrl + DateTime.Now.GetHashCode().ToString("x") + ".jpg";
                    var newStream = Utils.Helpers.ImageHelper.DrawText(httpPostedFile.InputStream, productImage.Sku);
                    PutObjectRequest request = new PutObjectRequest()
                    {
                        BucketName = bucketName,
                        Key = keyName,
                        InputStream = newStream,
                        AutoCloseStream = true,
                        CannedACL = S3CannedACL.PublicRead,
                        StorageClass = S3StorageClass.ReducedRedundancy
                    };

                    PutObjectResponse response = client.PutObject(request);

                    if (response.HttpStatusCode == HttpStatusCode.OK)
                    {
                        var imgOriginal = host + "/bcs-s3/products/" + keyName;
                        using (var cnn = SqlHelper.OpenConnection())
                        {
                            query = "Update Product set ImgOriginal = @imgOriginal Where Id = @id";
                            cnn.Execute(query, new { imgOriginal, id = productId });
                        }

                        Task.Factory.StartNew(() =>
                        {
                            using (var wc = new WebClient())
                            {
                                wc.DownloadString("https:" + host + "/image/product/" + productId); //Bug https
                            }
                        });                                                

                        return Request.CreateResponse(HttpStatusCode.OK, new { success = true, message = "Upload ảnh thành công" });
                    }
                }
            }

            return Request.CreateResponse(HttpStatusCode.BadRequest, new { success = false, message = "Lỗi không xác định, vui lòng liên hệ quản trị" });
        }


        [HttpPost]
        [Route("blog/uploadimg")]
        public HttpResponseMessage UploadBlogImg()
        {
            try
            {
                //Get the uploaded image from the Files collection
                if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    //Get data from request file
                    var httpPostedFile = System.Web.HttpContext.Current.Request.Files["HelpSectionImages"];
                    var title = System.Web.HttpContext.Current.Request.Form["Title"];
                    var id = System.Web.HttpContext.Current.Request.Form["BlogId"];
                    int bid = string.IsNullOrEmpty(id) ? 0 : int.Parse(id);
                    if (httpPostedFile != null && title.Length > 0)
                    {
                        var client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.APSoutheast1);
                        var name = CF.Utils.Extension.StringHelper.Slugify(title) + "-" + DateTime.Now.GetHashCode().ToString("x");
                        var keyName = name + ".jpg";
                        PutObjectRequest request = new PutObjectRequest()
                        {
                            BucketName = bucketBlogName,
                            Key = keyName,
                            InputStream = httpPostedFile.InputStream,
                            AutoCloseStream = true,
                            CannedACL = S3CannedACL.PublicRead,
                            StorageClass = S3StorageClass.ReducedRedundancy
                        };

                        PutObjectResponse response = client.PutObject(request);

                        if (response.HttpStatusCode == HttpStatusCode.OK)
                        {
                            Task.Factory.StartNew(() =>
                            {
                                using (var wc = new WebClient())
                                {
                                    wc.DownloadString("https:" + host + $"/image/blogimg/{bid}/{name}"); //Bug https
                            }
                            });

                            return Request.CreateResponse(HttpStatusCode.OK, new { success = true, message = "Upload ảnh thành công", data = host + "/images/blog/" + keyName });
                        }
                    }
                }
            }catch(Exception ex)
            {
                _log.Error(ex);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest, new { success = false, message = "Lỗi không xác định, vui lòng liên hệ quản trị" });
        }


        [HttpPost]
        [Route("blog/upload")]
        //Links multiple using |
        public HttpResponseMessage DownloadAndUploadBlogImages ([FromBody]string links)
        {
            var arr = links.Split('|');

            var result = new List<string>();
            using (var webClient = new WebClient())
            {
                webClient.Headers.Add("user-agent", "Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)");
                foreach (var link in arr)
                {
                    try
                    {
                        if (link.StartsWith("https://cdn.becungshop.vn/"))
                        {
                            result.Add(link);
                            continue;
                        }
                        byte[] data = webClient.DownloadData(link);
                        var fileName =  DateTime.Now.GetHashCode().ToString("x") +".jpg";//Path.GetFileName(link);
                        //if(!fileName.Contains(".jpg") && !fileName.Contains(".png")) fileName= 
                        PutObjectRequest request = new PutObjectRequest()
                        {
                            BucketName = bucketBlogName,
                            Key = fileName,
                            InputStream = new MemoryStream(data),
                            AutoCloseStream = true,
                            CannedACL = S3CannedACL.PublicRead,
                            StorageClass = S3StorageClass.ReducedRedundancy
                        };
                        var client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.APSoutheast1);
                        PutObjectResponse response = client.PutObject(request);
                        if (response.HttpStatusCode == HttpStatusCode.OK)
                        {
                            //Task.Factory.StartNew(() =>
                            //{
                                var s3Url = host + "/bcs-s3/blogs/" + fileName;
                                using (var wc = new WebClient())
                                {
                                    var uri = new Uri(@"https:" + s3Url + "?w=500");
                                    var loc = System.Web.Hosting.HostingEnvironment.MapPath("~") + @"/images/blog/content/" + fileName;
                                    wc.DownloadFile(uri,loc);
                                }
                                result.Add(host + @"/images/blog/content/" + fileName);
                                //using (var wc = new WebClient())
                                //{
                                //    result.Add(wc.DownloadString($"https://localhost:63851/image/blogcontentimg/{fileName}")); //Bug https
                                //}
                            //});
                        }
                        //var descPath = string.Format(@"{0}/{1}",
                        //    Path.Combine(System.Web.HttpContext.Current.Server.MapPath(@"~\images\blog")),
                        //    fileName.ToLower());

                        //ImageBuilder.Current.Build(data, descPath, new ResizeSettings("width=2000;height=2000;format=jpg;mode=max"));

                        //result.Add(@"https://becungshop.vn/Images/blog/" + fileName.ToLower());
                    }
                    catch (Exception ex)
                    {
                        result.Add(string.Empty);
                        _log.Error(ex);
                    }
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { success = true, data = result});           
        }

        [HttpPost]
        [Route("product/group/upload")]
        public HttpResponseMessage UploadProductGroupImg()
        {
            //Get the uploaded image from the Files collection
            if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
            {
                //Get data from request file
                var httpPostedFile = System.Web.HttpContext.Current.Request.Files["HelpSectionImages"];
                var productId = int.Parse(System.Web.HttpContext.Current.Request.Form["ProductId"]);
                var id = 0;

                if (httpPostedFile != null && productId > 0)
                {
                    var query = string.Format("SELECT * FROM dbo.Product WHERE Id = {0}", productId);
                    Product product;

                    using (var cnn = SqlHelper.OpenConnection())
                    {
                        product = cnn.Query<Product>(query, new { id = productId}).FirstOrDefault();
                    }

                    if (product == null) return Request.CreateResponse(HttpStatusCode.BadRequest, new { success = false, message = "Sản phẩm không tồn tại" });
                                        
                    query = @"INSERT INTO [dbo].[ProductImage]
                                    ([ProductId]
                                    ,[ImgOriginal]
                                    ,[Img500x500]
                                    ,[Img300x300]
                                    ,[Img100x100]
                                    ,[CreatedDate]
                                    ,[CreatedUser]
                                    ,[ModifiedDate]
                                    ,[ModifiedUser])
                                VALUES
                                    (@productId
                                    ,null
                                    ,null
                                    ,null
                                    ,null
                                    ,GETDATE()
                                    ,'admin'
                                    ,GETDATE()
                                    ,'admin')
	                        select SCOPE_IDENTITY();";

                    using (var cnn = SqlHelper.OpenConnection())
                    {
                        id = cnn.ExecuteScalar<int>(query, new { productId});
                    }                    
                                        
                    var client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.APSoutheast1);
                    var keyName = product.FriendlyUrl + "-g" + id + ".jpg";
                    PutObjectRequest request = new PutObjectRequest()
                    {
                        BucketName = bucketName,
                        Key = keyName,
                        InputStream = httpPostedFile.InputStream,
                        AutoCloseStream = true,
                        CannedACL = S3CannedACL.PublicRead,
                        StorageClass = S3StorageClass.ReducedRedundancy
                    };

                    PutObjectResponse response = client.PutObject(request);
                    if (response.HttpStatusCode == HttpStatusCode.OK)
                    {
                        var imgOriginal = host + "/bcs-s3/products/" + keyName;
                        using (var cnn = SqlHelper.OpenConnection())
                        {
                            query = "Update ProductImage set ImgOriginal = @imgOriginal Where Id = @id";
                            cnn.Execute(query, new { imgOriginal, id });
                        }

                        Task.Factory.StartNew(() =>
                        {
                            using (var wc = new WebClient())
                            {
                                wc.DownloadString("https:" + host + "/image/product/group/" + id);
                            }
                        });

                        return Request.CreateResponse(HttpStatusCode.OK, new { success = true, message = "Upload ảnh thành công" });
                    }
                }
            }

            return Request.CreateResponse(HttpStatusCode.BadRequest, new { success = false, message = "Lỗi không xác định, vui lòng liên hệ quản trị" });
        }

        private bool Upload(Stream stream, Product productImage)
        {
            var client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.APSoutheast1);
            var keyName = productImage.FriendlyUrl + ".jpg";
            PutObjectRequest request = new PutObjectRequest()
            {
                BucketName = bucketName,
                Key = keyName,
                InputStream = stream,
                AutoCloseStream = true,
                CannedACL = S3CannedACL.PublicRead,
                StorageClass = S3StorageClass.ReducedRedundancy
            };

            PutObjectResponse response = client.PutObject(request);

            return response.HttpStatusCode == HttpStatusCode.OK ? true: false;            
        }
     
        [HttpGet]
        [Route("product/{id}")]
        public HttpResponseMessage GetProductImage(int id)
        {
            var rootUrl = HttpContext.Current.Server.MapPath("~");
            Product item = null;

            using (var cnn =  SqlHelper.OpenConnection())
            {
                var sql = "select Id,Sku,FriendlyUrl,ImgOriginal,Img100x100,Img300x300, Img500x500 from Product (nolock) where id = @id";
                item = cnn.Query<Product>(sql, new { id }).FirstOrDefault();
            }

            if (item != null)
            {
                var keyName = item.ImgOriginal.Replace(host + "/bcs-s3/products/", "").Replace(".jpg", "");
                var img100x100 = @"/images/100x100/" + keyName + "-100x100.jpg";
                var img300x300 = @"/images/300x300/" + keyName + "-300x300.jpg";
                var img500x500 = @"/images/500x500/" + keyName + "-500x500.jpg";
                using (var wc = new WebClient())
                {
                    //wc.DownloadFileAsync(new Uri(@"https:" + item.ImgOriginal + "?w=100&h=100"), rootUrl + img100x100);
                    //wc.DownloadFileAsync(new Uri(@"https:" + item.ImgOriginal + "?w=300&h=300"), rootUrl + img300x300);
                    //wc.DownloadFileAsync(new Uri(@"https:" + item.ImgOriginal + "?w=500&h=500"), rootUrl + img500x500);

                    wc.DownloadFile(new Uri(@"https:" + item.ImgOriginal + "?w=90&h=90"), rootUrl + img100x100);
                    wc.DownloadFile(new Uri(@"https:" + item.ImgOriginal + "?w=300&h=300"), rootUrl + img300x300);
                    wc.DownloadFile(new Uri(@"https:" + item.ImgOriginal + "?w=650&h=650"), rootUrl + img500x500);
                }

                using (var cnn = SqlHelper.OpenConnection())
                {
                    var query = "Update Product set Img100x100 = @img100x100, Img300x300 = @img300x300, Img500x500 = @img500x500 Where Id = @id";
                    cnn.Execute(query, new { img100x100 = host + img100x100, img300x300 = host + img300x300, img500x500 = host + img500x500,id= id});
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        [Route("blogimg/{id}/{file}")]
        public HttpResponseMessage GetBlogImage(int id,string file)
        {
            try
            {
                var rootUrl = HttpContext.Current.Server.MapPath("~");
                if (string.IsNullOrEmpty(file) == false)
                {
                    var img = @"/images/blog/" + file + ".jpg";
                    var s3Url = host + "/bcs-s3/blogs/" + file + ".jpg";
                    //var s3Url = "//cdn.becungshop.vn" + "/bcs-s3/blogs/" + file + ".jpg";
                    using (var wc = new WebClient())
                    {
                        wc.DownloadFileAsync(new Uri(@"https:" + s3Url + "?w=500&h=500"), rootUrl + img);
                    }

                    if (id > 0)
                    {
                        using (var cnn = SqlHelper.OpenConnection())
                        {
                            var query = "Update Blog set ImageUrl = @imageUrl Where Id = @id";
                            cnn.Execute(query, new { imageUrl = host + img, id =id });
                        }
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }catch(Exception ex)
            {
                _log.Error(ex);
                return Request.CreateResponse(HttpStatusCode.BadRequest);             
            }
        }

        [HttpGet]
        [Route("blogcontentimg/{file}")]
        public HttpResponseMessage GetBlogContentImage(string file)
        {
            try
            {
                var rootUrl = HttpContext.Current.Server.MapPath("~");
                if (string.IsNullOrEmpty(file) == false)
                {
                    var img = @"/images/blog/content/" + file + ".jpg";
                    var s3Url = host + "/bcs-s3/blogs/" + file + ".jpg";
                    //var s3Url = "//cdn.becungshop.vn" + "/bcs-s3/blogs/" + file + ".jpg";
                    using (var wc = new WebClient())
                    {
                        wc.DownloadFileAsync(new Uri(@"https:" + s3Url + "?w=500&h=500"), rootUrl + img);
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        [HttpGet]
        [Route("product/group/{id}")]
        public HttpResponseMessage GetProductGroupImage(int id)
        {
            var rootUrl = HttpContext.Current.Server.MapPath("~");
            Product product = null;
            ProductImage productImage = null;

            using (var cnn = SqlHelper.OpenConnection())
            {
                var sqlGroup = "select * from ProductImage where id = @id";
                productImage = cnn.Query<ProductImage>(sqlGroup, new { id }).FirstOrDefault();

                var sql = "select * from Product where Id = @id";                
                product = cnn.Query<Product>(sql, new { id = productImage.ProductId }).FirstOrDefault();                
            }

            if (product != null)
            {
                var img100x100 = @"/images/100x100/" + product.FriendlyUrl + "-g" + productImage.Id + "-100x100.jpg";
                var img300x300 = @"/images/300x300/" + product.FriendlyUrl + "-g" + productImage.Id + "-300x300.jpg";
                var img500x500 = @"/images/500x500/" + product.FriendlyUrl + "-g" + productImage.Id + "-500x500.jpg";

                using (var wc = new WebClient())
                {
                    wc.DownloadFile(@"https:" + productImage.ImgOriginal + "?w=100&h=100", rootUrl + img100x100);
                    wc.DownloadFile(@"https:" + productImage.ImgOriginal + "?w=300&h=300", rootUrl + img300x300);
                    wc.DownloadFile(@"https:" + productImage.ImgOriginal + "?w=500&h=500", rootUrl + img500x500);
                }

                using (var cnn = SqlHelper.OpenConnection())
                {
                    var query = "Update ProductImage set Img100x100 = @img100x100, Img300x300 = @img300x300, Img500x500 = @img500x500 Where Id = @id";
                    cnn.Execute(query, new { img100x100 = host + img100x100, img300x300 = host + img300x300, img500x500 = host + img500x500, id });
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }


        #region Rating
        [HttpPost]
        [Route("rating/upload")]
        public HttpResponseMessage UploadRatingImg()
        {
            //Get the uploaded image from the Files collection
            if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
            {
                //Get data from request file
                var httpPostedFile = System.Web.HttpContext.Current.Request.Files["ImageUpload"];
                var id = int.Parse(System.Web.HttpContext.Current.Request.Form["Id"]);
                var pos = System.Web.HttpContext.Current.Request.Form["Pos"];

                if (httpPostedFile != null && id > 0)
                {
                    var query = string.Format("SELECT * FROM dbo.Rating (nolock) WHERE Id = {0}", id);
                    Rating ratingImage;

                    using (var cnn = SqlHelper.OpenConnection())
                    {
                        ratingImage = cnn.Query<Rating>(query).FirstOrDefault();
                    }

                    if (ratingImage == null) return Request.CreateResponse(HttpStatusCode.BadRequest, new { success = false, message = "Sản phẩm không tồn tại" });

                    var client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.APSoutheast1);
                    var keyName = DateTime.Now.GetHashCode().ToString("x") + ".jpg";

                    PutObjectRequest request = new PutObjectRequest()
                    {
                        BucketName = bucketRatingName,
                        Key = keyName,
                        InputStream = httpPostedFile.InputStream,
                        AutoCloseStream = true,
                        CannedACL = S3CannedACL.PublicRead,
                        StorageClass = S3StorageClass.ReducedRedundancy
                    };

                    PutObjectResponse response = client.PutObject(request);

                    if (response.HttpStatusCode == HttpStatusCode.OK)
                    {
                        var imgOriginal = host + "/" + bucketRatingName + "/" + keyName;
                        using (var cnn = SqlHelper.OpenConnection())
                        {
                            query = $"Update Rating set Image_{pos} = @imgOriginal Where Id = @id";
                            cnn.Execute(query, new { imgOriginal, id });
                        }

                        Task.Factory.StartNew(() =>
                        {
                            using (var wc = new WebClient())
                            {
                                wc.DownloadString("https:" + host + "/image/rating/" + id + "/" + pos); //Bug https
                            }
                        });

                        return Request.CreateResponse(HttpStatusCode.OK, new { success = true, message = "Upload ảnh thành công" });
                    }
                }
            }

            return Request.CreateResponse(HttpStatusCode.BadRequest, new { success = false, message = "Lỗi không xác định, vui lòng liên hệ quản trị" });
        }

        [HttpGet]
        [Route("rating/{id}/{pos}")]
        public HttpResponseMessage GetRatingImage(int id, int pos)
        {
            var rootUrl = HttpContext.Current.Server.MapPath("~");
            Rating item = null;

            using (var cnn = SqlHelper.OpenConnection())
            {
                var sql = "select * from Rating (nolock) where id = @id";
                item = cnn.Query<Rating>(sql, new { id }).FirstOrDefault();
            }

            if (item != null)
            {
                switch (pos)
                {
                    case 1:
                        var keyName = item.Image_1.Replace(host + "/" + bucketRatingName + "/", "").Replace(".jpg", "");
                        var img100x100 = @"/images/rating/100x100/" + keyName + "-100x100.jpg";
                        var img500x500 = @"/images/rating/500x500/" + keyName + "-500x500.jpg";
                        using (var wc = new WebClient())
                        {
                            wc.DownloadFile(new Uri(@"https:" + item.Image_1 + "?w=100&h=100"), rootUrl + img100x100);
                            wc.DownloadFile(new Uri(@"https:" + item.Image_1 + "?w=700&h=700"), rootUrl + img500x500);
                        }

                        using (var cnn = SqlHelper.OpenConnection())
                        {
                            var query = "Update Rating set Image_1 = @img100x100 Where Id = @id";
                            cnn.Execute(query, new { img100x100 = host + img100x100, id = id });
                        }
                        break;
                    case 2:
                        keyName = item.Image_2.Replace(host + bucketRatingName + "/", "").Replace(".jpg", "");
                        img100x100 = @"/images/rating/100x100/" + keyName + "-100x100.jpg";
                        img500x500 = @"/images/rating/500x500/" + keyName + "-500x500.jpg";
                        using (var wc = new WebClient())
                        {
                            wc.DownloadFile(new Uri(@"https:" + item.Image_1 + "?w=100&h=100"), rootUrl + img100x100);
                            wc.DownloadFile(new Uri(@"https:" + item.Image_1 + "?w=500&h=500"), rootUrl + img500x500);
                        }

                        using (var cnn = SqlHelper.OpenConnection())
                        {
                            var query = "Update Rating set Image_2 = @img100x100 Where Id = @id";
                            cnn.Execute(query, new { img100x100 = host + img100x100, id = id });
                        }
                        break;
                }
                
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
        #endregion
    }

    public static class SqlHelper
    {
        public static SqlConnection OpenConnection()
        {           
            var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["default"].ConnectionString);
            connection.Open();

            return connection;
        }
    }

    public class Product
    {
        public int Id { get; set; } 
        public string Sku { get; set; }
        public string FriendlyUrl { get; set; }
        public string Img100x100 { get; set; }
        public string Img300x300 { get; set; }
        public string Img500x500 { get; set; }
        public string ImgOriginal { get; set; }
    }
    
    public class ProductImage : Product
    {
        public int ProductId { get; set; }
    }

    public class Rating 
    {
        public int Id { get; set; }
        public string Image_1 { get; set; }
        public string Image_2 { get; set; }
        public string Image_3 { get; set; }
        public string Image_4 { get; set; }
        public string Image_5 { get; set; }
    }
}