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
        public async Task<Integration> Haravan_Auth(string shopUrl, string accessToken,string userId)
        {
            Integration result = new Integration();
            HaravanService.HaravanService svc = new HaravanService.HaravanService(accessToken);
            var res= await svc.CountPage();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.Haravan,
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
                throw new BusinessException("Không thể kết nối Haravan");
            }
            return result;
        }

        public Uri Haravan_BuildPageAuthUri(string shopUrl)
        {
            var url = new HaravanService.HaravanService().BuildPageAuthUri();
            var s = url.ToString();
            return url;
        }

        public async Task<Tuple<string,string>> Haravan_GetAccessToken(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                var token = await new HaravanService.HaravanService().GetAccessToken(code);
                if (string.IsNullOrEmpty(token.Item1)) throw new BusinessException("Không thể kết nối Haravan");
                return token;
            }
            return new Tuple<string, string>("","");
        }

        public async Task<PublishPageResponseModel> Haravan_IU(PublishExternalRequestModel data, string userId)
        {
            PublishPageResponseModel response = new PublishPageResponseModel();
            var itg = uow.Integration.Get(data.IntegrationId);
            if (itg == null) throw new BusinessException("Không tìm thấy kết nối đến Haravan");
            var page = await uow.LandingPage.GetPageForSubcrible(data.PageId);
            if (page == null) throw new BusinessException("Landing page không tồn tại");

            var res = await new HaravanService.HaravanService(itg.ApiKey).CreateOrUpdatePage(data.Html, page.Name, data.PathUrl, page.Code, page.PublishReferId);

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
                    PublishType = (int)PublishType.Haravan
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
