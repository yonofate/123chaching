using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using log4net;
using MBN.Utils;
using Newtonsoft.Json;
using Punnel.Core.Entities;
using RestSharp;

namespace Punnel.Core.BLL.Services
{
    public class TokenService
    {
        private static readonly ILog _log = LogManager.GetLogger("TokenService");
        private readonly static string BaseApi= WebUtils.AppSettings("API_URL", "");
        public ApiResponse Validate(string token)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var client = new RestClient($"{BaseApi}/api/usertoken");
                var request = new RestRequest(Method.GET);
                request.AddHeader("content-type", "application/json");
                request.AddHeader("authorization", token);
                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Data = response.Content;
                    //_log.Info(res.Data);
                }
                else
                {
                   // _log.Info("not connect");
                    res.Data = null;
                    res.Message = Punnel.Core.Entities.Resources.Messages.ApiKey_Err;
                }
            }
            catch (Exception ex)
            {
                res.Message = Punnel.Core.Entities.Resources.Messages.ApiKey_Err;
            }
            return res;
        }

    }
}
