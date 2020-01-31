using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using log4net;
using MBN.Utils;
using Newtonsoft.Json;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Notification;
using RestSharp;

namespace Punnel.Core.BLL.Services
{
    public class NotificationService
    {
        private static readonly ILog _log = LogManager.GetLogger("NotificationService");
        private static readonly string Notify_Api_Url = WebUtils.AppSettings("Notify_Api_Url", "https://api.punnel.com/api/notification/notifyuser");
        public NotificationService()
        {
        }

        public ApiResponse SendNotify(NotificationMessageRequest data)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var client = new RestClient(Notify_Api_Url);
                var request = new RestRequest(Method.POST);
                request.AddHeader("content-type", "application/json");
                request.AddParameter("application/json", JsonConvert.SerializeObject(data), ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    res.Code = response.StatusCode;
                    res.Message = "Thông báo chưa được gửi đi, vui lòng thử lại";
                    _log.Error(response);
                }
            }
            catch(Exception ex)
            {
                _log.Error(ex.Message,ex);
            }
            return res;
        }
    }
}
