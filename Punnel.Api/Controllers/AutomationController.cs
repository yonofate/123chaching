using log4net;
using Punnel.Api.Infrastructure;
using Punnel.Api.Models;
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
    [RoutePrefix("api/automation")]
    public class AutomationController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("TrackingController");
        public AutomationController(Uow uow) : base(uow) { }
        [HttpPost]
        [AllowAnonymous]
        [Route("add")]
        [CompressContent]
        public async Task<IHttpActionResult> AddAutomation(AutomationRequestModel data)
        {
            try
            {
               await  _uow.Lead.AddSendAutomation(data);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
            }
            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("send-lead")]
        [CompressContent]
        public async Task<IHttpActionResult> SendLead(AutomationRequestModel data)
        {
            try
            {
                _uow.Lead.SendLeadData(data);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
            }
            return Ok();
        }
    }
}
