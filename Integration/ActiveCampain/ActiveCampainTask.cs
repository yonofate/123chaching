
using log4net;
using Newtonsoft.Json;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.ActiveCampain;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace IntegrationServices.ActiveCampain
{
    public class ActiveCampainTask
    {
        private static readonly ILog _log = LogManager.GetLogger("ActiveCampainTask");
        public static string BaseApi = "";
        public static readonly string Account_Api = "users";
        public static readonly string Campaign_Api = "list_list";
        public static readonly string Contact_Api = "contact_add";
        string _apiKey;
        public ActiveCampainTask(string url, string apiKey)
        {
            _apiKey = apiKey;
            BaseApi = url;
            System.Net.ServicePointManager.SecurityProtocol |= System.Net.SecurityProtocolType.Tls12;
        }

        public ApiResponse Auth()
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var client = new RestClient($"{BaseApi}/api/3/{Account_Api}?api_key={_apiKey}");
                var request = new RestRequest(Method.GET);
                request.AddHeader("Api-Token", _apiKey);

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


                //client.ExecuteAsync(request, response =>
                //{
                //    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                //    {
                //        res.Code = response.StatusCode;
                //        var r = JsonConvert.DeserializeObject<AccountResponse>(response.Content);
                //        if (string.IsNullOrEmpty(r.email))
                //        {
                //            res.Data = r;
                //        }
                //        else res.Code = HttpStatusCode.NonAuthoritativeInformation;
                //    }
                //    else
                //    {
                //        res.Message = Punnel.Core.Entities.Resources.Messages.ApiKey_Err;
                //    }
                //});
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
                var client = new RestClient($"{BaseApi}/api/3/lists");
                var request = new RestRequest(Method.GET);
                request.AddHeader("Api-Token", _apiKey);

                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var r= JsonConvert.DeserializeObject<CampainResponse>(response.Content);
                    res.Data = r.lists;
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
                var client = new RestClient($"{BaseApi}/api/3/contacts");
                var request = new RestRequest(Method.POST);
                request.AddHeader("Api-Token", _apiKey);
                request.AddParameter("application/json", JsonConvert.SerializeObject(contact_request), ParameterType.RequestBody);

                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.Created || response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Code = System.Net.HttpStatusCode.OK;
                    var contactRes= JsonConvert.DeserializeObject<ContactResponse>(response.Content);

                    if (listId.Length > 0 && listId != "0")
                    {
                        //add to list
                        client = new RestClient($"{BaseApi}/api/3/contactLists");
                        request = new RestRequest(Method.POST);
                        request.AddHeader("Api-Token", _apiKey);
                        var body = new
                        {
                            contactList = new
                            {
                                list = int.Parse(listId),
                                contact = contactRes.contact.id,
                                status = 1
                            }
                        };

                        request.AddParameter("application/json", JsonConvert.SerializeObject(body), ParameterType.RequestBody);
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
