using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using log4net;
using Newtonsoft.Json;
using Punnel.Core.Entities;
using RestSharp;

namespace Punnel.Core.BLL.Utils
{
    public class WordpressUtils
    {
        private static readonly ILog _log = LogManager.GetLogger("WordpressUtils");
        public string _domain;
        public string _token;

        public WordpressUtils(string domain, string token)
        {
            _domain = domain;
            _token = token;
        }

        public ApiResponse Auth()
        {
            ApiResponse res = new ApiResponse();
            res.Data = false;
            try
            {
                var client = new RestClient($"{_domain}/punnel/api/index.php?punnel_api=1");
                var request = new RestRequest(Method.POST);
                request.AddHeader("cache-control", "no-cache");
                request.AddHeader("content-type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW");

                string header = string.Format("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"token\"\r\n\r\n{0}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"action\"\r\n\r\n{1}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"url\"\r\n\r\n{2}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"title\"\r\n\r\n{3}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"html\"\r\n\r\n{4}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"type\"\r\n\r\n{5}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--",
                    _token,
                    "checkurl",
                    "a",
                    "",
                    "",
                    "page");

                request.AddParameter("multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW", header, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var result = JsonConvert.DeserializeObject<WpPostResponse>(response.Content);
                    if (result.code == 205 || result.code == 206)
                    {
                        res.Data = true;
                        res.Code = System.Net.HttpStatusCode.OK;
                    }
                    else if (result.code == 190) res.Message = "Token không hợp lệ";
                    else res.Message = "Thông tin kết nối không hợp lệ. Vui lòng kiểm tra lại";
                }
                else
                {
                    _log.Error(response.ErrorMessage);
                    _log.Error(response.ErrorException);
                    res.Data = true;
                    res.Code = System.Net.HttpStatusCode.OK;
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = "Lỗi! Kiểm tra lại thông tin cấu hình Wordpress";
            }
            return res;
        }
        public ApiResponse IsExits(string pathUrl)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var client = new RestClient($"{_domain}/punnel/api/index.php?punnel_api=1");
                var request = new RestRequest(Method.POST);
                request.AddHeader("cache-control", "no-cache");
                request.AddHeader("content-type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW");

                string header = string.Format("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"token\"\r\n\r\n{0}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"action\"\r\n\r\n{1}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"url\"\r\n\r\n{2}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"title\"\r\n\r\n{3}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"html\"\r\n\r\n{4}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"type\"\r\n\r\n{5}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--",
                    _token,
                    "checkurl",
                    pathUrl,
                    "",
                    "",
                    "page");

                request.AddParameter("multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW", header, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var result = JsonConvert.DeserializeObject<WpPostResponse>(response.Content);
                    if (result.code == 205) {
                        res.Data = true;
                        res.Code = System.Net.HttpStatusCode.OK;
                    }
                    else if (result.code == 206)
                    {
                        res.Data = false;
                        res.Code = System.Net.HttpStatusCode.OK;
                    }
                    else if (result.code == 190) res.Message = "Token không hợp lệ";
                    else res.Message = "Thông tin kết nối không hợp lệ. Vui lòng kiểm tra lại";
                }else
                {
                    res.Message = "Không thể xuất bản từ đây, vui lòng xuất bản landing page từ phía WP";
                }
            }
            catch (Exception ex)
            {
                res.Message = "Lỗi! Kiểm tra lại thông tin cấu hình Wordpress";
            }
            return res;
        }
        public ApiResponse CreateOrUpdatePage(string pathUrl, string title, string html,string type)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                string action;
                var r = IsExits(pathUrl);
                if (r.Code != System.Net.HttpStatusCode.OK) return r;

                if ((bool)r.Data==true) action = "update";
                else action = "create";

                var client = new RestClient($"{_domain}/punnel/api/index.php?punnel_api=1");
                var request = new RestRequest(Method.POST);
                request.AddHeader("cache-control", "no-cache");
                request.AddHeader("content-type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW");

                string header = string.Format("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"token\"\r\n\r\n{0}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"action\"\r\n\r\n{1}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"url\"\r\n\r\n{2}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"title\"\r\n\r\n{3}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"html\"\r\n\r\n{4}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"type\"\r\n\r\n{5}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--",
                    _token,
                    action,
                    pathUrl,
                    title,
                    html,
                    type);

                request.AddParameter("multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",header, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var result = JsonConvert.DeserializeObject<WpPostResponse>(response.Content);
                    if (result.code == 200 || result.code == 400)
                    {
                        res.Code = response.StatusCode;
                        res.Data = result.url;
                    }
                    else
                    {
                        if(result.code==190) res.Message = "Token không hợp lệ";
                        if (result.code == 205) res.Message = "Trang này đã tồn tại";

                        else res.Message = "Thông tin kết nối không hợp lệ. Vui lòng kiểm tra lại";
                    }
                }
                else 
                {
                    res.Message = "Không thể xuất bản từ đây, vui lòng xuất bản landing page từ phía WP";
                }
            }
            catch(Exception ex)
            {
                res.Message = "Lỗi! Kiểm tra lại thông tin cấu hình Wordpress";
            }
            return res;
        }

    }

    public class WpPostResponse
    {
        public int code { get; set; }
        public string url { get; set; }
    }
}
