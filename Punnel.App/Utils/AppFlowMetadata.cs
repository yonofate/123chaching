using System;
using System.Web.Mvc;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Mvc;
using Google.Apis.Gmail.v1;
using Google.Apis.Sheets.v4;
using Google.Apis.Util.Store;
using log4net;
using MBN.Utils;

namespace Punnel.App
{
    public class AppFlowMetadata : FlowMetadata
    {
        private static readonly ILog _log = LogManager.GetLogger("AppFlowMetadata");
        static string GOOGLE_API_CLI = WebUtils.AppSettings("GOOGLE_CLIENT_ID", "480758365207-7l1ucohu8hkjo0icdn66b22foutibfgn.apps.googleusercontent.com");
        static string GOOGLE_API_SECRET = WebUtils.AppSettings("GOOGLE_CLIENT_SECRET", "udmCUyI0AOD-R2rQ76Rx4BzS");
        static string INTEGRATION_TOKEN_ROOT = WebUtils.AppSettings("INTEGRATION_TOKEN_ROOT", @"C:\Punnel\INTEGRATION_TOKENS");
        static string GMAIL_TOKEN_ROOT = System.IO.Path.Combine(INTEGRATION_TOKEN_ROOT, "GMAIL_TOKENS");

        private static readonly IAuthorizationCodeFlow flow =
            new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = GOOGLE_API_CLI,
                    ClientSecret = GOOGLE_API_SECRET
                },
                Scopes = new[] { Google.Apis.Oauth2.v2.Oauth2Service.Scope.UserinfoProfile, Google.Apis.Oauth2.v2.Oauth2Service.Scope.UserinfoEmail, GmailService.Scope.GmailSend },
                DataStore = new FileDataStore(GMAIL_TOKEN_ROOT, true)
            });
        public override string GetUserId(Controller controller)
        {
            // In this sample we use the session to store the user identifiers.
            // That's not the best practice, because you should have a logic to identify
            // a user. You might want to use "OpenID Connect".
            // You can read more about the protocol in the following link:
            // https://developers.google.com/accounts/docs/OAuth2Login.
            var user = controller.Session["uid"];
            
            if (user == null)
            {
                user = Guid.NewGuid().ToString();
                controller.Session["uid"] = user;
            }
            return user.ToString();
        }

        public override IAuthorizationCodeFlow Flow
        {
            get { return flow; }
        }

        public override string AuthCallback
        {
            get
            {
                return @"/AuthCallback/IndexAsync";
            }
        }
    }

    public class AppSheetFlowMetadata : FlowMetadata
    {
        static string GOOGLE_API_CLI = WebUtils.AppSettings("GOOGLE_CLIENT_ID", "480758365207-7l1ucohu8hkjo0icdn66b22foutibfgn.apps.googleusercontent.com");
        static string GOOGLE_API_SECRET = WebUtils.AppSettings("GOOGLE_CLIENT_SECRET", "udmCUyI0AOD-R2rQ76Rx4BzS");
        static string INTEGRATION_TOKEN_ROOT = WebUtils.AppSettings("INTEGRATION_TOKEN_ROOT", @"C:\Punnel\INTEGRATION_TOKENS");
        static string SHEET_TOKEN_ROOT = System.IO.Path.Combine(INTEGRATION_TOKEN_ROOT, "GOOGLE_SHEET_TOKENS");
        private static readonly IAuthorizationCodeFlow flow =
            new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = GOOGLE_API_CLI,
                    ClientSecret = GOOGLE_API_SECRET
                },
                Scopes = new[] { Google.Apis.Oauth2.v2.Oauth2Service.Scope.UserinfoProfile, Google.Apis.Oauth2.v2.Oauth2Service.Scope.UserinfoEmail, SheetsService.Scope.Spreadsheets },
                DataStore = new FileDataStore(SHEET_TOKEN_ROOT, true)
            });

        public override string GetUserId(Controller controller)
        {
            // In this sample we use the session to store the user identifiers.
            // That's not the best practice, because you should have a logic to identify
            // a user. You might want to use "OpenID Connect".
            // You can read more about the protocol in the following link:
            // https://developers.google.com/accounts/docs/OAuth2Login.
            var user = controller.Session["uid"];
            if (user == null)
            {
                user = Guid.NewGuid();
                controller.Session["uid"] = user;
            }
            return user.ToString();

        }

        public override IAuthorizationCodeFlow Flow
        {
            get { return flow; }
        }

        public override string AuthCallback
        {
            get
            {
                return @"/AuthSheetCallback/IndexAsync";
            }
        }
    }
}