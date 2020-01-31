using Punnel.App.Controllers;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Punnel.Core.BLL;
using System.Threading.Tasks;
using Punnel.Core.Entities.ViewModel;
using log4net;

namespace Punnel.App.Controllers
{
    [Authorize]
    [RoutePrefix("api/emailtrack")]
    public class EmailMarketingController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("EmailMarketingController");
        // GET: api/Cate
        public EmailMarketingController(IUow uow) : base(uow) { }

        [Route("by-lead")]
        public async Task<IHttpActionResult> GetByLead(int id)
        {
            try
            {
                var objs = await _uow.MailToSend.GetByLead(id);
                return Ok(objs);
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
    }
}
