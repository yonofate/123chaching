using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.RequestModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Punnel.Core.BLL;
using log4net;
using System.Threading.Tasks;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.App.Controllers
{
    [RoutePrefix("api/publish")]
    [Authorize]
    public class PublishController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("PublishController");
        public PublishController(IUow uow) : base(uow) { }

        [Route("make-download")]
        public IHttpActionResult MakeDownloadUrl([FromBody]PublishRequestModel value)
        {
            try
            {
                Guid id = Guid.NewGuid();
                _uow.DownloadPage.IU(new Core.Entities.Model.DownloadPage()
                {
                    Id = id,
                    UserId = CurrentUserId,
                    LandingPageId = value.id,
                    Html = value.html
                });
                return Ok(id);
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

        [Route("download")]
        [AllowAnonymous]
        public IHttpActionResult Download(Guid id)
        {
            try
            {
                var page =_uow.DownloadPage.Get(id);
                System.IO.MemoryStream dataStream = new System.IO.MemoryStream(); 
                if (page!=null)
                {
                    var p = _uow.LandingPage.Get(id);
                    dataStream = new Core.BLL.FileServices.FileBuilder(p.BaseDomain, p.UrlCode, page.Html).MakeDownLoad();
                    string fileName = _uow.LandingPage.GetDownLoadFileName(page.LandingPageId);
                    _uow.DownloadPage.Delete(id);
                    return new exportFileResult(dataStream, Request, fileName);
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
            return NotFound();
        }

        
        [Route("page")]
        public async Task<IHttpActionResult> PublishPage([FromBody]PublishRequestModel value)
        {
            try
            {
                if(this.Level== (int)ProfileLevel.Trial || this.Level == (int)ProfileLevel.Economy)
                {
                    var totalPublish = await _uow.LandingPage.CountPublishPageAsync(this.CurrentUserId);
                    if (this.Level == (int)ProfileLevel.Trial && totalPublish==0)
                    {
                        //Set 14 ngày miễn phí cho user lần đầu xuất bản trang.
                       await _uow.UserProfile.SetExpiredDate(this.CurrentUserId, DateTime.Today.AddDays(14));
                    }
                    if (totalPublish>3) return BadRequest(this.RequiredUpgrade_MaxPage_Err);
                }
                var res = await _uow.LandingPage.PublishDns(value, CurrentUserId);
                return Ok(res);
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

        [Route("change-url")]
        public IHttpActionResult ChangePublishUrl([FromBody]ChangePublishUrlModel value)
        {
            try
            {
                return Ok(_uow.LandingPage.ChangePublishUrl(value, CurrentUserId));
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(ex.Message);
            }
        }


        //[Route("wp")]
        //public async Task<IHttpActionResult> WordPress([FromBody]PublishWpRequestModel value)
        //{
        //    try
        //    {
        //        var res = await _uow.ExternalPublish.IUPage(value, this.CurrentUserId);
        //        return Ok(res);
        //    }
        //    catch (BusinessException ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        _log.Error(ex);
        //        return BadRequest(ex.Message);
        //    }
        //}

        //[Route("wp-checkurl")]
        //public IHttpActionResult WordPressCheckUrl([FromBody]PublishWpRequestModel value)
        //{
        //    try
        //    {
        //        var res = _uow.ExternalPublish.WP_IsExist(value);
        //        return Ok(res);
        //    }
        //    catch (BusinessException ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        _log.Error(ex);
        //        return BadRequest(ex.Message);
        //    }
        //}


        [Route("vendor-3rd")]
        public async Task<IHttpActionResult> PublishToVendor([FromBody]PublishExternalRequestModel value)
        {
            try
            {
                PublishPageResponseModel res = new PublishPageResponseModel();
                switch (value.Vendor)
                {
                    case (int)IntegrationType.Wordpress:
                        res= await _uow.Integration.WP_IU(value, this.CurrentUserId);
                        break;
                    case (int)IntegrationType.Shopify:
                        res= await _uow.Integration.Shopify_IU(value, this.CurrentUserId);
                        break;
                    case (int)IntegrationType.Haravan:
                        res = await _uow.Integration.Haravan_IU(value, this.CurrentUserId);
                        break;
                    case (int)IntegrationType.Sapo:
                        res = await _uow.Integration.Sapo_IU(value, this.CurrentUserId);
                        break;
                    case (int)IntegrationType.Ftp:
                        res = await _uow.Integration.Ftp_IU(value, this.CurrentUserId);
                        break;
                }
                return Ok(res);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(ex.Message);
            }
        }
    }
}
