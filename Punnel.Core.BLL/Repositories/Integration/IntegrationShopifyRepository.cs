using Punnel.Core.Entities;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using Punnel.EmailServices;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Punnel.Core.BLL.Repositories
{
    public partial class IntegrationRepository
    {
        public async Task<Integration> Shopify_Auth(string shopUrl, string accessToken,string userId)
        {
            Integration result = new Integration();
            ShopifyService.ShopifyService svc = new ShopifyService.ShopifyService(shopUrl, accessToken);
            var res= await svc.CountPage();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.Shopify,
                    AccId = shopUrl,
                    Email = shopUrl,
                    ApiKey = accessToken,
                    UserId = userId,
                    LastConnectedDate = DateTime.Now
                };
                IU(info, userId);
                result = info;
            }
            else
            {
                throw new BusinessException("Không thể kết nối Shopify");
            }
            return result;
        }

        public Uri Shopify_BuildPageAuthUri(string shopUrl)
        {
            return new ShopifyService.ShopifyService().BuildPageAuthUri(shopUrl);
        }

        public async Task<string> Shopify_GetAccessToken(NameValueCollection query)
        {
            string code = query["code"];
            string shopUrl = query["shop"];
            if (string.IsNullOrEmpty(code))
            {
                var itg = await uow.Integration.GetIntegrationByAccId("", shopUrl);
                if (itg == null)
                {
                    throw new BusinessException("Chưa kết nối đến Shopify");
                }
                else return itg.ApiKey;
            }
            else if (!string.IsNullOrEmpty(code))
            {
                var token = await new ShopifyService.ShopifyService().GetAccessToken(query);
                if (string.IsNullOrEmpty(token)) throw new BusinessException("Không thể kết nối Shopify");
                return token;
            }
            return "";
        }

        public async Task<PublishPageResponseModel> Shopify_IU(PublishExternalRequestModel data, string userId)
        {
            PublishPageResponseModel response = new PublishPageResponseModel();
            var itg = uow.Integration.Get(data.IntegrationId);
            if (itg == null) throw new BusinessException("Không tìm thấy kết nối đến Shopify");
            var page = await uow.LandingPage.GetPageForSubcrible(data.PageId);
            if (page == null) throw new BusinessException("Landing page không tồn tại");

            var res = await new ShopifyService.ShopifyService(itg.AccId, itg.ApiKey).CreateOrUpdatePage(data.Html, page.Name, data.PathUrl, page.Code, page.PublishReferId);

            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var link = $"{itg.AccId}/pages/{data.PathUrl}";
                var domain = link.Replace("https://", "").Replace("http://", "");

                var landingpage = new LandingPage()
                {
                    Id = data.PageId,
                    UserId = userId,
                    Domain = domain,
                    Https = true,//link.Contains("https://"),
                    BaseDomain = itg.AccId.Replace("https://", "").Replace("http://", ""),
                    UrlCode = data.PathUrl,
                    PublishReferId = res.Data.ToString(),
                    PublishIntegrationId = itg.Id,
                    PublishType = (int)PublishType.Shopify
                };
                await uow.LandingPage.IU(landingpage, "publish");

                response.FullUrl = "https://" + link;
                response.PathUrl = landingpage.UrlCode;
                response.BaseDomain = landingpage.BaseDomain;
                response.Type = landingpage.Type;
                response.PublishIntegrationId = landingpage.PublishIntegrationId;
                return response;
            }
            else throw new BusinessException(res.Message);
        }
    }
}
