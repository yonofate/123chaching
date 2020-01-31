using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration;
using RestSharp;
using Newtonsoft.Json;
using log4net;
using MBN.Utils;
using Punnel.Core.BLL.Utils;

namespace Punnel.Core.BLL.Services
{
    public class LocationService
    {
        private static readonly ILog _log = LogManager.GetLogger("LocationService");
        private static readonly string BaseApi = WebUtils.AppSettings("LOCATIONIP_API", "");
        private static readonly string BaseApiV6 = WebUtils.AppSettings("LOCATIONIPV6_API", "");

        public ApiResponse GetInfoByIp(string ip)
        {
            string content = ip;
            ApiResponse res = new ApiResponse();
            if (CommonUtils.ValidateIPv4(ip) == false)
            {
                res.Message = string.Format("IP not valid {0}", ip);
                _log.ErrorFormat("IP not valid {0}", ip);
                return res;
            }
            try
            {
                string sapi = ip.Contains(":") ? BaseApiV6 : BaseApi;
                var client = new RestClient(string.Format(sapi,ip));
                var request = new RestRequest(Method.GET);
                request.AddHeader("content-type", "application/json");
                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                content = response.Content;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    LocationIPResponse r= new LocationIPResponse();
                    if (BaseApi.Contains("ip-api.com"))
                    {
                        var x = JsonConvert.DeserializeObject<LocationResponse>(response.Content);
                        r.country_name = x.Country;
                        r.country_code = x.CountryCode;
                        r.city = x.City;
                        r.region = x.RegionName;
                        r.region_code = x.Region;
                        r.organisation = x.Org;
                    }
                    else
                    {
                        r = JsonConvert.DeserializeObject<LocationIPResponse>(response.Content);
                    }
                    if (r.city != null && r.region != null)
                    {
                        res.Data = r;                       
                    }else if (response.Content.Contains("Ho_Chi_Minh"))
                    {
                        r.region = "Ho Chi Minh";
                        r.city = "Ho Chi Minh City";
                        res.Data = r;
                    }
                    else
                    {
                        _log.Error(response.Content);
                        if (BaseApi.Contains("ip-api.com") == false)
                            res.Code = System.Net.HttpStatusCode.BadRequest;
                    }
                }
                else
                {
                    res.Message = Punnel.Core.Entities.Resources.Messages.ApiKey_Err;
                    res.Code = System.Net.HttpStatusCode.BadRequest;
                }
            }
            catch (Exception ex)
            {
                _log.Error(content);
                _log.Error(ex.Message, ex);
                res.Code = System.Net.HttpStatusCode.BadRequest;
                res.Message = ex.Message;
            }
            return res;
        }
    }
}
