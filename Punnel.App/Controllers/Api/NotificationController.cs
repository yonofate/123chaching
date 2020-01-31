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
using log4net;
using Punnel.Core.Entities.Notification;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class NotificationController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("NotificationController");
        public NotificationController(IUow uow) : base(uow) { }

        [CompressContent]
        public IHttpActionResult Get(int limit, int? start=0)
        {
            try
            {
                var objs = _uow.Notification.msp_GetAlert_ByUser(this.CurrentUserId,limit,start.Value,null);
                return Ok(new { items= objs.Item1, total = objs.Item2});
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

        [Authorize(Roles ="admin")]
        public IHttpActionResult Post(NotificationMessageRequest data)
        {
            try
            {
                 _uow.Notification.SendNotifyUser(data);
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
