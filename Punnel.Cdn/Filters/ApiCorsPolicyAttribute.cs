using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace Punnel.Cdn.Filters
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
        }

        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
        {
            return Task.FromResult(_policy);
        }
    }
}