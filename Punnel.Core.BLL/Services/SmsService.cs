using Facebook;
using log4net;
using MBN.Utils;
using Newtonsoft.Json;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.Sms;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Services
{
    public class SmsService
    {
        private static readonly ILog _log = LogManager.GetLogger(typeof(SmsService));
        private static readonly string SMS_PhoneUID = WebUtils.AppSettings("SMS_PhoneUID", "");
        private static readonly string SMS_Pin = WebUtils.AppSettings("SMS_Pin", "");
        private static readonly string SMS_Sim = WebUtils.AppSettings("SMS_Sim", "");

        static readonly string smsSendApi = "http://sms.mos.com.vn/api/services/SendMessageNow?phone_uid={0}&pin={1}&sim={2}&to={3}&sms={4}";
        static readonly string smsAddDeviceApi = "http://sms.mos.com.vn/api/services/AddPhone?username=lamktvn&password=lamktvn&phonename={0}&pin={1}&sim1={2}&sim2={3}&sim3&sim4";
        static readonly string smsRemoveDeviceApi = "http://sms.mos.com.vn/api/services/DeletePhone?username=lamktvn&password=lamktvn&phoneUid={0}";
        public SmsService()
        {
        }

        public bool Send(string mobile, string msg)
        {
            if (string.IsNullOrEmpty(mobile) == false)
            {
                string url = string.Format(smsSendApi, SMS_PhoneUID, SMS_Pin, SMS_Sim, mobile, msg);
                WebRequest request = WebRequest.Create(url);
                _log.Warn(url);
                WebResponse response = request.GetResponse();
                if (((HttpWebResponse)response).StatusCode == HttpStatusCode.OK)
                {
                    return true;
                }
                else
                {
                    _log.Error(((HttpWebResponse)response).StatusDescription);
                }
            }
            return false;
        }

        public bool Send(string SMS_PhoneUID, string SMS_Pin, string SMS_Sim, string mobile, string msg)
        {
            if (string.IsNullOrEmpty(mobile) == false)
            {
                string url = string.Format(smsSendApi, SMS_PhoneUID, SMS_Pin, SMS_Sim, mobile, msg);
                WebRequest request = WebRequest.Create(url);
                _log.Warn(url);
                WebResponse response = request.GetResponse();
                if (((HttpWebResponse)response).StatusCode == HttpStatusCode.OK)
                {
                    return true;
                }
                else
                {
                    _log.Error(((HttpWebResponse)response).StatusDescription);
                }
            }
            return false;
        }

        public ApiResponse AddDevice(string name, string sim1, string sim2, string pin,Guid? integrationId=null)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                if (string.IsNullOrEmpty(name) == false && string.IsNullOrEmpty(sim1) == false && string.IsNullOrEmpty(name) == false && string.IsNullOrEmpty(pin) == false)
                {
                    string url = string.Format(smsAddDeviceApi, name,pin, sim1, sim2);
                    var client = new RestClient(url);
                    var request = new RestRequest(Method.GET);
                    request.AddHeader("cache-control", "no-cache");
                    IRestResponse response = client.Execute(request);
                    res.Code = response.StatusCode;
                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        var r= JsonConvert.DeserializeObject<SmsAddDeviceResponse>(response.Content);
                        if (r.elements.phone_uid > 0) res.Data = r.elements.phone_uid;
                        else res.Code = HttpStatusCode.BadRequest;
                    }
                    else
                    {
                        res.Message = Punnel.Core.Entities.Resources.Messages.ApiKey_Err;
                    }
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = Punnel.Core.Entities.Resources.Messages.ApiKey_Err;
            }
            return res;
        }

        public ApiResponse RemoveDevice(int deviceId, Guid? integrationId=null)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                string url = string.Format(smsRemoveDeviceApi, deviceId);
                var client = new RestClient(url);
                var request = new RestRequest(Method.GET);
                request.AddHeader("cache-control", "no-cache");
                IRestResponse response = client.Execute(request);
                res.Code = response.StatusCode;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var r= JsonConvert.DeserializeObject<SmsRemoveDeviceResponse>(response.Content);
                    res.Data = r.elements;
                    if(r.elements==false)
                    {
                        res.Code = HttpStatusCode.BadRequest;
                        res.Message = Punnel.Core.Entities.Resources.Messages.ApiKey_Err;
                    }
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

        public ApiResponse SendLeadAutoReply(LeadToSendAutoEmailModel data, UserProfile user)
        {
            var res= new ApiResponse();
            try
            {
                data.MergeVariants();
                if (data.SendFromType == 0)
                {
                    var content = ProcessSmsContent(data.BodyHtml);
                    var r = Send(data.Phone, content);
                    res.Code = r == true ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
                }
                else
                {
                    var content = ProcessSmsContent(data.BodyHtml);
                    data.ToIntegrationSms();

                    Random rnd = new Random();
                    int idx = data.FromSmsList.Count > 0 ? rnd.Next(0, data.FromSmsList.Count - 1) : 0;
                    var u = data.FromSmsList[idx];
                    var sim = u.Sim1;
                    string tsim = "sim1";
                    if (string.IsNullOrEmpty(sim)) { sim = u.Sim2; tsim = "sim2"; }
                    var r = Send(u.PhoneId,u.Pin,tsim, data.Phone, content);
                    res.Code = r == true ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

                    if (res.Code != System.Net.HttpStatusCode.OK)
                    {
                        string contentNotify = $"Kiểm tra lại tích hợp sms {u.Name} trên punnel của bạn & kiểm tra lại ứng dụng gửi sms trên điện thoại còn hoạt động không";
                        new Utils.EmailUtils(new Entities.Integration.Gmail.EmailToModel()
                        {
                            Email = user.Email,
                            FullName = user.FullName,
                            AvatarUrl = user.Avatar
                        }).SendNotify_AutoReplyError(contentNotify);
                    }
                }
            }catch(Exception ex)
            {
                _log.Error(ex);
            }
            return res;
        }

        string ProcessSmsContent(string content)
        {
            var nonVietnamese= Utils.CommonUtils.RemoveSign4VietnameseString(content);
            if (content.Length > 300) return nonVietnamese.Substring(0, 300);
            return content;
        }
    }


    public class FacebookService
    {
        private static readonly string fbAccessToken = WebUtils.AppSettings("FacebookPage_AccessToken", "EAABb1bZAzjd8BAL9s490hJu0O0nZAZBZBiGxNxohACUxG97l1s7U2xdfgsNbUXrW3Fpyh62ZCsNZC7Wkb2mTNIYZCqo7NUsdUFlGGj18nZCVITRWrZBOLuZBLEEmwd7BJVXJoQAVrvHZC2g9eAf8KfOmjQrlvrgciyQtEc9pjZBhMBx6Dm7cQZBwTuUvUj9wU4hcGoZBQZD");
        public bool SendFacebookMsg(string fbId, string message)
        {
            var fb = new FacebookClient(fbAccessToken);
            var command = string.Format("{0}/messages", fbId);
            dynamic result = fb.Post(command, new { message });
            string id = result.id;
            return (id.Length > 0 && id.Contains("m_")) ? true : false;
        }

        public void SendToCS(string message)
        {
            foreach (var fbId in "t_10157200038457351".Split(new char[1] { ',' }))
            {
                SendFacebookMsg(fbId, message);
            }
        }
    }
}
