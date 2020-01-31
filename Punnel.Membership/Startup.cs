using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Punnel.Membership.Startup))]
namespace Punnel.Membership
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
