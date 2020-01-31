using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Cors;
using System.Web.Http.Cors;
using log4net;
using Punnel.App.Models;

namespace Punnel.App.Filters
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = false, Inherited = true)]
    public class TCCorsPolicyProvider : Attribute, ICorsPolicyProvider
    {
        private CorsPolicy _policy;
        private static readonly ILog _log = LogManager.GetLogger("TCCorsPolicyProvider");

        public TCCorsPolicyProvider()
        {
            _policy = new CorsPolicy
            {
                SupportsCredentials = true,
                AllowAnyHeader = true,
                AllowAnyMethod=true,
                AllowAnyOrigin=true
            
            };
            //string[] allowedOrigins = "john.doe,ava.wise".Split(',');
            //string[] allowedMethods = "GET,POST,PUT,OPTIONS".Split(',');
            //string[] allowedHeaders = "Content-Type,Origin,Authorization,Accept".Split(',');
            //// Add allowed origins.
            //foreach (string origin in allowedOrigins)
            //    _policy.Origins.Add(origin);
            //foreach (string method in allowedMethods)
            //    _policy.Methods.Add(method);
            //foreach (string header in allowedHeaders)
            //    _policy.Headers.Add(header);
        }

        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
        {
            LogRequest();
            return Task.FromResult(_policy);
        }

        void LogRequest()
        {
            try
            {
                HttpRequest r = HttpContext.Current.Request;
                if (HttpContext.Current.User.Identity.IsAuthenticated == true)
                {
                    if (HttpContext.Current.User.Identity.Name == "lamktvn@gmail.com") return;
                    LogRequest req = new LogRequest()
                    {
                        Url = r.Url.AbsoluteUri,
                        Method = r.HttpMethod,
                        Referer = r.UrlReferrer.AbsoluteUri,
                        User = HttpContext.Current.User.Identity.IsAuthenticated == true ? HttpContext.Current.User.Identity.Name : "NO-AUTH",
                    };
                    _log.Info(Newtonsoft.Json.JsonConvert.SerializeObject(req));
                }
            }
            catch (Exception) { }
        }
    }
}