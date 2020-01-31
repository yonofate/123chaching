using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MBN.Utils;
using Punnel.Core.Entities;
using RestSharp;

namespace Punnel.Core.BLL.Utils
{
    public class SmsUtils
    {
        public static readonly string sms_mos_api = "http://sms.mos.com.vn/api/services/SendMessageNow?phone_uid={0}&pin={1}&sim={2}&to={3}&sms={4}";

        private static readonly string SMS_DATA = WebUtils.AppSettings("SMS_DATA", "");

        public string _phone_uid;
        public string _pin;
        public string _sim;

        public SmsUtils()
        {
            if (!string.IsNullOrEmpty(SMS_DATA))
            {
                var info = SMS_DATA.Split(new char[1] { ';' });
                _phone_uid = info[0];
                _pin = info[1];
                _sim = info[2];
            }
        }
        public SmsUtils(string phone_uid,string pin, string sim)
        {
            _phone_uid = phone_uid;
            _pin = pin;
            _sim = sim;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="toNumber">Số điện thoại gửi đi ex: 0908999789</param>
        /// <param name="content"> Nội dung tin nhắn, tối đa 160 kí tự không dấu</param>
        /// <returns></returns>
        public ApiResponse Send(string toNumber, string content)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var url = string.Format(sms_mos_api, _phone_uid, _pin, _sim, toNumber, content);
                var client = new RestClient(url);
                var request = new RestRequest(Method.GET);
                request.AddHeader("cache-control", "no-cache");
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    res.Data = response.Content;
                }
                res.Code = response.StatusCode;
                return null;
            }catch (Exception ex)
            {
                res.Code = System.Net.HttpStatusCode.BadRequest;
            }
            return res;
        }

    }
}
