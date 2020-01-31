using Microsoft.Owin.Security.Facebook;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Punnel.App.Providers
{
    public class FacebookAuthProvider : FacebookAuthenticationProvider
    {
        public override Task Authenticated(FacebookAuthenticatedContext context)
        {
            context.Identity.AddClaim(new Claim("ExternalAccessToken", context.AccessToken));
            context.Identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, context.Id));
            //context.Identity.AddClaim(new Claim(ClaimTypes.Email, context.Email));
            return Task.FromResult<object>(null);
        }
    }
}