using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using Newtonsoft.Json;
using RestSharp;

namespace HaravanAPIAdapterLibrary
{
    /// <summary>
    /// This class is used to make Haravan API calls 
    /// </summary>
    /// <remarks>
    /// You will first need to use the HaravanAPIAuthorizer to obtain the required authorization.
    /// </remarks>
    /// <seealso cref="http://api.haravan.com/"/>
    public class HaravanAPIClient
    {
        /// <summary>
        /// Creates an instance of this class for use with making API Calls
        /// </summary>
        /// <param name="state">the authorization state required to make the API Calls</param>
        public HaravanAPIClient(HaravanAuthorizationState state)
        {
            this.State = state;
        }

        /// <summary>
        /// Creates an instance of this class for use with making API Calls
        /// </summary>
        /// <param name="state">the authorization state required to make the API Calls</param>
        /// <param name="translator">the translator used to transform the data between your C# client code and the Haravan API</param>
        public HaravanAPIClient(HaravanAuthorizationState state, IDataTranslator translator)
        {
            this.State = state;
            this.Translator = translator;
        }

        /// <summary>
        /// Make an HTTP Request to the Haravan API
        /// </summary>
        /// <param name="method">method to be used in the request</param>
        /// <param name="path">the path that should be requested</param>
        /// <seealso cref="http://api.haravan.com/"/>
        /// <returns>the server response</returns>
        public object Call(Method method, string path)
        {
            return Call(method, path, null);
        }

        /// <summary>
        /// Make an HTTP Request to the Haravan API
        /// </summary>
        /// <param name="method">method to be used in the request</param>
        /// <param name="path">the path that should be requested</param>
        /// <param name="callParams">any parameters needed or expected by the API</param>
        /// <seealso cref="http://api.haravan.com/"/>
        /// <returns>the server response</returns>
        public object Call1(HttpMethods method, string path, object callParams)
        {
            string url = String.Format("https://{0}.myharavan.com{1}", State.ShopName, path);
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.ContentType = GetRequestContentType();
            request.Headers.Add("Authorization", "bearer " + this.State.AccessToken);
            request.Method = method.ToString();
            if (callParams != null)
            {
                if (method == HttpMethods.GET || method == HttpMethods.DELETE)
                {
                    // if no translator assume data is a query string
                    url = String.Format("{0}?{1}", url, callParams.ToString());

                    //// put params into query string
                    //StringBuilder queryString = new StringBuilder();
                    //foreach (string key in callParams.Keys)
                    //{
                    //    queryString.AppendFormat("{0}={1}", HttpUtility.UrlEncode(key), HttpUtility.UrlEncode(callParams[key]));
                    //}
                }
                else if (method == HttpMethods.POST || method == HttpMethods.PUT)
                {
                    string requestBody;
                    // put params into post body
                    if (Translator == null)
                    {
                        //assume it's a string
                        requestBody = callParams.ToString();
                    }
                    else
                    {
                        requestBody = Translator.Encode(callParams);
                    }

                    //add the requst body to the request stream
                    if (!String.IsNullOrEmpty(requestBody))
                    {
                        using (var ms = new MemoryStream())
                        {
                            using (var writer = new StreamWriter(request.GetRequestStream()))
                            {
                                writer.Write(requestBody);
                                writer.Close();
                            }
                        }
                    }
                }
            }

            var response = (HttpWebResponse)request.GetResponse();
            string result = null;

            using (Stream stream = response.GetResponseStream())
            {
                StreamReader sr = new StreamReader(stream);
                result = sr.ReadToEnd();
                sr.Close();
            }

            //At least one endpoint will return an empty string, that we need to account for.
            if (string.IsNullOrWhiteSpace(result))
                return null;

            if (Translator != null)
                return Translator.Decode(result);

            return result;

        }

        public object Call(Method method, string path, object callParams)
        {
            var request = new RestRequest(method);
            //string url = String.Format("https://{0}.myharavan.com{1}", State.ShopName, path);
            string url = String.Format("https://apis.haravan.com{0}", path);
            if (callParams != null)
            {
                if (method == Method.GET || method == Method.DELETE)
                {
                    // if no translator assume data is a query string
                    url = String.Format("{0}?{1}", url, callParams.ToString());

                }
                else if (method == Method.POST || method == Method.PUT)
                {
                    request.AddParameter("application/json", JsonConvert.SerializeObject(callParams), ParameterType.RequestBody);
                }
            }

            var client = new RestClient(url);
            request.AddHeader("content-type", "application/json");
            //request.AddHeader("host", $"{this.State.ShopName}.myharavan.com");
            request.AddHeader("authorization", "bearer " + this.State.AccessToken);
            IRestResponse response = client.Execute(request);
            string result = null;
            if (response.StatusCode == System.Net.HttpStatusCode.OK || response.StatusCode == System.Net.HttpStatusCode.Created || response.StatusCode == System.Net.HttpStatusCode.Accepted)
            {
                result = response.Content;
            }
            //At least one endpoint will return an empty string, that we need to account for.
            if (string.IsNullOrWhiteSpace(result))
                return null;

            if (Translator != null)
                return Translator.Decode(result);

            return result;
        }

        /// <summary>
        /// Make a Get method HTTP request to the Haravan API
        /// </summary>
        /// <param name="path">the path where the API call will be made.</param>
        /// <seealso cref="http://api.haravan.com/"/>
        /// <returns>the server response</returns>
        public object Get(string path)
        {
            return Get(path, null);
        }

        /// <summary>
        /// Make a Get method HTTP request to the Haravan API
        /// </summary>
        /// <param name="path">the path where the API call will be made.</param>
        /// <param name="callParams">the querystring params</param>
        /// <seealso cref="http://api.haravan.com/"/>
        /// <returns>the server response</returns>
        public object Get(string path, NameValueCollection callParams)
        {
            return Call(Method.GET, path, callParams);
        }

        /// <summary>
        /// Make a Post method HTTP request to the Haravan API
        /// </summary>
        /// <param name="path">the path where the API call will be made.</param>
        /// <param name="data">the data that this path will be expecting</param>
        /// <seealso cref="http://api.haravan.com/"/>
        /// <returns>the server response</returns>
        public object Post(string path, object data)
        {
            return Call(Method.POST, path, data);
        }

        /// <summary>
        /// Make a Put method HTTP request to the Haravan API
        /// </summary>
        /// <param name="path">the path where the API call will be made.</param>
        /// <param name="data">the data that this path will be expecting</param>
        /// <seealso cref="http://api.haravan.com/"/>
        /// <returns>the server response</returns>
        public object Put(string path, object data)
        {
            return Call(Method.PUT, path, data);
        }

        /// <summary>
        /// Make a Delete method HTTP request to the Haravan API
        /// </summary>
        /// <param name="path">the path where the API call will be made.</param>
        /// <seealso cref="http://api.haravan.com/"/>
        /// <returns>the server response</returns>
        public object Delete(string path)
        {
            return Call(Method.DELETE, path);
        }

        /// <summary>
        /// Get the content type that should be used for HTTP Requests
        /// </summary>
        private string GetRequestContentType()
        {
            if (Translator == null)
                return DefaultContentType;
            return Translator.GetContentType();
        }

        /// <summary>
        /// The enumeration of HTTP Methods used by the API
        /// </summary>
        public enum HttpMethods
        {
            GET,
            POST,
            PUT,
            DELETE
        }

        /// <summary>
        /// The default content type used on the HTTP Requests to the Haravan API
        /// </summary>
        protected static readonly string DefaultContentType = "application/json";

        /// <summary>
        /// The state required to make API calls.  It contains the access token and
        /// the name of the shop that your app will make calls on behalf of
        /// </summary>
        protected HaravanAuthorizationState State { get; set; }

        /// <summary>
        /// Used to translate the data sent and recieved by the Haravan API
        /// </summary>
        /// <example>
        /// This could be used to translate from C# objects to XML or JSON.  Thus making your code
        /// that consumes this class much more clean
        /// </example>
        protected IDataTranslator Translator { get; set; }
    }


}
