using log4net;
using Newtonsoft.Json;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.MailChimp;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Cache;
using System.Text;
using System.Threading.Tasks;

namespace IntegrationServices.Ftp
{
    public class FtpTask
    {
        private static readonly ILog _log = LogManager.GetLogger("FtpTask");
        string _host, _userName, _password;
        public FtpTask(string host,string userName,string password)
        {
            _host = host;
            _userName = userName;
            _password = password;
        }

        public ApiResponse Auth()
        {
            ApiResponse res = new ApiResponse();
            try
            {
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create("ftp://" + _host);
                request.Method = WebRequestMethods.Ftp.ListDirectoryDetails;
                request.Credentials = new NetworkCredential(_userName, _password);
                request.KeepAlive = false;
                request.UseBinary = true;
                request.UsePassive = true;

                FtpWebResponse response = (FtpWebResponse)request.GetResponse();

                Stream responseStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(responseStream);
                res.Data= reader.ReadToEnd();

                _log.InfoFormat("Ftp Directory List Complete, status {0}", response.StatusDescription);

                reader.Close();
                response.Close();
                res.Code = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = Punnel.Core.Entities.Resources.Messages.ApiKey_Err;
            }
            return res;
        }

        #region Upload File
        public ApiResponse UploadFile(string fileName, string content)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                // Make Source File
                var sourceFile = System.IO.Path.Combine(@"C://Punnel/PageTemp", DateTime.Now.GetHashCode().ToString("x") + fileName);
                System.IO.File.WriteAllText(sourceFile, content, Encoding.UTF8);

                //upload to Ftp
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create("ftp://" + _host +  "/" + fileName);
                request.CachePolicy = new HttpRequestCachePolicy(HttpRequestCacheLevel.CacheIfAvailable);
                request.Method = WebRequestMethods.Ftp.UploadFile;
                request.Credentials = new NetworkCredential(_userName, _password);
                // Copy the contents of the file to the request stream.  
                StreamReader sourceStream = new StreamReader(sourceFile);
                byte[] fileContents = Encoding.UTF8.GetBytes(sourceStream.ReadToEnd());
                sourceStream.Close();
                request.ContentLength = fileContents.Length;
                Stream requestStream = request.GetRequestStream();
                requestStream.Write(fileContents, 0, fileContents.Length);
                requestStream.Close();
                FtpWebResponse response = (FtpWebResponse)request.GetResponse();
                _log.InfoFormat("Ftp Upload File Complete, status {0}", response.StatusDescription);

                response.Close();
                
                //delete sourcefile
                System.IO.File.Delete(System.IO.Path.Combine(sourceFile));
                res.Code = HttpStatusCode.OK;
            }
            catch(Exception ex)
            {
                _log.Error(ex);
                res.Message = Punnel.Core.Entities.Resources.Messages.Api_Err;
            }
            return res;
        }
        #endregion

    }

    
}
