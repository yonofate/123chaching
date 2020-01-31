using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using SapoAPIAdapterLibrary;
using Newtonsoft.Json;
using Punnel.Core.Entities;
using log4net;

namespace Punnel.SapoService
{

    public class SapoService
    {
        private static readonly ILog _log = LogManager.GetLogger("SapoService");
        private readonly string Sapo_API_KEY = MBN.Utils.WebUtils.AppSettings("SAPO_API_KEY", "afc72ce10ba9842647de5ffac957d8b9");
        private readonly string Sapo_API_SECRET = MBN.Utils.WebUtils.AppSettings("SAPO_API_SECRET", "9b2f9daf15727eb34ae8c779cb321bda");

        private readonly string Sapo_API_CALLBACK = MBN.Utils.WebUtils.AppSettings("SAPO_API_CALLBACK", "https://483921d9.ngrok.io/home/authcallback/");

        string _shopUrl;
        string _accessToken;
        public SapoService()
        {
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
        }

        SapoAPIAuthorizer GetAuthorizer(string shopUrl)
        {
            shopUrl = shopUrl.StartsWith("http") ? shopUrl : "http://" + shopUrl;
            _shopUrl = GetSubDomain(shopUrl);
            return new SapoAPIAuthorizer(_shopUrl, Sapo_API_KEY, Sapo_API_SECRET, Sapo_API_CALLBACK);
        }

        public SapoService(string shopUrl, string accessToken)
        {
            shopUrl = shopUrl.StartsWith("http") ? shopUrl : "http://" + shopUrl;
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
            _shopUrl = GetSubDomain(shopUrl);
            _accessToken = accessToken;
        }

        public Uri BuildPageAuthUri(string shopUrl)
        {
            SapoAPIAuthorizer authorizer = GetAuthorizer(shopUrl);
            var url = authorizer.GetAuthorizationURL(new string[] { "read_content", "write_content", "read_themes", "write_themes" });
            return new Uri(url, UriKind.Absolute);
        }

        public async Task<string> GetAccessToken(string shopUrl,string code)
        {
            _log.InfoFormat("Sapo GetAccessToken: shopUrl = {0} , code = {1}", shopUrl, code);
            SapoAPIAuthorizer authorizer = GetAuthorizer(shopUrl);
            SapoAuthorizationState authState = authorizer.AuthorizeClient(code);
            _log.WarnFormat("Sapo GetAccessToken state: authState = {0}", authState);
            if (authState != null && authState.AccessToken != null)
            {
                return authState.AccessToken;
            }
            return "";
        }

        public async Task<ApiResponse> CountPage()
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var authorizeState = new SapoAuthorizationState() { ShopName = _shopUrl, AccessToken = _accessToken };
                var client = new SapoAPIClient(authorizeState);
                //var objs = client.Get("/admin/pages/count.json");
                var objs = client.Get("/admin/themes.json").ToString();
                if (objs.Count() >= 1)
                {
                    res.Data = objs;
                    res.Code = HttpStatusCode.OK;
                }
            }
            catch (Exception ex)
            {
                res.Message = "Kết nối đến Sapo thất bại, vui lòng thử lại";
            }
            return res;
        }

        public async Task<ApiResponse> CreateOrUpdatePage(string html, string title, string url, string id, string referPageId = null)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                //_log.Warn(_shopUrl);
                //_log.Warn(_accessToken);
                var authorizeState = new SapoAuthorizationState() { ShopName = _shopUrl, AccessToken = _accessToken };
                var client = new SapoAPIClient(authorizeState);
                //var objs = client.Get("/admin/pages/count.json");
                //var ss = client.Get("/admin/themes.json").ToString();
                var ss = client.Get("/admin/themes.json").ToString();
                var themes = JsonConvert.DeserializeObject<Themes>(ss);
                var theme = themes.themes.Where(x=>x.role=="main").FirstOrDefault();
                
                if (theme == null) return res;
                //_log.Warn(ss);
                //_log.Warn(theme);
                string name = $"punnel-{id}";
                string asset_key = $"templates/page.{name}.bwt";
                var asset = new AssetPut()
                {
                    key = asset_key,
                    value = @"{% layout none %} " + html
                };
                var assets = new ObjAssetWrap();
                assets.asset = asset;

                var objc= client.Put($"/admin/themes/{theme.id}/assets.json", assets);
                //var kkk = client.Get($"/admin/themes/{theme.id}/assets.json");
                //_log.WarnFormat("theme {0}", kkk);
                //page
                Page page = null;
                long? referId = null;
                if (string.IsNullOrEmpty(referPageId) == false) referId = long.Parse(referPageId);
                if (referId != null)
                {
                    var sp = client.Get($"/admin/pages/{referId}.json");
                    if(sp!=null) page = JsonConvert.DeserializeObject<ObjWrap>(sp.ToString()).page;
                }

                ObjPageWrap objPage = new ObjPageWrap();
                if (page == null)
                {
                    objPage.page = new PagePost()
                    {
                        title = title,
                        content = $"Landing page {title}. Click nút [Xem trên web] để xem trang",
                        published = true,
                        published_on = DateTime.UtcNow,
                        template_layout = $"page.{name}",
                        alias = url
                    };
                    var obj = client.Post("/admin/pages.json", objPage);
                    page = JsonConvert.DeserializeObject<ObjWrap>(obj.ToString()).page;
                }
                else
                {
                    objPage.page = new PagePost()
                    {
                        id = page.id,
                        title = title,
                        content = $"Landing page {title}. Click nút [Xem trên web] để xem trang",
                        published = true,
                        published_on = DateTime.UtcNow,
                        template_layout = $"page.{name}",
                        alias = url
                    };
                    var obj = client.Put($"/admin/pages/{page.id}.json", objPage);
                    page = JsonConvert.DeserializeObject<ObjWrap>(obj.ToString()).page;
                }

                res.Data = page.id;
                res.Code = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = "Thao tác này chưa thực hiện được, vui lòng thử lại";
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
    }
}
