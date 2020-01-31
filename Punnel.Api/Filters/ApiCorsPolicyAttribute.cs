using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace Punnel.Api.Filters
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = false, Inherited = true)]
    public class TCCorsPolicyProvider : Attribute, ICorsPolicyProvider
    {
        private CorsPolicy _policy;

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
            return Task.FromResult(_policy);
        }
    }
}