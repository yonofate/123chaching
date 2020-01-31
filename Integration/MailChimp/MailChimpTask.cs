using log4net;
using Newtonsoft.Json;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.MailChimp;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegrationServices.MailChimp
{
    public class MailChimpTask
    {
        private static readonly ILog _log = LogManager.GetLogger("MailChimpTask");
        public string BaseApi = "https://{0}.api.mailchimp.com/3.0/";
        public static readonly string Account_Api = "accounts";
        public static readonly string Campaign_Api = "lists";
        public static readonly string Contact_Api = "lists/{0}/members/";
        string _apiKey;
        public MailChimpTask(string apiKey)
        {
            var x= apiKey.Trim().Split(new char[1] { '-' });
            if (x.Length < 2) throw new Exception("Api Key không hợp lệ");
            BaseApi = string.Format(BaseApi,x[1]);
            _apiKey = apiKey;
        }

        public ApiResponse Auth()
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var client = new RestClient($"{BaseApi}");
                var request = new RestRequest(Method.GET);
                request.AddHeader("content-type", "application/json");
                request.AddHeader("Authorization", $"apikey {_apiKey}");
                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Data = JsonConvert.DeserializeObject<AccountResponse>(response.Content);
                }else
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
                request.AddHeader("Authorization", $"api-key {_apiKey}");
                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Data = JsonConvert.DeserializeObject<CampainResponse>(response.Content);
                }
                else
                {
                    res.Message = Punnel.Core.Entities.Resources.Messages.Api_Err;
                }
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
                request.AddHeader("Authorization", $"api-key {_apiKey}");
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
        public ApiResponse AddContact(ContactRequest contact_request, string listId)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                string api = string.Format(Contact_Api, listId);
                var client = new RestClient($"{BaseApi}{api}");
                var request = new RestRequest(Method.POST);
                request.AddHeader("content-type", "application/json");
                request.AddHeader("Authorization", $"api-key {_apiKey}");
                request.AddParameter("application/json",JsonConvert.SerializeObject(contact_request), ParameterType.RequestBody);
                _log.Warn(request);
                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                var jResponse = JsonConvert.DeserializeObject<ContactResponse>(response.Content);
                res.Message = jResponse.title;
                if (response.StatusCode == System.Net.HttpStatusCode.Accepted || response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Code = System.Net.HttpStatusCode.OK;
                }
                else
                {
                    res.Code = response.StatusCode;
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
