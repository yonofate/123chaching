using Amazon.S3;
using Amazon.S3.Model;
using Punnel.Cdn.Filters;
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

namespace Punnel.Cdn.Controllers
{
    [TCCorsPolicyProvider]
    [RoutePrefix("image")]
    public class ImageController : ApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("ImageController");
        private readonly static string accessKey = "AKIATR5B5N2RF73X6CDT";   
        private readonly static string secretKey = "+Bd8UsNoEJs7FWsEemuAsh0UpEaz+NjTe4DRJatcZ";
        private readonly static string bucketName = "punnel-static/sys";
        private readonly static string host = "//cdn.becungshop.vn";        
        //private readonly static string host = "//localhost:63851";

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