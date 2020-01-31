using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using Punnel.Api.Models;

[assembly: OwinStartup(typeof(Punnel.Api.Startup))]
namespace Punnel.Api
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            ConfigureOAuth(app);
            log4net.Config.XmlConfigurator.Configure();
            var idProvider = new CustomUserIdProvider();

            GlobalHost.Configuration.ConnectionTimeout = new TimeSpan(0, 0, 110);
            GlobalHost.Configuration.DisconnectTimeout = new TimeSpan(0, 0, 30);
            GlobalHost.Configuration.KeepAlive = new TimeSpan(0, 0, 10);

            GlobalHost.DependencyResolver.Register(typeof(IUserIdProvider), () => idProvider);
            GlobalHost.Configuration.DefaultMessageBufferSize = 500;
            app.Map("/signalr", map =>
            {
                // Setup the CORS middleware to run before SignalR.
                // By default this will allow all origins. You can 
                // configure the set of origins and/or http verbs by
                // providing a cors options with a different policy.
                map.UseCors(CorsOptions.AllowAll);
                var hubConfiguration = new HubConfiguration
                {
                    // You can enable JSONP by uncommenting line below.
                    // JSONP requests are insecure but some older browsers (and some
                    // versions of IE) require JSONP to work cross domain
                    EnableJSONP = true
                };
                // Run the SignalR pipeline. We're not using MapSignalR
                // since this branch already runs under the "/signalr"
                // path.
                map.RunSignalR(hubConfiguration);
            });
        }
    }
}