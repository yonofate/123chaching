using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Punnel.Cdn
{
    public static class WebApiConfig
    {
        //http://imageresizing.net/docs/v4/plugins/cloudfront
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services            
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
