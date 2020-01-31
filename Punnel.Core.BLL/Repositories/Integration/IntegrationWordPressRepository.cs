using Punnel.Core.BLL.Utils;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Threading.Tasks;


namespace Punnel.Core.BLL.Repositories
{
    public partial class IntegrationRepository
    {
        public async Task<Integration> WP_Auth(string apiUrl, string apiToken,string userId)
        {
            Integration result = new Integration();
            var res= new WordpressUtils(apiUrl, apiToken).Auth();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.Wordpress,
                    AccId = apiUrl,
                    Email = apiUrl,
                    ApiKey = apiToken,
                    UserId = userId,
                    LastConnectedDate = DateTime.Now
                };
                IU(info, userId);
                result = info;
            }
            else if (res.Code == System.Net.HttpStatusCode.NotFound)
            {
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.Wordpress,
                    AccId = apiUrl,
                    Email = apiUrl,
                    ApiKey = apiToken,
                    UserId = userId,
                    LastConnectedDate = DateTime.Now
                };
                IU(info, userId);
                result = info;
                throw new BusinessException("Không thể kết nối Wordpress, tuy nhiên bạn có thể xuất bản từ phía WP");
            }
            else
            {
                throw new BusinessException("Không thể kết nối Wordpress");
            }
            return result;
        }

        public async Task<PublishPageResponseModel> WP_IU(PublishExternalRequestModel data,string userId)
        {
            PublishPageResponseModel response = new PublishPageResponseModel();
            var itg = uow.Integration.Get(data.IntegrationId);
            if (itg == null) throw new BusinessException("Không tìm thấy kết nối đến WP");
            var page = await uow.LandingPage.GetPageForSubcrible(data.PageId);
            if (page == null) throw new BusinessException("Landing page không tồn tại");

            var res = new WordpressUtils(itg.AccId, itg.ApiKey).CreateOrUpdatePage(data.PathUrl, page.Name, data.Html, "page");

            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var domain = res.Data.ToString().Replace("https://", "").Replace("http://", "");
                var basedomain = itg.AccId.Replace("https://", "").Replace("http://", "");
                var landingpage = new LandingPage()
                {
                    Id = data.PageId,
                    UserId = userId,
                    Domain = domain,
                    Https = res.Data.ToString().Contains("https://"),
                    BaseDomain = itg.AccId.Replace("https://", "").Replace("http://", ""),
                    UrlCode = data.PathUrl,
                    PublishIntegrationId = itg.Id,
                    PublishType = (int)PublishType.WP
                };
                await uow.LandingPage.IU(landingpage, "publish");

                response.FullUrl = res.Data.ToString();
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
