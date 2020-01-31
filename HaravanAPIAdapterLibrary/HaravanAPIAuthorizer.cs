using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using Newtonsoft.Json.Linq;

namespace HaravanAPIAdapterLibrary
{
    /// <summary>
    /// this class is used to obtain the authorization
    /// from the haravan customer to make api calls on their behalf
    /// </summary>
    public class HaravanAPIAuthorizer
    {
        private string _appId;
        //private string _apiKey;
        private string _secret;
        private string _redirectUrlLogin;
        private string _redirectUrlInstall;

        /// <summary>
        /// Creates an instance of this class in order to obtain the authorization
        /// from the haravan customer to make api calls on their behalf
        /// </summary>
        /// <param name="shopName">name of the shop to make the calls for.</param>
        /// <param name="apiKey">the unique api key of your app (obtained from the partner area when you create an app).</param>
        /// <param name="secret">the secret associated with your api key.</param>
        /// <remarks>make sure that the shop name parameter is the only the subdomain part of the myharavan.com url.</remarks>
        public HaravanAPIAuthorizer(string appId, string secret, string redirectUrlLogin, string redirectUrlInstall)
        {
            if (appId == null)
                throw new ArgumentNullException("apiKey", "Make sure you have this in your config file.");
            if (secret == null)
                throw new ArgumentNullException("secret", "Make sure you have this in your config file.");
            if (appId.Length == 0)
                throw new ArgumentException("Make sure you have this in your config file.", "apiKey");
            if (secret.Length == 0)
                throw new ArgumentException("Make sure you have this in your config file.", "secret");

            if (redirectUrlLogin == "") throw new ArgumentException("redirectUrlLogin can't null");
            if (redirectUrlInstall == "") throw new ArgumentException("redirectUrlInstall can't null");

            this._redirectUrlLogin = redirectUrlLogin;//HttpUtility.UrlEncode(redirectUrl);
            this._redirectUrlInstall = redirectUrlInstall;
            this._appId = appId;
            this._secret = secret;
        }

        /// <summary>
        /// Get the URL required by you to redirect the User to in which they will be 
        /// presented with the ability to grant access to your app with the specified scope
        /// </summary>
        /// <param name="scope"></param>
        /// <param name="redirectUrl"></param>
        /// <returns></returns>

        public string GetAuthorizationURL(string[] scope)
        {
            var authURL = new StringBuilder();

            authURL.Append("https://accounts.haravan.com/connect/authorize");
            authURL.AppendFormat("?response_mode={0}&response_type={1}&client_id={2}", HttpUtility.UrlEncode("form_post"), "code id_token", this._appId);

            if (scope != null && scope.Length > 0)
            {
                string spaceSeperatedScope = String.Join(" ", scope);
                if (!String.IsNullOrEmpty(spaceSeperatedScope))
                    authURL.AppendFormat("&scope={0}", spaceSeperatedScope);
            }

            authURL.AppendFormat("&redirect_uri={0}", _redirectUrlLogin);
            authURL.AppendFormat("&nonce={0}", DateTime.Now.GetHashCode().ToString("x"));

            return authURL.ToString();
        }

        /// <summary>
        /// After the shop owner has authorized your app, Haravan will give you a code.
        /// Use this code to get your authorization state that you will use to make API calls
        /// </summary>
        /// <param name="code">a code given to you by haravan</param>
        /// <returns>Authorization state needed by the API client to make API calls</returns>
        /// 
        public HaravanAuthorizationState AuthorizeClient(string code)
        {
            string url = "https://accounts.haravan.com/connect/token";
            string postBody = String.Format("client_id={0}&client_secret={1}&code={2}&redirect_uri={3}&grant_type=authorization_code",
                _appId,        // {0}
                _secret,        // {1}
                code,           // {2}
                HttpUtility.UrlEncode(_redirectUrlLogin));  // {3)

            HttpWebRequest authRequest = (HttpWebRequest)WebRequest.Create(url);
            authRequest.Method = "POST";
            authRequest.ContentType = "application/x-www-form-urlencoded";
            using (var ms = new MemoryStream())
            {
                using (var writer = new StreamWriter(authRequest.GetRequestStream()))
                {
                    writer.Write(postBody);
                    writer.Close();
                }
            }

            var response = (HttpWebResponse)authRequest.GetResponse();
            string result = null;

            using (Stream stream = response.GetResponseStream())
            {
                StreamReader sr = new StreamReader(stream);
                result = sr.ReadToEnd();
                sr.Close();
            }

            if (!String.IsNullOrEmpty(result))
            {
                // it's JSON so decode it
                JObject jsonResult = JObject.Parse(result);
                var accessToken = (string)jsonResult["access_token"];
                string domain = "";
                if (string.IsNullOrEmpty(accessToken) == false)
                {
                    //get shop info
                    HttpWebRequest shopInfo = (HttpWebRequest)WebRequest.Create("https://apis.haravan.com/web/shop.json");
                    shopInfo.Method = "GET";
                    shopInfo.Headers.Add("Authorization", "Bearer " + accessToken);
                    shopInfo.ContentType = "application/json";

                    var myWebResponse = shopInfo.GetResponse();
                    var responseStream = myWebResponse.GetResponseStream();
                    if (responseStream == null) return null;

                    var myStreamReader = new StreamReader(responseStream, Encoding.Default);
                    var jsonR = myStreamReader.ReadToEnd();
                    JObject json = JObject.Parse(jsonR);
                    domain = (string)json["shop"]["domain"];
                    responseStream.Close();
                    myWebResponse.Close();
                }
                return new HaravanAuthorizationState
                {
                    ShopName = domain.Replace("https://", "").Replace("http://", "").Replace("/",""),
                    AccessToken = accessToken
                };
            }
            return null;
        }
            
    }
}
