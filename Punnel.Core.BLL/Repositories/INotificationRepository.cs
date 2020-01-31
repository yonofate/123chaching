using System;
using System.Collections.Generic;
using Punnel.Core.Entities.Notification;
using Punnel.Core.Model;

namespace Punnel.Core.BLL.Repositories
{
    public interface INotificationRepository
    {
        PunnelDataContext L2qContext { get; }
        IUow uow { get; }

        AlertViewModel IU_Alert(Alert data);
        void IU_AlertUser(AlertUser data);
        int msp_CountUnView_ByUser(string userId);
        Tuple<List<AlertViewModel>, int> msp_GetAlert_ByUser(string userId, int limit, int start, int? type);
        void IU_MobileDevice(MobileDevice data);
        MobileDevice MobileDevice_GetById(string id);
        List<MobileDevice> MobileDevice_GetByUserId(string userId);
        void PushNotification(string userId, AlertViewModel data);
        void PushNotificationFromLead(int leadId);
        void SendNotifyUser(NotificationMessageRequest data);
    }
}