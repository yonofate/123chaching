using IntegrationServices.Ftp;
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
        public Integration Ftp_Auth(string host,string userName,string password, string userId)
        {
            Integration result = new Integration();
            FtpTask svc = new FtpTask(host, userName, password);
            var res= svc.Auth();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.Ftp,
                    AccId = userName,
                    Email = host,
                    ApiKey = password,
                    UserId = userId,
                    LastConnectedDate = DateTime.Now
                };
                IU(info, userId);
                result = info;
            }
            else
            {
                throw new BusinessException("Không thể kết nối Ftp");
            }
            return result;
        }

        public async Task<PublishPageResponseModel> Ftp_IU(PublishExternalRequestModel data, string userId)
        {
            PublishPageResponseModel response = new PublishPageResponseModel();
            var itg = uow.Integration.Get(data.IntegrationId);
            if (itg == null) throw new BusinessException("Không tìm thấy kết nối đến FTP");
            var page = await uow.LandingPage.GetPageForSubcrible(data.PageId);
            if (page == null) throw new BusinessException("Landing page không tồn tại");

            FtpTask svc = new FtpTask(itg.Email,itg.AccId, itg.ApiKey);
            var res = svc.UploadFile(data.PathUrl + ".html", data.Html);

            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                //var domain = res.Data.ToString().Replace("https://", "").Replace("http://", "");
                //var basedomain = itg.AccId.Replace("https://", "").Replace("http://", "");
                var landingpage = new LandingPage()
                {
                    Id = data.PageId,
                    UserId = userId,
                    Domain = page.Domain,
                    Https = true,
                    BaseDomain = page.Domain,
                    UrlCode = data.PathUrl,
                    PublishIntegrationId = itg.Id,
                    PublishType = (int)PublishType.Ftp
                };

                await uow.LandingPage.IU(landingpage, "publish");

                response.FullUrl =  "https://" + page.Domain;
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
