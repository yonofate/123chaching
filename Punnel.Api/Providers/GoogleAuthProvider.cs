using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Owin;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System.Threading.Tasks;
using System.Security.Claims;

namespace Punnel.Api.Providers
{
    public class GoogleAuthProvider : IGoogleOAuth2AuthenticationProvider
    {
        public void ApplyRedirect(GoogleOAuth2ApplyRedirectContext context)
        {
            context.Response.Redirect(context.RedirectUri);
        }

        public Task Authenticated(GoogleOAuth2AuthenticatedContext context)
        {
            context.Identity.AddClaim(new Claim("ExternalAccessToken", context.AccessToken));
            context.Identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, context.Id));
            //context.Identity.AddClaim(new Claim(ClaimTypes.Name, context.Email));
            //context.Identity.AddClaim(new Claim(ClaimTypes.Email, context.Email));
            //context.Identity.AddClaim(new Claim(ClaimTypes.Surname, context.GivenName));
            //context.Identity.AddClaim(new Claim(ClaimTypes.GivenName, context.FamilyName));
            return Task.FromResult<object>(null);
        }

        public Task ReturnEndpoint(GoogleOAuth2ReturnEndpointContext context)
        {
            return Task.FromResult<object>(null);
        }
    }
}