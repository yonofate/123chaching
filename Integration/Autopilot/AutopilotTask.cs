
using log4net;
using Newtonsoft.Json;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.Autopilot;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace IntegrationServices.Autopilot
{
    public class AutopilotTask
    {
        private static readonly ILog _log = LogManager.GetLogger("AutopilotTask");
        public static string BaseApi = "https://api2.autopilothq.com/v1/";
        string _apiKey;
        public AutopilotTask(string apiKey)
        {
            _apiKey = apiKey;
            System.Net.ServicePointManager.SecurityProtocol |= System.Net.SecurityProtocolType.Tls12;
        }

        public ApiResponse Auth()
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var client = new RestClient($"{BaseApi}/account");
                var request = new RestRequest(Method.GET);
                request.AddHeader("autopilotapikey", _apiKey);

                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Data = JsonConvert.DeserializeObject<AccountResponse>(response.Content);
                }
                else
                {
                    _log.Error(response.StatusDescription);
                    _log.Error(response.ErrorMessage);
                    res.Message = Punnel.Core.Entities.Resources.Messages.ApiKey_Err;
                }
            }
            catch (Exception ex)
            {
                res.Message = Punnel.Core.Entities.Resources.Messages.ApiKey_Err;
            }
            return res;
        }

        #region Caimpain(List)
        public ApiResponse GetCampaigns()
        {
            ApiResponse res = new ApiResponse();
            try
            {
                List<AutopilotCampainItemResponse> lists = new List<AutopilotCampainItemResponse>();
                var client = new RestClient($"{BaseApi}/lists");
                var request = new RestRequest(Method.GET);
                request.AddHeader("autopilotapikey", _apiKey);

                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var r= JsonConvert.DeserializeObject<CampainResponse>(response.Content);

                    foreach(var item in r.lists)
                    {
                        lists.Add(new AutopilotCampainItemResponse()
                        {
                            id = item.list_id,
                            name = item.title
                        });
                    }
                    res.Data = lists;
                }
                else
                {
                    _log.Error(response.StatusDescription);
                    _log.Error(response.ErrorMessage);
                    res.Message = Punnel.Core.Entities.Resources.Messages.ApiKey_Err;
                }
               
            }
            catch(Exception ex)
            {
                res.Message = ex.Message;
                res.Message = Punnel.Core.Entities.Resources.Messages.Api_Err;
            }
            return res;
        }
        #endregion

        #region Contact
        public ApiResponse AddContact(ContactRequest contact_request, string listId="0")
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var client = new RestClient($"{BaseApi}/contact");
                var request = new RestRequest(Method.POST);
                request.AddHeader("autopilotapikey", _apiKey);
                request.AddParameter("application/json", JsonConvert.SerializeObject(contact_request), ParameterType.RequestBody);

                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.Created || response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Code = System.Net.HttpStatusCode.OK;
                    var contactRes= JsonConvert.DeserializeObject<ContactResponse>(response.Content);

                    if (listId.Length > 0 && listId != "0" && 1==0)
                    {
                        //add to list
                        client = new RestClient($"{BaseApi}/list/{listId}/contact/{contactRes.contact.id}");
                        request = new RestRequest(Method.POST);
                        request.AddHeader("autopilotapikey", _apiKey);
                        var body = new
                        {                          
                        };

                        //request.AddParameter("application/json", JsonConvert.SerializeObject(body), ParameterType.RequestBody);
                        response = client.Execute(request);
                        res.Code = response.StatusCode;
                        if (response.StatusCode == System.Net.HttpStatusCode.Created || response.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            res.Code = System.Net.HttpStatusCode.OK;

                        }
                        else
                        {
                            res.Code = response.StatusCode;
                            res.Message = response.Content;
                            _log.Error(response);
                        }
                    }
                }
                else
                {
                    res.Code = response.StatusCode;
                    res.Message = response.Content;
                    _log.Error(response);
                }
                
            }
            catch (Exception ex)
            {
                res.Message = ex.Message;
            }
            return res;
        }
        #endregion
    }
}
