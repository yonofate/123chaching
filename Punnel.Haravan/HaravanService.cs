using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using HaravanAPIAdapterLibrary;
using log4net;
using Newtonsoft.Json;
using Punnel.Core.Entities;

namespace Punnel.HaravanService
{
    public class HaravanService
    {
        private static ILog _log = LogManager.GetLogger("HaravanService");
        private readonly string Haravan_APP_ID = MBN.Utils.WebUtils.AppSettings("HARAVAN_APP_ID", "52ba21441501f4134bedc0fe0b84cdf9");
        private readonly string Haravan_API_KEY = MBN.Utils.WebUtils.AppSettings("HARAVAN_API_KEY", "afc72ce10ba9842647de5ffac957d8b9");
        private readonly string Haravan_API_SECRET = MBN.Utils.WebUtils.AppSettings("HARAVAN_API_SECRET", "9b2f9daf15727eb34ae8c779cb321bda");

        private readonly string Haravan_API_CALLBACK = MBN.Utils.WebUtils.AppSettings("HARAVAN_API_CALLBACK", "https://483921d9.ngrok.io/home/authcallback/");
        private readonly string HARAVAN_API_INSTALL_CALLBACK = MBN.Utils.WebUtils.AppSettings("HARAVAN_API_INSTALL_CALLBACK", "http://localhost:2171/integrationapi/hrv-auth");
        string _accessToken;
        public HaravanService()
        {
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
        }

        HaravanAPIAuthorizer GetAuthorizer()
        {
            return new HaravanAPIAuthorizer(Haravan_APP_ID, Haravan_API_SECRET, Haravan_API_CALLBACK, HARAVAN_API_INSTALL_CALLBACK);
        }

        public HaravanService(string accessToken)
        {
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
            _accessToken = accessToken;
        }

        public Uri BuildPageAuthUri()
        {
            HaravanAPIAuthorizer authorizer = GetAuthorizer();
            var url = authorizer.GetAuthorizationURL(new string[] { "openid", "profile", "email", "org", "userinfo", "web.read_contents", "web.write_contents", "web.read_themes", "web.write_themes" , "grant_service" });
            return new Uri(url, UriKind.Absolute);
        }

        public async Task<Tuple<string,string>> GetAccessToken(string code)
        {
            HaravanAPIAuthorizer authorizer = GetAuthorizer();
            HaravanAuthorizationState authState = authorizer.AuthorizeClient(code);

            if (authState != null && authState.AccessToken != null)
            {
                return new Tuple<string, string>(authState.AccessToken, authState.ShopName);
            }
            return new Tuple<string, string>("","");
        }

        public async Task<ApiResponse> CountPage()
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var authorizeState = new HaravanAuthorizationState() { AccessToken = _accessToken};
                var client = new HaravanAPIClient(authorizeState);
                var objs = client.Get("/web/themes.json").ToString();
                if (objs.Count() >= 1)
                {
                    res.Data = objs;
                    res.Code = HttpStatusCode.OK;
                }
            }
            catch (Exception ex)
            {
                res.Message = "Kết nối đến Haravan thất bại, vui lòng thử lại";
            }
            return res;
        }

        public async Task<ApiResponse> CreateOrUpdatePage(string html, string title, string url, string id, string referPageId = null)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var authorizeState = new HaravanAuthorizationState() { AccessToken = _accessToken };
                var client = new HaravanAPIClient(authorizeState);
                var thh = client.Get("/web/themes.json").ToString();
                
                var themes = JsonConvert.DeserializeObject<Themes>(thh);
                _log.Warn(thh);
                var theme = themes.themes.FirstOrDefault(x => x.role == "main");
                if (theme == null) return res;

                string name = $"punnel-{id}";
                string asset_key = $"templates/page.{name}.liquid";
                var asset = new AssetPut()
                {
                    key = asset_key,
                    value = @"{% layout none %} " + html
                };
                var assets = new ObjPost();
                assets.asset = asset;

                client.Put($"/web/themes/{theme.id}/assets.json", assets);

                _log.Warn("tao page haravan trên theme" + theme.id);
                //page
                Page page = null;
                long? referId = null;
                if (string.IsNullOrEmpty(referPageId) == false) referId = long.Parse(referPageId);
                if (referId != null)
                {
                    var sp = client.Get($"/web/pages/{referId}.json");
                    if(sp!=null) page = JsonConvert.DeserializeObject<ObjWrap>(sp.ToString()).page;
                }

                ObjPost objPage = new ObjPost();
                if (page == null)
                {
                    objPage.page = new PagePost()
                    {
                        title = title,
                        body_html = $"Landing page {title}. Click nút [Xem thử] để xem trang",
                        published = true,
                        template_suffix = name,
                        handle = url
                    };
                    var obj = client.Post("/web/pages.json", objPage);
                    page = JsonConvert.DeserializeObject<ObjWrap>(obj.ToString()).page;
                }
                else
                {
                    objPage.page = new PagePost()
                    {
                        id = page.id,
                        title = title,
                        body_html = $"Landing page {title}. Click nút [Xem thử] để xem trang",
                        published = true,
                        template_suffix = name,
                        handle = url
                    };
                    var obj = client.Put($"/web/pages/{page.id}.json", objPage);
                    page = JsonConvert.DeserializeObject<ObjWrap>(obj.ToString()).page;
                }

                res.Data = page.id;
                res.Code = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = "Quyền truy cập đến haravan không hợp lệ hoặc đã hết hạn, bạn vui lòng vào phần ứng dụng để kiểm tra lại kết nối!";
            }
            return res;
        }

        string GetSubDomain(string surl)
        {
            var url = new Uri(surl);
            if (url.HostNameType == UriHostNameType.Dns)
            {

                string host = url.Host;

                var nodes = host.Split('.');
                if (nodes[0] == "www") return nodes[1].ToString();
                else return nodes[0].ToString();

            }

            return null;
        }

        public async Task<ApiResponse> Delete()
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var authorizeState = new HaravanAuthorizationState() { AccessToken = _accessToken };
                var client = new HaravanAPIClient(authorizeState);
                var objs = client.Delete("/web/oauth/revoke");
                res.Data = objs;
                res.Code = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                res.Message = "Kết nối đến Haravan thất bại, vui lòng thử lại";
            }
            return res;
        }
    }
}
