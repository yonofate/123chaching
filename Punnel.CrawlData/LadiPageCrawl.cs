using Newtonsoft.Json;
using Punnel.Core.Entities.Model;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.CrawlData
{
    public class LadiPageCrawl
    {
        public static readonly string ApiURL_TemplateCate = "https://api.ladipage.vn/v1/app/LoadCate";
        public static readonly string ApiURL_Templates= "https://api.ladipage.vn/v1/app/findbytempsession";
        public static readonly string ApiURL_Template = "https://api.ladipage.vn/v1/App/FindSourceTempSession";
        public LadiPageCrawl()
        {
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
        }

        public List<TemplateCateResponse> GetTemplateCate(int type)
        {
            try
            {
                string rdata = $"type={type}";
                var client = new RestClient(string.Format("{0}?{1}", ApiURL_TemplateCate, rdata));
                var request = new RestRequest(Method.GET);
                request.AddHeader("cache-control", "no-cache");
                request.AddHeader("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYmM2NTcyZTljYjdlOWUxNzQyZGFiMSIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE1MjQxNDk5NjIsImV4cCI6MTUyNDc1NDc2MiwiYXVkIjoiMSIsImlzcyI6IjEifQ.LSGYonyWovhRTEfo1i0f44nSkpkepzk-PUPiQnJNhdg");
                IRestResponse response = client.Execute(request);

                var result = JsonConvert.DeserializeObject<JResponse>(response.Content);
                return JsonConvert.DeserializeObject<List<TemplateCateResponse>>(result.data.ToString());
            }
            catch (Exception ex)
            {
                return new List<TemplateCateResponse>();
            }
        }

        public List<TemplateListResponse> GetTemplates(TemplateCateRequest req)
        {
            try
            {
                string rdata = $"cid={req.cid}&is_publish={req.is_publish}&limit={req.limit}&page={req.page}&type={req.type}";
                var client = new RestClient(string.Format("{0}?{1}",ApiURL_Templates,rdata));
                var request = new RestRequest(Method.GET);
                request.AddHeader("cache-control", "no-cache");
                request.AddHeader("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYmM2NTcyZTljYjdlOWUxNzQyZGFiMSIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE1MjQxNDk5NjIsImV4cCI6MTUyNDc1NDc2MiwiYXVkIjoiMSIsImlzcyI6IjEifQ.LSGYonyWovhRTEfo1i0f44nSkpkepzk-PUPiQnJNhdg");
                IRestResponse response = client.Execute(request);

                var result = JsonConvert.DeserializeObject<JResponse>(response.Content);
                return JsonConvert.DeserializeObject<List<TemplateListResponse>>(result.data.ToString());
            }
            catch (Exception ex)
            {
                return new List<TemplateListResponse>();
            }
        }

        public Core.Entities.Model.Template GetTemplate(string id, int type)
        {
            try
            {
                string rdata = $"id={id}&type={type}";
                var client = new RestClient(string.Format("{0}?{1}", ApiURL_Template, rdata));
                var request = new RestRequest(Method.GET);
                request.AddHeader("cache-control", "no-cache");
                request.AddHeader("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYmM2NTcyZTljYjdlOWUxNzQyZGFiMSIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE1MjQxNDk5NjIsImV4cCI6MTUyNDc1NDc2MiwiYXVkIjoiMSIsImlzcyI6IjEifQ.LSGYonyWovhRTEfo1i0f44nSkpkepzk-PUPiQnJNhdg");
                IRestResponse response = client.Execute(request);

                var result = JsonConvert.DeserializeObject<JResponse>(response.Content);
                var temp = JsonConvert.DeserializeObject<TemplateResponse>(result.data.ToString());
                return new Core.Entities.Model.Template()
                {
                    Domain = temp.domain,
                    Name = temp.title,
                    Thumbnail = temp.imagePage==null?"": temp.imagePage.Replace(".net//",".net/"),
                    Type = type,
                    Source = result.data.ToString(),
                    Id = Guid.NewGuid(),
                    Publish = true,
                    ReferId= temp.domain
                };
            }catch(Exception ex)
            {
                return null;
            }
        }

        public void ApiGetResponse()
        {
            var client = new RestClient("https://api3.getresponse360.com/v3/accounts");
            var request = new RestRequest(Method.GET);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("x-auth-token", "api-key a0c93e200b056f653af2efd8cf4ee053");
            IRestResponse response = client.Execute(request);
        }

        public Core.Entities.Tracking.PageImage GetImgInfo(string url)
        {
            if (string.IsNullOrEmpty(url)) return null;
            string ext = System.IO.Path.GetExtension(url);
            WebRequest request = WebRequest.Create(url);
            WebResponse response = request.GetResponse();
            var stream = response.GetResponseStream();
            //long k = stream.Length;
            Image img = Image.FromStream(stream);

            //Console.WriteLine("Image size: {0}x{1}",
            //image.Width, image.Height);
            return new Core.Entities.Tracking.PageImage()
            {
                Width = img.Width,
                Height = img.Height,
                //Size =k,
                Type = ext
            };
        }
    }

    public class TemplateCateRequest
    {
        public string cid { get; set; }
        public int is_publish { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
        public int type { get; set; }
    }

    public class TemplateListResponse
    {
        public string id { get; set; }
        public string name { get; set; }
        public string thumbnail { get; set; }
        public string domain { get; set; }

    }

    public class TemplateResponse
    {
        public string body { get; set; }
        public string domain { get; set; }
        public string head { get; set; }       
        public string imagePage { get; set; }
        public string title { get; set; }
    }

    public class TemplateCateResponse
    {
        public string guid { get; set; }
        public string user_id { get; set; }
        public string name { get; set; }
        public string No { get; set; }
        public string description { get; set; }
        public string active { get; set; }
        public string type { get; set; }
        public string date_created { get; set; }
        public string user { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public string id { get; set; }

    }

    public class JResponse
    {
        /// <summary>
        /// Dữ liệu trả về
        /// </summary>
        public object data { get; set; }

        /// <summary>
        /// Thông báo
        /// </summary>
        public object messager { get; set; }

        /// <summary>
        /// Mã status response
        /// </summary>
        public int code { get; set; }
    }
}
