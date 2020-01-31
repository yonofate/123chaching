using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Net.Mail;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using MimeKit;
using MBN.Utils;
using Punnel.Core.Entities;
using System.Collections.ObjectModel;
using Google.Apis.Auth.OAuth2.Flows;
using log4net;
using Punnel.EmailServices.Offline;

namespace Punnel.EmailServices
{
    public class GmailPersonalSvc
    {
        private static readonly ILog _log = LogManager.GetLogger("GmailPersonalSvc");
        private string _user;
        private string _tokenJson;
        static string[] Scopes = { Google.Apis.Oauth2.v2.Oauth2Service.Scope.UserinfoProfile, Google.Apis.Oauth2.v2.Oauth2Service.Scope.UserinfoEmail, GmailService.Scope.GmailSend };
        static string GOOGLE_API_CLI = WebUtils.AppSettings("GOOGLE_CLIENT_ID", "480758365207-7l1ucohu8hkjo0icdn66b22foutibfgn.apps.googleusercontent.com");
        static string GOOGLE_API_SECRET = WebUtils.AppSettings("GOOGLE_CLIENT_SECRET", "udmCUyI0AOD-R2rQ76Rx4BzS");
        static string INTEGRATION_TOKEN_ROOT = WebUtils.AppSettings("INTEGRATION_TOKEN_ROOT", @"C:\Punnel\INTEGRATION_TOKENS");
        static string GMAIL_TOKEN_ROOT = System.IO.Path.Combine(INTEGRATION_TOKEN_ROOT, "GMAIL_TOKENS");
        public string User { get; set; }
        UserCredential credential;
        FileTokenUtils fileToken;
        public GmailPersonalSvc(string email,string tokenJson="")
        {
            _user = email;
            _tokenJson = tokenJson;
            fileToken = new FileTokenUtils(GMAIL_TOKEN_ROOT, _user);
        }
        public ApiResponse Auth()
        {
            ApiResponse res = new ApiResponse();
            if (string.IsNullOrEmpty(_user))
            {
                _log.Error("chưa có token");
                res.Message = string.Format(Punnel.Core.Entities.Resources.Messages.Gmail_Expired, _user);
                return res;
            }

            var jsonToken = fileToken.GetRefreshToken();
            //chưa có token
            if (jsonToken == null && _tokenJson.Length > 0)
            {
                fileToken.SaveToken(_tokenJson);
            }else if(jsonToken == null && _tokenJson.Length == 0)
            {
                _log.Error("chưa có token google");
                res.Message = string.Format(Punnel.Core.Entities.Resources.Messages.Gmail_Expired, _user);
                return res;
            }

            try
            {
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(new GoogleAuthorizationCodeFlow.Initializer
                {
                    ClientSecrets = new ClientSecrets
                    {
                        ClientId = GOOGLE_API_CLI,
                        ClientSecret = GOOGLE_API_SECRET
                    },
                    Scopes = Scopes,
                    DataStore = new FileDataStore(GMAIL_TOKEN_ROOT, true)
                 }, Scopes, _user, CancellationToken.None, new FileDataStore(GMAIL_TOKEN_ROOT, true)).Result;

                if (credential.Token.IsExpired(Google.Apis.Util.SystemClock.Default))
                {
                    var refreshResult = credential.RefreshTokenAsync(CancellationToken.None).Result;

                    //check lại
                    jsonToken = fileToken.GetRefreshToken();
                    if (jsonToken == null && _tokenJson.Length > 0)
                    {
                        fileToken.SaveToken(_tokenJson);
                        credential = GoogleWebAuthorizationBroker.AuthorizeAsync(new GoogleAuthorizationCodeFlow.Initializer
                        {
                            ClientSecrets = new ClientSecrets
                            {
                                ClientId = GOOGLE_API_CLI,
                                ClientSecret = GOOGLE_API_SECRET
                            },
                            Scopes = Scopes,
                            DataStore = new FileDataStore(GMAIL_TOKEN_ROOT, true)
                        }, Scopes, _user, CancellationToken.None, new FileDataStore(GMAIL_TOKEN_ROOT, true)).Result;
                    }
                }

                _log.Info(credential.Token.AccessToken);
                if (credential.Token != null && credential.Token.AccessToken.Length > 0)
                {
                    res.Data = fileToken.GetRefreshToken();
                    res.Code = System.Net.HttpStatusCode.OK;
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = string.Format(Punnel.Core.Entities.Resources.Messages.Gmail_Expired, _user);
            }
            return res;
        }

        public ApiResponse SendMail(string subject, string htmlBody, MailAddress to, MailAddress from)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                _log.Info(from);
                var r= this.Auth();

                if (r.Code != System.Net.HttpStatusCode.OK) return r;
                var service = new GmailService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "Punnel",
                });
                var message = new MimeMessage();
                message.To.Add(new MailboxAddress(to.Address));
                message.Subject = subject;
                message.From.Add(new MailboxAddress(from.DisplayName, from.Address));
                var builder = new BodyBuilder();
                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();

                Message gmail_msg = new Message();
                gmail_msg.Raw = Base64UrlEncode(message);
                var result = service.Users.Messages.Send(gmail_msg, "me").Execute();
                res.Code = System.Net.HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                res.Message = ex.Message;
            }
            return res;
        }

        private static string Base64UrlEncode(MimeMessage message)
        {
            using (var stream = new MemoryStream())
            {
                message.WriteTo(stream);
                return Convert.ToBase64String(stream.GetBuffer(), 0, (int)stream.Length)
                    .Replace('+', '-')
                    .Replace('/', '_')
                    .Replace("=", "");
            }
        }
    }

    public class GoogleApiToken
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
        public int expires_in { get; set; }
        public string scope { get; set; }
        public string id_token { get; set; }
        public DateTime Issued { get; set; }
        public DateTime IssuedUtc { get; set; }
        public string refresh_token { get; set; }
    }
}
