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
    [RoutePrefix("api/FormConfig")]
    public class FormConfigController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("FormConfigController");
        public FormConfigController(Uow uow) : base(uow) { }
        public IHttpActionResult Post([FromBody]FormConfigRequest data)
        {
            try
            {
                _uow.FormConfig.IU(new Core.Entities.Model.FormConfig()
                {
                    LandingPageId = data.LandingPageId,
                    IntegrationId = data.IntegrationId,
                });
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
