using log4net;
using Microsoft.AspNet.SignalR;
using Punnel.Api.Hubs;
using Punnel.Api.Infrastructure;
using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Notification;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace Punnel.Api.Controllers
{
    [System.Web.Http.Authorize]
    [System.Web.Http.RoutePrefix("api/notification")]
    public class NotificationController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("NotificationController");
        public NotificationController(Uow uow) : base(uow) { }
        [Route("list")]
        [CompressContent]
        public IHttpActionResult Get(int limit, int? start = 0, int? type=null)
        {
            try
            {
                _log.InfoFormat("type : {0}", type);
                var objs = _uow.Notification.msp_GetAlert_ByUser(this.CurrentUserId, limit, start.Value,type);
                return Ok(new { items = objs.Item1, total = objs.Item2 });
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

        [AllowAnonymous]
        [Route("notifyuser")]
        [HttpPost]
        public async Task<IHttpActionResult> NotifyUser(NotificationMessageRequest data)
        {
            try
            {
                if (string.IsNullOrEmpty(data.Content)) return BadRequest();
                var res = _uow.Notification.IU_Alert(new Core.Entities.Notification.Alert()
                {
                    Link = data.Url,
                    Title = data.Title,
                    Content = data.Content,
                    Type = (int)NotificationType.SystemAlert,
                    IsBroadCast = data.IsBroadCast,
                    UserId= data.UserId
                });
                var context = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
                if (string.IsNullOrEmpty(data.UserId) && data.IsBroadCast==true)
                {
                    context.Clients.All.notifyuser_receive(Newtonsoft.Json.JsonConvert.SerializeObject(res));
                }
                else
                {
                    context.Clients.User(data.UserId).notifyuser_receive(Newtonsoft.Json.JsonConvert.SerializeObject(res));
                }
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex.Message);
                return BadRequest(this.General_Err);
            }
        }

        [Route("test")]
        public async Task<IHttpActionResult> Test(string uid)
        {
            try
            {
                var res = _uow.Notification.IU_Alert(new Core.Entities.Notification.Alert()
                {
                    UserId = uid,
                    Title = "Thong bao",
                    Content = "Noi dung thong bao",
                    Type = (int)NotificationType.SystemAlert,
                    IsBroadCast = true
                });
                var context = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
                context.Clients.User(uid).broadcasturl_receive(Newtonsoft.Json.JsonConvert.SerializeObject(res));
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex.Message);
                return BadRequest(this.General_Err);
            }
        }
    }
}
