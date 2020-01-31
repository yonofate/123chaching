using log4net;
using Punnel.Api.Infrastructure;
using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace Punnel.Api.Controllers
{
    [RoutePrefix("api/track")]
    public class TrackingController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("TrackingController");
        public TrackingController(Uow uow) : base(uow) { }
        [HttpPost]
        [AllowAnonymous]
        [Route("page-view")]
        [CompressContent]
        public IHttpActionResult PageView(Core.Entities.Tracking.TrackIP data)
        {
            try
            {
                if (data.PageId != null)
                {
                    _uow.PunnelTracking.AddTrack(data);
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
            }
            return Ok();
        }

        [AllowAnonymous]
        [Route("mail-open")]
        [HttpGet]
        [CompressContent]
        public async Task<IHttpActionResult> MailOpen(int leadId, int templateId, long timeId)
        {
            try
            {              
                await _uow.MailToSend.ReadMail(timeId, leadId, templateId);
                return Ok();
            }catch(Exception ex)
            {
                _log.Error(ex);
                _log.InfoFormat("Tracking mail open lead={0}&tpl={1}&time={2}",leadId,templateId,timeId);
                return Ok();
            }
        }
    }
}
