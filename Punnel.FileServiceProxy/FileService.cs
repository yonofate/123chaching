using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Punnel.FileServiceProxy
{

    public class FileService : IFileService
    {
        //private const string PATTERN = "{0}_simg_{1}_{2}x{3}_{4}{5}";
        //private const string CROP_PATTERN = "{0}_simg_{1}_{2}-{3}-{4}-{5}_{6}{7}";
        //private static Regex urlRegex = new Regex(@"(.+)(\..+)$", RegexOptions.IgnoreCase | RegexOptions.Compiled);
        //private readonly static Regex UrlQueryPattern = new Regex(@"(?<PATH>.+)_simg_(?<CS>.{6})_(?<W>[\d]+)x(?<H>[\d]+)_(?<M>.+)(?<EXT>\..+)$", RegexOptions.Compiled | RegexOptions.IgnoreCase);

        public Response<FileResponseModel> UploadFile(Stream fileStream, string fileName, string code)
        {
            try
            {
                fileName = fileName.Replace(" ", "_");
                var path = string.Join("/", code,"thumb", fileName);
                string resultPath = UploadFileEx(fileStream, path, Configs.TransferService_File + "/new");
               // string resultPath = UploadFileEx(fileStream, fileName, code, Configs.TransferService_File);

                if (string.IsNullOrWhiteSpace(resultPath))
                {
                    return new Response<FileResponseModel>() { IsError = true, Message = "Lỗi không xác định" };
                }
                else
                    return new Response<FileResponseModel>() { IsError = false, Data = new FileResponseModel()
                    {
                        filename=fileName,
                        file_name_s3= Path.GetFileName(resultPath),
                        path=resultPath
                    }
                };
            }
            catch (Exception ex)
            {
                return new Response<FileResponseModel>() { IsError = true, Message = ex.Message };
            }
        }

        public Response<FileResponseModel> UploadFile(Stream fileStream, string path)
        {
            try
            {

                string resultPath = UploadFileEx(fileStream, path, Configs.TransferService_File + "/new");

                if (string.IsNullOrWhiteSpace(resultPath))
                {
                    return new Response<FileResponseModel>() { IsError = true, Message = "Lỗi không xác định" };
                }
                else
                    return new Response<FileResponseModel>()
                    {
                        IsError = false,
                        Data = new FileResponseModel()
                        {
                            filename = Path.GetFileName(path),
                            file_name_s3 = Path.GetFileName(resultPath),
                            path = resultPath
                        }
                    };
            }
            catch (Exception ex)
            {
                return new Response<FileResponseModel>() { IsError = true, Message = ex.Message };
            }
        }

        public Response<FileResponseModel> UploadFileFromUrl(string imgUrl, string code)
        {
            try
            {
                string filename = "";
                Uri uri = new Uri(imgUrl);
                string path1 = String.Format("{0}{1}{2}{3}", uri.Scheme, Uri.SchemeDelimiter, uri.Authority, uri.AbsolutePath);
                string extension = Path.GetExtension(path1);
                filename= System.IO.Path.GetFileName(path1);

                using (WebClient webClient = new WebClient())
                {
                    byte[] data = webClient.DownloadData(imgUrl);
                    Stream stream = new MemoryStream(data);
                    return UploadFile(stream, filename, code);
                }
            }
            catch (Exception ex)
            {
                return new Response<FileResponseModel>() { IsError = true, Message = ex.Message };
            }
        }

        public bool RemoveFile(string userId, string fileName)
        {
            Uri uri = new Uri(Configs.TransferService_RemoveFile + "?userId=" + userId + "&fileName=" + fileName );
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream s = response.GetResponseStream();
            StreamReader sr = new StreamReader(s);
            var res= sr.ReadToEnd();
            if (res == "deleted") return true;
            else return false;
        }
        
        public bool DeleteFile(string path)
        {
            Uri uri = new Uri(Configs.TransferService_DeleteFile + "?fileName=" + path);
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream s = response.GetResponseStream();
            StreamReader sr = new StreamReader(s);
            var res = sr.ReadToEnd();
            if (res == "deleted") return true;
            else return false;
        }

        public Response<string>[] UploadFileFromURL(string[] imgUrls)
        {
            if (imgUrls == null || imgUrls.Length <= 0 || imgUrls.Length > 20) throw new ArgumentNullException("urls");
            List<Response<string>> result = new List<Response<string>>();
            WebClient cl = new WebClient();
            NameValueCollection nvc = new NameValueCollection();
            for (int i = 0; i < imgUrls.Length; i++)
            {
                try
                {
                    nvc.Add("url[" + i + "]", imgUrls[i]);
                }
                catch (Exception ex)
                {
                    result.Add(new Response<string>() { IsError = true, Message = ex.ToString() });

                }
            }
            byte[] responsebytes = cl.UploadValues(Configs.TransferService_Url, "POST", nvc);
            string responsebody = Encoding.UTF8.GetString(responsebytes);

            string[] resultUrls = responsebody.Split(';');
            if (resultUrls.Length > 0)
            {
                for (int i = 0; i < resultUrls.Length; i++)
                {

                    if (string.IsNullOrWhiteSpace(resultUrls[i]) || !IsFromFileService(resultUrls[i])) result.Add(new Response<string>() { IsError = true, Message = "Url rỗng" });
                    else result.Add(new Response<string>() { IsError = false, Data = resultUrls[i] });

                }
            }
            return result.ToArray();
        }

        private static string UploadFileEx(Stream file, string fileName, string code, string serviceUrl)
        {
            var fileFormName = "file";
            var contenttype = "application/octet-stream";

            Uri uri = new Uri(serviceUrl + "?code=" + code);

            string boundary = "----------" + DateTime.Now.Ticks.ToString("x");
            HttpWebRequest webrequest = (HttpWebRequest)WebRequest.Create(uri);
            webrequest.ContentType = "multipart/form-data; boundary=" + boundary;
            webrequest.Method = "POST";

            // Build up the post message header
            StringBuilder sb = new StringBuilder();
            sb.Append("--");
            sb.Append(boundary);
            sb.Append("\r\n");
            sb.Append("Content-Disposition: form-data; name=\"");
            sb.Append(fileFormName);
            sb.Append("\"; filename=\"");
            sb.Append(fileName);
            sb.Append("\"");
            sb.Append("\r\n");
            sb.Append("Content-Type: ");
            sb.Append(contenttype);
            sb.Append("\r\n");
            sb.Append("\r\n");

            string postHeader = sb.ToString();

            byte[] postHeaderBytes = Encoding.UTF8.GetBytes(postHeader);

            // Build the trailing boundary string as a byte array
            // ensuring the boundary appears on a line by itself
            byte[] boundaryBytes =
                   Encoding.ASCII.GetBytes("\r\n--" + boundary + "\r\n");

            long length = postHeaderBytes.Length + file.Length +
                                                   boundaryBytes.Length;
            webrequest.ContentLength = length;

            using (Stream requestStream = webrequest.GetRequestStream())
            {

                // Write out our post header
                requestStream.Write(postHeaderBytes, 0, postHeaderBytes.Length);

                // Write out the file contents
                byte[] buffer = new Byte[checked((uint)Math.Min(4096,
                                         (int)file.Length))];
                int bytesRead = 0;
                while ((bytesRead = file.Read(buffer, 0, buffer.Length)) != 0)
                    requestStream.Write(buffer, 0, bytesRead);

                // Write out the trailing boundary
                requestStream.Write(boundaryBytes, 0, boundaryBytes.Length);               
            }
            WebResponse responce = webrequest.GetResponse();
            Stream s = responce.GetResponseStream();
            StreamReader sr = new StreamReader(s);
          
            return sr.ReadToEnd();
        }

        private static string UploadFileEx(Stream file, string path, string serviceUrl)
        {
            var fileFormName = "file";
            var contenttype = "application/octet-stream";

            Uri uri = new Uri(serviceUrl);

            string boundary = "----------" + DateTime.Now.Ticks.ToString("x");
            HttpWebRequest webrequest = (HttpWebRequest)WebRequest.Create(uri);
            webrequest.ContentType = "multipart/form-data; boundary=" + boundary;
            webrequest.Method = "POST";

            // Build up the post message header
            StringBuilder sb = new StringBuilder();
            sb.Append("--");
            sb.Append(boundary);
            sb.Append("\r\n");
            sb.Append("Content-Disposition: form-data; name=\"");
            sb.Append(fileFormName);
            sb.Append("\"; filename=\"");
            sb.Append(path);
            sb.Append("\"");
            sb.Append("\r\n");
            sb.Append("Content-Type: ");
            sb.Append(contenttype);
            sb.Append("\r\n");
            sb.Append("\r\n");

            string postHeader = sb.ToString();

            byte[] postHeaderBytes = Encoding.UTF8.GetBytes(postHeader);

            // Build the trailing boundary string as a byte array
            // ensuring the boundary appears on a line by itself
            byte[] boundaryBytes =
                   Encoding.ASCII.GetBytes("\r\n--" + boundary + "\r\n");

            long length = postHeaderBytes.Length + file.Length +
                                                   boundaryBytes.Length;
            webrequest.ContentLength = length;

            using (Stream requestStream = webrequest.GetRequestStream())
            {

                // Write out our post header
                requestStream.Write(postHeaderBytes, 0, postHeaderBytes.Length);

                // Write out the file contents
                byte[] buffer = new Byte[checked((uint)Math.Min(4096,
                                         (int)file.Length))];
                int bytesRead = 0;
                while ((bytesRead = file.Read(buffer, 0, buffer.Length)) != 0)
                    requestStream.Write(buffer, 0, bytesRead);

                // Write out the trailing boundary
                requestStream.Write(boundaryBytes, 0, boundaryBytes.Length);
            }
            WebResponse responce = webrequest.GetResponse();
            Stream s = responce.GetResponseStream();
            StreamReader sr = new StreamReader(s);

            return sr.ReadToEnd();
        }

        public bool IsFromFileService(string URLServie)
        {
            if (string.IsNullOrWhiteSpace(URLServie)) return false;
            if (URLServie.StartsWith(Configs.TransferService_Domain)) return true;
            else
                return false;
        }

        private static string GetMd5Hash(MD5 md5Hash, string input)
        {
            // Convert the input string to a byte array and compute the hash. 
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes 
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data  
            // and format each one as a hexadecimal string. 
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string. 
            return sBuilder.ToString();
        }

        #region AmazonS3
        public async Task UploadFileToS3(Stream fileStream, string fileName, string code)
        {
            S3Utils s3 = new S3Utils();
            await s3.Upload(fileStream,fileName,code);
        }
        #endregion
    }
}
