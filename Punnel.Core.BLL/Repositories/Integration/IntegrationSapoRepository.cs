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
        public async Task<Integration> Sapo_Auth(string shopUrl, string accessToken,string userId)
        {
            Integration result = new Integration();
            SapoService.SapoService svc = new SapoService.SapoService(shopUrl, accessToken);
            var res= await svc.CountPage();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.Sapo,
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
                throw new BusinessException("Không thể kết nối Sapo");
            }
            return result;
        }

        public Uri Sapo_BuildPageAuthUri(string shopUrl)
        {
            return new SapoService.SapoService().BuildPageAuthUri(shopUrl);
        }

        public async Task<string> Sapo_GetAccessToken(NameValueCollection query,string userId="")
        {          
            string code = query["code"];
            string hmac = query["hmac"];          

            string shopUrl = query["store"];
            if (!string.IsNullOrEmpty(hmac) && string.IsNullOrEmpty(code))
            {
                var itg = await uow.Integration.GetIntegrationByAccId(userId, shopUrl);
                if (itg == null)
                {
                    throw new BusinessException("Chưa kết nối đến Sapo");
                }
                else return itg.ApiKey;
            }
            else if (!string.IsNullOrEmpty(code))
            {
                var token = await new SapoService.SapoService().GetAccessToken(shopUrl, code);
                if (string.IsNullOrEmpty(token)) throw new BusinessException("Không thể kết nối Sapo");
                return token;
            }
            return "";
        }

        public async Task<PublishPageResponseModel> Sapo_IU(PublishExternalRequestModel data, string userId)
        {
            PublishPageResponseModel response = new PublishPageResponseModel();
            var itg = uow.Integration.Get(data.IntegrationId);
            if (itg == null) throw new BusinessException("Không tìm thấy kết nối đến Sapo");
            var page = await uow.LandingPage.GetPageForSubcrible(data.PageId);
            if (page == null) throw new BusinessException("Landing page không tồn tại");

            var res = await new SapoService.SapoService(itg.AccId, itg.ApiKey).CreateOrUpdatePage(data.Html, page.Name, data.PathUrl, page.Code, page.PublishReferId);

            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var link = $"{itg.AccId}/{data.PathUrl}";
                var domain = link.Replace("https://", "").Replace("http://", "");

                var landingpage = new LandingPage()
                {
                    Id = data.PageId,
                    UserId = userId,
                    Domain = domain,
                    Https = true,
                    BaseDomain = itg.AccId.Replace("https://", "").Replace("http://", ""),
                    UrlCode = data.PathUrl,
                    PublishReferId = res.Data.ToString(),
                    PublishIntegrationId = itg.Id,
                    PublishType = (int)PublishType.Sapo
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
