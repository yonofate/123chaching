using MBN.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZaloCSharpSDK;

namespace Punnel.Core.BLL.Utils
{
    public class ZaloUtils
    {
        private static readonly string ZALO_APP_ID = WebUtils.AppSettings("ZALO_APP_ID", "3253505469606898301");
        private static readonly string ZALO_APP_SECRET = WebUtils.AppSettings("ZALO_APP_SECRET", "6YOZci96vuJ4WJHW5GiE");
        private static readonly string ZALO_APP_CALLBACK = WebUtils.AppSettings("ZALO_APP_CALLBACK", "http://localhost:2171/authZaloComplete.html");
        Zalo3rdAppClient appClient;
        public ZaloUtils()
        {
            var info = new Zalo3rdAppInfo(long.Parse(ZALO_APP_ID), ZALO_APP_SECRET, ZALO_APP_CALLBACK);
            appClient = new Zalo3rdAppClient(info);
        }

        public ZaloProfile GetProfile(string code)
        {
            Newtonsoft.Json.Linq.JObject token = appClient.getAccessToken(code);
            var sc = token.GetValue("access_token");
            Newtonsoft.Json.Linq.JObject profile = appClient.getProfile(sc.ToString(), "id,name");
            return profile.ToObject<ZaloProfile>();
        }
    }

    public class ZaloProfile
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    public class ZaloAuthResponse
    {
        public string uid { get; set; }
        public string code { get; set; }
        public string state { get; set; }
    }
}
