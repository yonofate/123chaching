using log4net;
using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Punnel.App.Controllers
{
    [Authorize(Roles ="admin")]
    public class CloudServerController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("CloudServerController");
        public CloudServerController(IUow uow) : base(uow) { }

        [CompressContent]
        public IHttpActionResult Get()
        {
            try
            {
                var objs = new Core.BLL.Services.IISService().GetSites();
                return Ok(objs);
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

        public IHttpActionResult Delete(string id)
        {
            try
            {
                new Core.BLL.Services.IISService().RemoveWebsite(id);
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
