using log4net;
using Newtonsoft.Json;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.GetResponse;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegrationServices.GetResponse
{
    public class GetResponseTask
    {
        private static readonly ILog _log = LogManager.GetLogger("GetResponseTask");
        public static readonly string BaseApi = "https://api.getresponse.com/v3/";
        public static readonly string Account_Api = "accounts";
        public static readonly string Campaign_Api = "campaigns";
        public static readonly string Contact_Api = "contacts";
        string _apiKey;
        public GetResponseTask(string apiKey)
        {
            _apiKey = apiKey;
        }

        public ApiResponse Auth()
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var client = new RestClient($"{BaseApi}{Account_Api}");
                var request = new RestRequest(Method.GET);
                request.AddHeader("content-type", "application/json");
                request.AddHeader("x-auth-token", $"api-key {_apiKey}");
                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Data = JsonConvert.DeserializeObject<AccountResponse>(response.Content);
                }
                else
                {                   
                    res.Message = Punnel.Core.Entities.Resources.Messages.ApiKey_Err;
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
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
                var client = new RestClient($"{BaseApi}{Campaign_Api}");
                var request = new RestRequest(Method.GET);
                request.AddHeader("content-type", "application/json");
                request.AddHeader("x-auth-token", $"api-key {_apiKey}");
                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Data = JsonConvert.DeserializeObject<List<CampainResponse>>(response.Content);
                }else
                    res.Message = Punnel.Core.Entities.Resources.Messages.Api_Err;
            }
            catch(Exception ex)
            {
                _log.Error(ex);
                res.Message = Punnel.Core.Entities.Resources.Messages.Api_Err;
            }
            return res;
        }
        public ApiResponse AddCampaign(CampainPostRequest camp_request)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var client = new RestClient($"{BaseApi}{Campaign_Api}");
                var request = new RestRequest(Method.POST);
                request.AddHeader("content-type", "application/json");
                request.AddHeader("x-auth-token", $"api-key {_apiKey}");
                request.AddParameter("application/json", JsonConvert.SerializeObject(camp_request), ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);

                if (response.StatusCode == System.Net.HttpStatusCode.Accepted || response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Code = System.Net.HttpStatusCode.OK;
                    res.Data = JsonConvert.DeserializeObject<CampainPostResponse>(response.Content); 
                }
                else res.Code = response.StatusCode;
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = ex.Message;
            }
            return res;
        }
        #endregion

        #region Contact
        public ApiResponse AddContact(ContactRequest contact_request)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var client = new RestClient($"{BaseApi}{Contact_Api}");
                var request = new RestRequest(Method.POST);
                request.AddHeader("content-type", "application/json");
                request.AddHeader("x-auth-token", $"api-key {_apiKey}");
                request.AddParameter("application/json",JsonConvert.SerializeObject(contact_request), ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);

                res.Code = response.StatusCode;
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
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = ex.Message;
            }
            return res;
        }
        #endregion
    }

    
}
