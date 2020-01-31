using log4net;
using Newtonsoft.Json;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.GetResponse;
using Punnel.Core.Entities.Integration.InfusionSoft;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegrationServices.InfusionSoft
{
    public class InfusionSoftTask
    {
        private static readonly ILog _log = LogManager.GetLogger("InfusionSoftTask");
        public static readonly string BaseApi = "https://api.infusionsoft.com/crm/rest/v1";
        public static readonly string Client_Id = "bh6evrn8z6wygav5rf9rf4am";
        public static readonly string Client_Secret = "q6KAcv8ykj";
        string _accessToken, _refreshToken;
        public InfusionSoftTask(string accessToken="", string refreshToken="")
        {
            _accessToken = accessToken;
            _refreshToken = refreshToken;
            System.Net.ServicePointManager.SecurityProtocol |= System.Net.SecurityProtocolType.Tls12;
        }

        public ApiResponse Auth(string code)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                System.Net.ServicePointManager.SecurityProtocol |= System.Net.SecurityProtocolType.Tls12;
                var client = new RestClient("https://api.infusionsoft.com/token");
                var request = new RestRequest(Method.POST);
                request.AddParameter("client_id", Client_Id);
                request.AddParameter("client_secret", Client_Secret);
                request.AddParameter("code", code);
                request.AddParameter("grant_type", "authorization_code");
                request.AddParameter("redirect_uri", "https://app.punnel.com/integrationApi/infusionsoftinstall");

                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {                  
                    res.Data = JsonConvert.DeserializeObject<InfusionSoftTokenRes>(response.Content);
                }
                else
                {
                    _log.Error(code);
                    _log.Error(response.StatusDescription);
                    _log.Error(response.ErrorMessage);
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

        public InfusionSoftTokenRes Refresh()
        {
            InfusionSoftTokenRes res = new InfusionSoftTokenRes();
            try
            {
                System.Net.ServicePointManager.SecurityProtocol |= System.Net.SecurityProtocolType.Tls12;
                var client = new RestClient("https://api.infusionsoft.com/token");
                var request = new RestRequest(Method.POST);
                request.AddParameter("refresh_token", _refreshToken);
                request.AddParameter("grant_type", "refresh_token ");
                request.AddHeader("Authorization", "Basic " + Base64Encode(Client_Id + ":" + Client_Secret));

                IRestResponse response = client.Execute(request);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res =JsonConvert.DeserializeObject<InfusionSoftTokenRes>(response.Content);
                }
                else
                {
                    _log.Error(response.StatusDescription);
                    _log.Error(response.ErrorMessage);
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
            }
            return res;
        }

        #region Caimpain(List)
        public ApiResponse GetCampaigns()
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var client = new RestClient($"{BaseApi}/tags");
                var request = new RestRequest(Method.GET);

                request.AddHeader("content-type", "application/json");
                request.AddHeader("Authorization", $"bearer {_accessToken}");
                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Data = JsonConvert.DeserializeObject<InfusionSoftTags>(response.Content).tags;
                }               
                else
                    res.Message = Punnel.Core.Entities.Resources.Messages.Api_Err;
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = Punnel.Core.Entities.Resources.Messages.Api_Err;
            }
            return res;
        }

        #endregion

        #region Contact
        public ApiResponse AddContact(Punnel.Core.Entities.Integration.InfusionSoft.ContactRequest contact_request, string tagId="0")
        {
            ApiResponse res = new ApiResponse();
            try
            {
                _log.WarnFormat("tagId={0}", tagId, contact_request.email_addresses.FirstOrDefault().email);
                var client = new RestClient($"{BaseApi}/contacts");
                var request = new RestRequest(Method.POST);
                request.AddHeader("content-type", "application/json");
                request.AddHeader("Authorization", $"bearer {_accessToken}");
                request.AddParameter("application/json", JsonConvert.SerializeObject(contact_request), ParameterType.RequestBody);
                _log.Warn(request);
                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                var jResponse = JsonConvert.DeserializeObject<ContactResponse>(response.Content);
                if (response.StatusCode == System.Net.HttpStatusCode.Created || response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Code = System.Net.HttpStatusCode.OK;
                    if (tagId != "0" && tagId.Length > 0)
                    {
                        client = new RestClient($"{BaseApi}/contacts/{jResponse.id}/tags");
                        request = new RestRequest(Method.POST);
                        request.AddHeader("Authorization", $"bearer {_accessToken}");
                        TagApplyReq tags = new TagApplyReq();
                        tags.tagIds = new List<int>();
                        tags.tagIds.Add(int.Parse(tagId));
                        request.AddParameter("application/json", JsonConvert.SerializeObject(tags), ParameterType.RequestBody);
                        response = client.Execute(request);
                        res.Code = response.StatusCode;
                        if (response.StatusCode == System.Net.HttpStatusCode.Created || response.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            res.Code = System.Net.HttpStatusCode.OK;
                        }
                        else
                        {
                            res.Code = response.StatusCode;
                        }
                    }
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

        string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
    }

    
}
