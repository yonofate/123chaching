using System;
using System.Collections.Generic;
using System.Linq;
using MBN.Utils.Extension;
using System.IO;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Model;
using Punnel.Core.Entities.Notification;
using Punnel.Core.BLL.Utils;
using Punnel.Core.BLL.Services;
using System.Threading.Tasks;
using log4net;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private static readonly ILog _log = LogManager.GetLogger("NotificationRepository");
        private static readonly string CONN_PUNNELALERT = System.Configuration.ConfigurationManager.ConnectionStrings["DBC_PunnelAlert"].ConnectionString;
        private static readonly string CONN_PUNNEL = System.Configuration.ConfigurationManager.ConnectionStrings["DBC_Punnel"].ConnectionString;

        private IUow _uow = null;
        public IUow uow
        {
            get { if (_uow == null) _uow = ObjectFactory.GetInstance<IUow>(); return _uow; }
        }
        private PunnelDataContext _l2qContext = null;
        public PunnelDataContext L2qContext
        {
            get
            {
                if (_l2qContext == null) _l2qContext = new PunnelDataContext(CONN_PUNNELALERT) { ObjectTrackingEnabled = false };
                return _l2qContext;
            }
        }

        public NotificationRepository(IUow uow)
        {
            _uow = uow;
        }

        /// <summary>
        /// Lấy danh sách notification của user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="limit"></param>
        /// <param name="start"></param>
        /// <returns></returns>
        public Tuple<List<AlertViewModel>,int> msp_GetAlert_ByUser(string userId, int limit, int start, int? type)
        {
            int total = 0;
            var res = L2qContext.msp_GetAlert_ByUser(
                userId,limit,start,type, ref total);
            var list = res.ToList();
            res.Dispose();
            return new Tuple<List<AlertViewModel>, int>(list, total);
        }
        /// <summary>
        /// Lấy số thông báo chưa xem
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public int msp_CountUnView_ByUser(string userId)
        {
            int? count = 0;
            var res= L2qContext.msp_CountUnView_ByUser(
                userId, ref count);
            return res;
        }

        public AlertViewModel IU_Alert(Alert data)
        {
            int id = (int)data.Id;
            var k = L2qContext.msp_Alert_IU(ref id,data.UserId,data.ReferId,data.Title,data.Content,data.Type,data.IsBroadCast,data.IsRead,data.Link,data.CreatedDate,data.UpdatedDate);
            return new AlertViewModel()
            {
                Id= k,
                ReferId= data.ReferId,
                Title= data.Title,
                Content = data.Content,
                Type = data.Type,
                IsRead = data.IsRead,
                Link= data.Link,
                CreatedDate = data.CreatedDate
            };
        }
        public void IU_AlertUser(AlertUser data)
        {
            L2qContext.msp_AlertUser_IU(data.UserId,data.LatestViewDate);
        }

        public void IU_MobileDevice(MobileDevice data)
        {
            L2qContext.msp_MobileDevice_IU(data.Id, data.UserId,data.Name,data.Token,data.Os, data.Status, data.ActiveDate);
        }

        public MobileDevice MobileDevice_GetById(string id)
        {
            var res = L2qContext.msp_MobileDevice_GetById(id);
            var list = res.ToList().FirstOrDefault();
            res.Dispose();
            return list;
        }

        public List<MobileDevice> MobileDevice_GetByUserId(string userId)
        {
            var res = L2qContext.msp_MobileDevice_GetByUserId(userId);
            var list = res.ToList();
            res.Dispose();
            return list;
        }

        #region Push Mobile Notification
        public void PushNotification(string userId, AlertViewModel data)
        {
            var devices = MobileDevice_GetByUserId(userId).ToList();
            //_log.InfoFormat("Total Device of {0}: {1}",userId,devices.Count);
            if (devices.Count > 0)
            {
                Parallel.ForEach(devices, (item) =>
                {
                    PushMessage msg = new PushMessage();
                    msg.to = item.Token;
                    msg.title = data.Title;
                    msg.body = data.Content;
                    msg.data = new AlertData()
                    {
                        ReferId= data.ReferId,
                        Type= data.Type
                    };
                    //msg.ttl = DateTime.Now.ToUnixTimeMiliseconds();
                    //msg.expiration = DateTime.Now.AddDays(1).ToUnixTimeMiliseconds();
                    //push to device--
                    new MobileMessageService().Push(msg);
                    //_log.Info(Newtonsoft.Json.JsonConvert.SerializeObject(msg));
                });
            }
        }

        public void PushNotificationFromLead(int leadId)
        {
            var lead = _uow.Lead.Get(leadId);
            LeadNotifyResponse res = new LeadNotifyResponse()
            {
                FullName = lead.FullName,
                Email = lead.Email,
                Phone = lead.Phone,
                Link = lead.Link,
                IpAddress = lead.IpAddress,
                Region = lead.RegionName
            };

            var r = _uow.Notification.IU_Alert(new Core.Entities.Notification.Alert()
            {
                ReferId = lead.Id.ToString(),
                UserId = lead.UserId,
                Title = res.Title,
                Content = res.Content,
                Type = (int)NotificationType.Subcrible,
                IsBroadCast = false,
                Link = res.Link
            });
            this.PushNotification(lead.UserId, r);
        }
        #endregion

        #region Push Punnel SignalR notification
        public void SendNotifyUser(NotificationMessageRequest data)
        {
            var res= new NotificationService().SendNotify(data);
            if(res.Code!= System.Net.HttpStatusCode.OK)
            {
                throw new BusinessException(res.Message);
            }
        }
        #endregion
    }
}


