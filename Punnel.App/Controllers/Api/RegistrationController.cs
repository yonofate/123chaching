using log4net;
using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Punnel.App.Controllers
{
    [RoutePrefix("api/Registration")]
    public class RegistrationController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("RegistrationController");
        public RegistrationController(Uow uow) : base(uow) { }

        [HttpPost]
        [Route("sendInfoForm")]
        public IHttpActionResult SendInfoForm(Core.Entities.RequestModel.FormDataRequest data)
        {
            try
            {
                data.IpAddress = this.ClientIP;
                _uow.Lead.Add(data);
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

    }
}
