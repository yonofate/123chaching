using log4net;
using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration;
using Punnel.Core.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Punnel.App.Controllers
{
    [Authorize]
    [RoutePrefix("api/integration")]
    public class IntegrationController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("IntegrationController");
        public IntegrationController(Uow uow): base(uow) { }

        #region Dasboard
        [CompressContent]
        [Route("all")]
        public async Task<IHttpActionResult> GetIntegrationSites()
        {
            try
            {
                var accs = await _uow.Integration.GetIntegrationSitesAsync(CurrentUserId);
                var sites = accs.GroupBy(t => t.Domain)
                           .Select(grp => grp.First())
                           .ToList();
                return Ok(new { accs = accs.Where(x => x.IntegrationId != null).ToList(), sites = sites });
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [CompressContent]
        [Route("gmail")]
        public async Task<IHttpActionResult> GetIntegarationUserEmail()
        {
            try
            {
                var accs = await _uow.Integration.GetByUserAndType(CurrentUserId,(int)IntegrationType.Gmail);
                return Ok(accs);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [CompressContent]
        [Route("sms-mos")]
        public async Task<IHttpActionResult> GetIntegarationUserSms()
        {
            try
            {
                var accs = await _uow.Integration.GetByUserAndTypeSms(CurrentUserId, (int)IntegrationType.Sms);
                return Ok(accs);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("disconnect")]
        public IHttpActionResult Disconnect(IntegrationDisconnectRequest data)
        {
            try
            {
                _uow.Integration.Remove(data.IntegrationId, this.CurrentUserId);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("refresh")]
        public async Task<IHttpActionResult> Refresh(IntegrationDisconnectRequest data)
        {
            try
            {
                var res= await _uow.Integration.Refresh(data.IntegrationId, this.CurrentUserId);              
                return Ok(new {status = (res.Code== HttpStatusCode.OK), msg=res.Message });
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region Page Form Config
        [Route("formconfig-sites")]
        [CompressContent]
        public async Task<IHttpActionResult> GetIntegrationSites(Guid pageId)
        {
            try
            {
                var acc = await _uow.Integration.GetIntegrationSitesByPageAsync(pageId,CurrentUserId);
                return Ok(acc);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region GetResponse APi
        [Route("getresponse-auth")]
        [HttpPost]
        [CompressContent]
        public IHttpActionResult GetResponseConnect(AuthRequest data)
        {
            try
            {
                var acc = _uow.Integration.GetResponse_Auth(data.ApiKey, CurrentUserId);
                return Ok(acc);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("getresponse-campains")]
        [CompressContent]
        public IHttpActionResult GetResponseCampains(CampainRequest data)
        {
            try
            {
                var campains = _uow.Integration.GetResponse_GetCampains(CurrentUserId, data.AccId);
                return Ok(campains);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("getresponse-setcampain")]
        public IHttpActionResult GetResponseSetCampain(SetCampainRequest data)
        {
            try
            {
                FormConfig frmConfig = new FormConfig()
                {
                    LandingPageId = data.LandingPageId,
                    IntegrationId = data.IntegrationId,
                    ListId = data.Id,
                    ListName = data.Name
                };
                _uow.FormConfig.IU(frmConfig);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("getresponse-removeconfig")]
        public IHttpActionResult GetResponseRemoveFormConfig(SetCampainRequest data)
        {
            try
            {
                _uow.FormConfig.Delete(data.LandingPageId,data.IntegrationId);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region MailChimp APi
        [Route("mailchimp-auth")]
        [HttpPost]
        public IHttpActionResult MailChimpConnect(AuthRequest data)
        {
            try
            {
                var result = _uow.Integration.MailChimp_Auth(data.ApiKey, CurrentUserId);
                return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                {
                    IntegrationId = result.Id,
                    SiteId = result.SiteId,
                    Email = result.Email,
                    AccId = result.AccId,
                    ApiKey = result.ApiKey,
                    Connected = true
                });
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("mailchimp-campains")]
        [CompressContent]
        public IHttpActionResult MailChimpCampains(CampainRequest data)
        {
            try
            {
                var campains = _uow.Integration.MailChimp_GetCampains(CurrentUserId, data.AccId);
                return Ok(campains);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("mailchimp-setcampain")]
        public IHttpActionResult MailChimpSetCampain(SetCampainRequest data)
        {
            try
            {
                FormConfig frmConfig = new FormConfig()
                {
                    LandingPageId = data.LandingPageId,
                    IntegrationId = data.IntegrationId,
                    ListId=data.Id,
                    ListName=data.Name
                };
                _uow.FormConfig.IU(frmConfig);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("mailchimp-removeconfig")]
        public IHttpActionResult MailChimpRemoveFormConfig(SetCampainRequest data)
        {
            try
            {
                _uow.FormConfig.Delete(data.LandingPageId, data.IntegrationId);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region ActiveCampain APi
        [Route("activecampaign-auth")]
        [HttpPost]
        public IHttpActionResult ActiveCampainConnect(AuthRequest data)
        {
            try
            {
                var result = _uow.Integration.ActiveCampain_Auth(data.ApiUrl,data.ApiKey, CurrentUserId);
                return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                {
                    IntegrationId = result.Id,
                    SiteId = result.SiteId,
                    Email = result.Email,
                    AccId = result.AccId,
                    ApiKey = result.ApiKey,
                    Connected = true
                });
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("activecampaign-campains")]
        [CompressContent]
        public IHttpActionResult ActiveCampainCampains(CampainRequest data)
        {
            try
            {
                var campains = _uow.Integration.ActiveCampain_GetCampains(CurrentUserId, data.AccId);
                return Ok(campains);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("activecampaign-setcampain")]
        public IHttpActionResult ActiveCampainSetCampain(SetCampainRequest data)
        {
            try
            {
                FormConfig frmConfig = new FormConfig()
                {
                    LandingPageId = data.LandingPageId,
                    IntegrationId = data.IntegrationId,
                    ListId = data.Id,
                    ListName = data.Name
                };
                _uow.FormConfig.IU(frmConfig);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("activecampaign-removeconfig")]
        public IHttpActionResult ActiveCampainRemoveFormConfig(SetCampainRequest data)
        {
            try
            {
                _uow.FormConfig.Delete(data.LandingPageId, data.IntegrationId);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region Autopilot APi
        [Route("autopilot-auth")]
        [HttpPost]
        public IHttpActionResult AutopilotConnect(AuthRequest data)
        {
            try
            {
                var result = _uow.Integration.Autopilot_Auth(data.ApiKey, CurrentUserId);
                return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                {
                    IntegrationId = result.Id,
                    SiteId = result.SiteId,
                    Email = result.Email,
                    AccId = result.AccId,
                    ApiKey = result.ApiKey,
                    Connected = true
                });
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("autopilot-campains")]
        [CompressContent]
        public IHttpActionResult AutopilotCampains(CampainRequest data)
        {
            try
            {
                var campains = _uow.Integration.Autopilot_GetCampains(CurrentUserId, data.AccId);
                return Ok(campains);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("autopilot-setcampain")]
        public IHttpActionResult AutopilotSetCampain(SetCampainRequest data)
        {
            try
            {
                FormConfig frmConfig = new FormConfig()
                {
                    LandingPageId = data.LandingPageId,
                    IntegrationId = data.IntegrationId,
                    ListId = data.Id,
                    ListName = data.Name
                };
                _uow.FormConfig.IU(frmConfig);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("autopilot-removeconfig")]
        public IHttpActionResult AutopilotRemoveFormConfig(SetCampainRequest data)
        {
            try
            {
                _uow.FormConfig.Delete(data.LandingPageId, data.IntegrationId);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region InfusionSoft
        [Route("infusionsoft-auth")]
        [HttpPost]
        public IHttpActionResult InfusionSoftConnect(AuthRequest data)
        {
            try
            {
                var result = _uow.Integration.InfusionSoft_Auth(data.ApiKey, this.CurrentUserId);
                return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                {
                    IntegrationId = result.Id,
                    SiteId = result.SiteId,
                    Email = result.Email,
                    AccId = result.AccId,
                    ApiKey = result.ApiKey,
                    Connected = true
                });
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }


        [HttpPost]
        [Route("infusionsoft-campains")]
        [CompressContent]
        public IHttpActionResult InfusionSoftCampains(CampainRequest data)
        {
            try
            {
                var campains = _uow.Integration.InfusionSoft_Auth_GetCampains(CurrentUserId, data.AccId);
                return Ok(campains);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("infusionsoft-setcampain")]
        public IHttpActionResult InfusionSoftSetCampain(SetCampainRequest data)
        {
            try
            {
                FormConfig frmConfig = new FormConfig()
                {
                    LandingPageId = data.LandingPageId,
                    IntegrationId = data.IntegrationId,
                    ListId = data.Id,
                    ListName = data.Name
                };
                _uow.FormConfig.IU(frmConfig);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("infusionsoft-removeconfig")]
        public IHttpActionResult InfusionSoftRemoveFormConfig(SetCampainRequest data)
        {
            try
            {
                _uow.FormConfig.Delete(data.LandingPageId, data.IntegrationId);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region Gmail API
        [Route("gmail-auth")]
        [HttpPost]
        public IHttpActionResult GmailConnect(AuthRequest data)
        {
            try
            {
               // _log.InfoFormat("ApiKey: {0} , UserName: {1}", data.ApiKey, data.UserName);
                var result = _uow.Integration.Gmail_Auth(CurrentUserId,data.ApiKey, data.UserName);
                return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                {
                    IntegrationId = result.Id,
                    SiteId = result.SiteId,
                    Email = result.Email,
                    AccId = result.AccId,
                    ApiKey = result.ApiKey,
                    Connected = true
                });
            }
            catch (BusinessException ex)
            {
                _log.Error(ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        #endregion

        #region GoogleSheet API
        [Route("googlesheet-auth")]
        [HttpPost]
        public IHttpActionResult GoogleSheetConnect(AuthRequest data)
        {
            try
            {
                var result = _uow.Integration.GoogleSheet_Auth(CurrentUserId, data.ApiKey, data.UserName);
                return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                {
                    IntegrationId = result.Id,
                    SiteId = result.SiteId,
                    Email = result.Email,
                    AccId = result.AccId,
                    ApiKey = result.ApiKey,
                    Connected = true
                });
            }
            catch (BusinessException ex)
            {
                _log.Error(ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("googlesheet-campains")]
        [CompressContent]
        public IHttpActionResult GoogleSheet_Sheet(CampainRequest data)
        {
            try
            {
                if (data.Action == "find")
                {
                    var res = _uow.Integration.GoogleSheet_GetSheets(CurrentUserId, data.AccId, data.Data, data.PageId.Value);
                    return Ok(res);
                }else 
                {
                    var res = _uow.Integration.GoogleSheet_CreateSpreadSheet(CurrentUserId, data.AccId, data.Data, data.PageId.Value);
                    return Ok(res);
                }
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpPost]
        [Route("googlesheet-removeconfig")]
        public IHttpActionResult GoogleSheetRemoveFormConfig(SetCampainRequest data)
        {
            try
            {
                _uow.FormConfig.Delete(data.LandingPageId, data.IntegrationId);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region Shopify
        [Route("shopify-auth-uri")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> GetShopifyAuthUri(string shopUrl)
        {
            var authUrl = _uow.Integration.Shopify_BuildPageAuthUri(shopUrl);
            return Redirect(authUrl);
        }

        [Route("shopify-auth")]
        [HttpPost]
        public async Task<IHttpActionResult> ShopifyConnect(AuthRequest data)
        {
            try
            {
                var result = await _uow.Integration.Shopify_Auth(data.ApiUrl, data.ApiKey, CurrentUserId);
                return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                {
                    IntegrationId = result.Id,
                    SiteId = result.SiteId,
                    Email = result.Email,
                    AccId = result.AccId,
                    ApiKey = result.ApiKey,
                    Connected = true
                });
            }
            catch (BusinessException ex)
            {
                _log.Error(ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region Haravan
        [Route("haravan-auth-uri")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> GetHaravanAuthUri(string shopUrl)
        {
            var authUrl = _uow.Integration.Haravan_BuildPageAuthUri(shopUrl);
            return Redirect(authUrl);
        }

        [Route("haravan-auth")]
        [HttpPost]
        public async Task<IHttpActionResult> HaravanConnect(AuthRequest data)
        {
            try
            {
                var result = await _uow.Integration.Haravan_Auth(data.ApiUrl, data.ApiKey, CurrentUserId);
                return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                {
                    IntegrationId = result.Id,
                    SiteId = result.SiteId,
                    Email = result.Email,
                    AccId = result.AccId,
                    ApiKey = result.ApiKey,
                    Connected = true
                });
            }
            catch (BusinessException ex)
            {
                _log.Error(ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region Haravan New
        [Route("hrv-auth")]
        //[HttpPost]

        public async Task<IHttpActionResult> HaravanAuthNew(HaravanAuthRequest data)
        {
            try
            {
                //var result = await _uow.Integration.WP_Auth(data.ApiUrl, data.ApiKey, CurrentUserId);
                //return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                //{
                //    IntegrationId = result.Id,
                //    SiteId = result.SiteId,
                //    Email = result.Email,
                //    AccId = result.AccId,
                //    ApiKey = result.ApiKey,
                //    Connected = true
                //});
                return Ok();
            }
            catch (BusinessException ex)
            {
                _log.Error(ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region Sapo
        [Route("sapo-auth-uri")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> GetSapoAuthUri(string shopUrl)
        {
            var authUrl = _uow.Integration.Sapo_BuildPageAuthUri(shopUrl);
            return Redirect(authUrl);
        }

        [Route("sapo-auth")]
        [HttpPost]
        public async Task<IHttpActionResult> SapoConnect(AuthRequest data)
        {
            try
            {
                var result = await _uow.Integration.Sapo_Auth(data.ApiUrl, data.ApiKey, CurrentUserId);
                return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                {
                    IntegrationId = result.Id,
                    SiteId = result.SiteId,
                    Email = result.Email,
                    AccId = result.AccId,
                    ApiKey = result.ApiKey,
                    Connected = true
                });
            }
            catch (BusinessException ex)
            {
                _log.Error(ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region Wordpress
        [Route("wp-auth")]
        [HttpPost]
        public async Task<IHttpActionResult> WordpressConnect(AuthRequest data)
        {
            try
            {
                var result = await _uow.Integration.WP_Auth(data.ApiUrl, data.ApiKey, CurrentUserId);
                return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                {
                    IntegrationId = result.Id,
                    SiteId = result.SiteId,
                    Email = result.Email,
                    AccId = result.AccId,
                    ApiKey = result.ApiKey,
                    Connected = true
                });
            }
            catch (BusinessException ex)
            {
                _log.Error(ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region FTP
        [Route("ftp-auth")]
        [HttpPost]
        public IHttpActionResult FtpConnect(AuthRequest data)
        {
            try
            {
                var result = _uow.Integration.Ftp_Auth(data.ApiKey,data.UserName,data.Password, CurrentUserId);
                return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                {
                    IntegrationId = result.Id,
                    SiteId = result.SiteId,
                    Email = result.Email,
                    AccId = result.AccId,
                    ApiKey = result.ApiKey,
                    Connected = true
                });
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region SMS
        [Route("sms-auth")]
        [HttpPost]
        public IHttpActionResult SmsConnect(SmsAuthRequest data)
        {
            try
            {
                var result = _uow.Integration.Sms_Auth(data.Name,data.Sim1, data.Sim2, data.Pin, CurrentUserId);
                return Ok(new Core.Entities.ViewModel.IntegrationFormViewModel()
                {
                    IntegrationId = result.Id,
                    SiteId = result.SiteId,
                    Email = result.Email,
                    AccId = result.AccId,
                    ApiKey = result.ApiKey,
                    Connected = true
                });
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion

        #region Publish Integration
        [Route("pages-3rd")]
        [CompressContent]
        public async Task<IHttpActionResult> GetIntegrationPublishPages()
        {
            try
            {
                var pages = await _uow.Integration.GetIntegrationPublishPage(CurrentUserId);
                return Ok(pages);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
        #endregion
    }
}
