using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Punnel.Core.Entities;
using ShopifySharp;
using ShopifySharp.Enums;

namespace Punnel.ShopifyService
{
    public class ShopifyService 
    {
        private readonly string SHOPIFY_API_KEY = MBN.Utils.WebUtils.AppSettings("SHOPIFY_API_KEY", "afc72ce10ba9842647de5ffac957d8b9");
        private readonly string SHOPIFY_API_SECRET = MBN.Utils.WebUtils.AppSettings("SHOPIFY_API_SECRET", "9b2f9daf15727eb34ae8c779cb321bda");

        private readonly string SHOPIFY_API_CALLBACK = MBN.Utils.WebUtils.AppSettings("SHOPIFY_API_CALLBACK", "https://483921d9.ngrok.io/home/authcallback/");

        string _shopUrl;
        string _accessToken;
        public ShopifyService() {
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
        }

        public ShopifyService(string shopUrl,string accessToken) {
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
            _shopUrl = shopUrl;
            _accessToken = accessToken;
        }

        public Uri BuildPageAuthUri(string shopUrl)
        {
            var scopes = new List<AuthorizationScope>()
            {
                AuthorizationScope.ReadContent,
                AuthorizationScope.WriteContent,
                AuthorizationScope.ReadThemes,
                AuthorizationScope.WriteThemes
            };
            return AuthorizationService.BuildAuthorizationUrl(scopes, shopUrl, SHOPIFY_API_KEY, SHOPIFY_API_CALLBACK);
        }

        public async Task<string> GetAccessToken(NameValueCollection query)
        {
            if (AuthorizationService.IsAuthenticRequest(query.ToString(), SHOPIFY_API_SECRET))
            {
                string code = query["code"];
                string myShopifyUrl = query["shop"];

                string accessToken = await AuthorizationService.Authorize(code, myShopifyUrl, SHOPIFY_API_KEY, SHOPIFY_API_SECRET);
                return accessToken;
            }
            else
            {
                return string.Empty;
                //Request is not authentic and should not be acted on.
            }

            
        }

        public async Task<ApiResponse> CountPage()
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var service = new PageService(_shopUrl, _accessToken);
                var objs = await service.CountAsync();
                if (objs >= 1)
                {
                    res.Data = objs;
                    res.Code = HttpStatusCode.OK;
                }
                res.Code = HttpStatusCode.OK;
            }catch(Exception ex)
            {
                res.Message = "Kết nối đến Shopify thất bại, vui lòng thử lại";
            }
            return res;
        }

        public async Task<ApiResponse> CreateOrUpdatePage(string html,string title, string url, string id, string referPageId=null)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var serviceT = new ThemeService(_shopUrl, _accessToken);
                var themes = await serviceT.ListAsync();
                var theme = themes.FirstOrDefault(x=>x.Role=="main");
                if (theme == null) return res;
                var serviceA = new AssetService(_shopUrl, _accessToken);
                string name = $"punnel-{id}";
                string asset_key = $"templates/page.{name}.liquid";
                var asset = new Asset()
                {
                    ContentType = "text/x-liquid",
                    Key = asset_key,
                    Value = @"{% layout none %} " + html
                };
                asset = await serviceA.CreateOrUpdateAsync(theme.Id.Value, asset);

                var serviceP = new PageService(_shopUrl, _accessToken);

                Page page = null;

                long? referId = null;
                if (string.IsNullOrEmpty(referPageId) == false) referId = long.Parse(referPageId);
                if (referId != null)
                {
                    page= await serviceP.GetAsync(referId.Value);
                }

                if (page == null)
                {
                    page = await serviceP.CreateAsync(new Page()
                    {
                        CreatedAt = DateTime.UtcNow,
                        Title = title,
                        BodyHtml = $"Landing page {title}. Click [View Page] to view",
                        Handle = url,
                        TemplateSuffix = name
                    });
                }
                else
                {
                    page = await serviceP.UpdateAsync(referId.Value, new Page()
                    {
                        CreatedAt = DateTime.UtcNow,
                        Title = title,
                        BodyHtml = $"Landing page {title}. Click [View Page] to view",
                        Handle = url,
                        TemplateSuffix = name
                    });
                }

                res.Data = page.Id;
                res.Code = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                res.Message = "Không thể kết nối đến Shopify, vui lòng thử lại";
            }
            return res;
        }
    }
}
