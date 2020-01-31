using Punnel.Core.BLL.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Punnel.Core.Entities.ViewModel;
using Punnel.Core.Entities;
using System.Threading.Tasks;
using Punnel.Core.BLL;
using log4net;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class UserTokenController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("UserTokenController");
        public UserTokenController(IUow uow) : base(uow) { }
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(this.CurrentUserId);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

    }
}
