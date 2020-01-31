using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.BLL.Utils;

namespace Punnel.Api.Hubs
{
    public class NotificationHub : Hub
    {
        private IUow _uow = null;
        private IUow uow
        {
            get { return _uow ?? (_uow = Core.Entities.ObjectFactory.GetInstance<Uow>()); }
        }
        public void Hello()
        {
            Clients.All.hello();
        }

        public void NotifyUser(string url, string title, string message,bool is_broadcast, string userid="")
        {
            if (string.IsNullOrEmpty(url) || string.IsNullOrEmpty(message)) return;
            var res= uow.Notification.IU_Alert(new Core.Entities.Notification.Alert()
            {
                Link= url,
                Title= title,
                Content = message,
                Type = (int)NotificationType.SystemAlert,
                IsBroadCast = true
            });
            if (is_broadcast == true) { Clients.All.notifyuser_receive(res); }
            else if(string.IsNullOrEmpty(userid)==false)
            {
                Clients.User(userid).notifyuser_receive(res);
            }
        }

        public void SendToUser(string url, string title, string message)
        {
            if (string.IsNullOrEmpty(url) || string.IsNullOrEmpty(message)) return;
            var res = uow.Notification.IU_Alert(new Core.Entities.Notification.Alert()
            {
                Link = url,
                Title = title,
                Content = message,
                Type = (int)NotificationType.SystemAlert,
                IsBroadCast = true
            });
            Clients.All.broadcasturl_receive(res);
        }

       /// <summary>
       /// Send command to user
       /// </summary>
       /// <param name="userId"></param>
       /// <param name="cmd"></param>
        public void SendCmd(string userId, string cmd)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(cmd)) return;
            
            switch (cmd)
            {
                case "PROFILE":
                    Clients.User(userId).cmd_receive(cmd);
                    break;
                case "UPGRADE":
                    var res = uow.Notification.IU_Alert(new Core.Entities.Notification.Alert()
                    {
                        Link = "/",
                        Title = "Gia hạn thành công!",
                        Content = "Tài khoản của bạn đã được gia hạn thành công. Cảm ơn bạn đã tin tưởng sử dụng dịch vụ Punnel",
                        Type = (int)NotificationType.SystemAlert,
                        IsBroadCast = false
                    });
                    Clients.User(userId).cmd_receive("PROFILE");
                    Clients.User(userId).notifyuser_receive(res);
                    break;
            }
        }

        public void UnView(string userId)
        {
            if (string.IsNullOrEmpty(userId)) return;
            var res= uow.Notification.msp_CountUnView_ByUser(userId);
            Clients.User(userId).unview_receive(res);
        }
        public void ResetCount(string userId,long time)
        {
            if (string.IsNullOrEmpty(userId)) return;
            uow.Notification.IU_AlertUser(new Core.Entities.Notification.AlertUser()
            {
                UserId= userId,
                LatestViewDate = time.FromUnixTimeMiliseconds()
            });
        }

        public void Read(long id)
        {
            uow.Notification.IU_Alert(new Core.Entities.Notification.Alert()
            {
                Id = id,
                UpdatedDate = DateTime.Now
            });
        }
    }
}