using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using log4net;
using Newtonsoft.Json;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Notification;
using RestSharp;

namespace Punnel.Core.BLL.Services
{
    public class MobileMessageService
    {
        private static readonly ILog _log = LogManager.GetLogger("PushMessageService");
        private static readonly string PushApiURL = "https://exp.host/--/api/v2/push/send";
        public MobileMessageService()
        {
        }

        public ApiResponse Push(PushMessage data)
        {          
            ApiResponse res = new ApiResponse();
            try
            {
                var client = new RestClient(PushApiURL);
                var request = new RestRequest(Method.POST);
                request.AddHeader("content-type", "application/json");
                request.AddParameter("application/json", JsonConvert.SerializeObject(data), ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == System.Net.HttpStatusCode.Accepted || response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Code = System.Net.HttpStatusCode.OK;
                }
                else
                {
                    res.Code = response.StatusCode;
                    res.Message = response.Content;
                    _log.Error(response);
                }

            //client.ExecuteAsync(request, response =>
            //{
            //    if (response.StatusCode == System.Net.HttpStatusCode.Accepted || response.StatusCode == System.Net.HttpStatusCode.OK)
            //    {
            //        res.Code = System.Net.HttpStatusCode.OK;
            //    }
            //    else
            //    {
            //        res.Code = response.StatusCode;
            //        res.Message = response.Content;
            //        _log.Error(response);
            //    }
            //});
        }
            catch (Exception ex)
            {
                _log.Info(data);
                _log.Error(ex);
                res.Message = ex.Message;
            }
            return res;
        }
    }
}
