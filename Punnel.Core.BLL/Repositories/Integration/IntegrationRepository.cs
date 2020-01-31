using IntegrationServices.Autopilot;
using IntegrationServices.GetResponse;
using IntegrationServices.MailChimp;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.GetResponse;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    
    public partial class IntegrationRepository : BaseRepository<Integration>, IIntegrationRepository
    {
        public IntegrationRepository(IUow uow) : base(uow) { }

        public async Task<List<IntegrationFormViewModel>> GetIntegrationSitesAsync(string userId)
        {
            return await (_dbContext as Model.PunnelContext).msp_Integration_DashboardAsync(userId);
        }

        public async Task<List<UserIntegartionEmailModel>> GetByUserAndType(string userId,int siteId)
        {
            return await (_dbContext as Model.PunnelContext).msp_Integration_GetByUserAndType(userId, siteId);
        }

        public async Task<List<UserIntegartionSmsModel>> GetByUserAndTypeSms(string userId, int siteId)
        {
            return await (_dbContext as Model.PunnelContext).msp_Integration_GetByUserAndType_Sms(userId, siteId);
        }

        public async Task<List<IntegrationFormViewModel>> GetIntegrationSitesByPageAsync(Guid landingPageId, string userId)
        {
            return await (_dbContext as Model.PunnelContext).msp_IntegrationPageAsync(landingPageId, userId);
        }

        public async Task<List<IntergationPagePublishViewModel>> GetIntegrationPublishPage(string userId)
        {
            return await (_dbContext as Model.PunnelContext).msp_Intergration_GetPublishVendor(userId);
        }
        public async Task<IntergationPagePublishViewModel> GetIntegrationByAccId(string userId,string accId)
        {
            return await (_dbContext as Model.PunnelContext).msp_Intergration_GetByAccId(userId, accId);
        }

        public Integration GetByApiKey(int siteId, string apiKey)
        {
            var m=  _dbSet.FirstOrDefault(x => x.SiteId == siteId && x.ApiKey == apiKey);
            return m;
        }

        public Integration GetByAccId(string userId, int siteId, string accId)
        {
            var m = _dbSet.FirstOrDefault(x => x.SiteId == siteId && x.AccId == accId && x.UserId==userId);
            return m;
        }

        public void IU(Integration obj,string userId)
        {
            obj.Enable = true;
            var m = _dbSet.FirstOrDefault(x => x.SiteId == obj.SiteId && x.UserId == userId && x.AccId == obj.AccId);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {
                m.ApiKey = obj.ApiKey;
                m.Phone = obj.Phone;
                m.Email = obj.Email;
                m.AccId = obj.AccId;
                m.LastConnectedDate = obj.LastConnectedDate;
            }
            this.Commit();
        }

        public void Disconnect(Integration obj, string userId)
        {
            var m = _dbSet.FirstOrDefault(x => x.SiteId == obj.SiteId && x.UserId == userId && x.AccId == obj.AccId);
            if (m != null)
            {
                m.Enable = false;
                this.Commit();
            }
        }

        public bool Exists(Guid id)
        {
            return _dbSet.AsNoTracking().Any(x => x.Id == id);
        }
        public void Delete(Guid id, string userId)
        {
            if (_dbSet.Any(x => x.Id == id && x.UserId== userId))
            {
                uow.FormConfig.DeleteByIntegration(id);
                base.Delete(id);
            }
        }

        public async Task Remove(Guid id, string userId)
        {
            ApiResponse res = new ApiResponse();
            var site = _dbSet.SingleOrDefault(x => x.Id == id);
            if (site != null)
            {
                switch (site.SiteId)
                {
                    case (int)IntegrationType.GetResponse:
                        break;
                    case (int)IntegrationType.MailChimp:
                        break;
                    case (int)IntegrationType.Gmail:
                        break;
                    case (int)IntegrationType.GoogleSheet:
                        break;
                    case (int)IntegrationType.Wordpress:
                        break;
                    case (int)IntegrationType.Shopify:
                        break;
                    case (int)IntegrationType.Haravan:
                        //res = await new HaravanService.HaravanService(site.AccId, site.ApiKey).Delete();
                        break;
                    case (int)IntegrationType.Sapo:
                        break;
                    case (int)IntegrationType.Sms:
                        int deviceId=0;
                        int.TryParse(site.Phone, out deviceId);
                        if(deviceId>0) new Services.SmsService().RemoveDevice(deviceId);
                        break;
                }
                base.Delete(site.Id);
                await uow.LandingPage.UnPublishByIntegration(id, userId);
                //foreach (var item in _dbSet.Where(x => x.AccId == site.AccId).ToList())
                //{
                //    base.Delete(item.Id);
                //}
            }
        }

        public async Task<ApiResponse> Refresh(Guid id, string userId)
        {
            ApiResponse res = new ApiResponse();
            var site = _dbSet.FirstOrDefault(x => x.Id == id && x.UserId == userId);
            if (site!=null)
            {
                switch (site.SiteId)
                {
                    case (int)IntegrationType.GetResponse:
                        res = new GetResponseTask(site.ApiKey).Auth();
                        break;
                    case (int)IntegrationType.MailChimp:
                        res= new MailChimpTask(site.ApiKey).Auth();
                        break;
                    case (int)IntegrationType.Autopilot:
                        res = new AutopilotTask(site.ApiKey).Auth();
                        break;
                    case (int)IntegrationType.ActiveCampain:
                        res = new IntegrationServices.ActiveCampain.ActiveCampainTask(site.AccId, site.ApiKey).Auth();
                        break;
                    case (int)IntegrationType.InfusionSoft:
                        res = new IntegrationServices.InfusionSoft.InfusionSoftTask(site.ApiKey, site.Password).GetCampaigns();
                        if (res.Code == System.Net.HttpStatusCode.Unauthorized)
                        {
                            var newToken = new IntegrationServices.InfusionSoft.InfusionSoftTask(site.ApiKey, site.Password).Refresh();
                            if (newToken != null && !string.IsNullOrEmpty(newToken.access_token))
                            {
                                site.ApiKey = newToken.access_token;
                                this.Commit();
                                res.Code = System.Net.HttpStatusCode.OK;
                            }
                        }
                        break;
                    case (int)IntegrationType.Gmail:
                        res=new EmailServices.GmailPersonalSvc(site.ApiKey, site.TokenJson).Auth();
                        break;
                    case (int)IntegrationType.GoogleSheet:
                        res = new EmailServices.GoogleSheetSvc(site.ApiKey, site.TokenJson).Auth();
                        break;
                    case (int)IntegrationType.Wordpress:
                        res = new Utils.WordpressUtils(site.AccId, site.ApiKey).Auth();
                        if (res.Code == System.Net.HttpStatusCode.NotFound)
                        {
                            throw new BusinessException("Không kiểm tra được kết nối WP. Cấu hình này được dùng để xuất bản từ phía WP");
                        }
                        break;
                    case (int)IntegrationType.Shopify:
                        res = await new ShopifyService.ShopifyService(site.AccId, site.ApiKey).CountPage();
                        break;
                    case (int)IntegrationType.Haravan:
                        res = await new HaravanService.HaravanService(site.ApiKey).CountPage();
                        break;
                    case (int)IntegrationType.Sapo:
                        res = await new SapoService.SapoService(site.AccId, site.ApiKey).CountPage();
                        break;
                    case (int)IntegrationType.Sms:
                        string sim = string.IsNullOrEmpty(site.AccId) == false ? "sim1" : "sim2";
                        var profile = uow.UserProfile.Get(userId);
                        var mobile = profile == null ? "0968152579" : profile.Mobile;
                        var r= new Services.SmsService().Send(site.Phone, site.Password, sim,mobile, $"Chao {profile.FullName}. Punnel sms dang dung tot nhe");
                        if (r == true) res.Code = System.Net.HttpStatusCode.OK;
                        else
                        {
                            res.Code = System.Net.HttpStatusCode.BadRequest;
                            res.Message = "Thiết thị không thể gửi tin nhắn sms. Vui lòng kiểm tra lại thiết bị & ứng dụng SMS đã cài đặt";
                        }
                        break;
                }
                if (res.Code != System.Net.HttpStatusCode.OK)
                {
                    site.IsExpired = true;
                    this.Commit();
                }
                else
                {
                    site.IsExpired = false;
                    this.Commit();
                }
            }
            return res;
        }
    }
}
