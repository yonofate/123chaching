using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Google.Apis.Auth.OAuth2.Mvc;
using Google.Apis.Gmail.v1;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using log4net;
using MBN.Utils;
using Punnel.Core.BLL.Repositories;
using Punnel.EmailServices;

namespace Punnel.App.Controllers
{
    public class IntegrationApiController : BaseController
    {
        private static readonly ILog _log = LogManager.GetLogger("IntegrationApiController");
        public IntegrationApiController(IUow uow) : base(uow) { }
        static string INTEGRATION_TOKEN_ROOT = WebUtils.AppSettings("INTEGRATION_TOKEN_ROOT", @"C:\Punnel\INTEGRATION_TOKENS");
        // GET: Integration

        [NonAction]
        void ChangeFileName(string folderToken, string email)
        {
            string a = "Google.Apis.Auth.OAuth2.Responses.TokenResponse-" + email;
            string source = System.IO.Path.Combine(INTEGRATION_TOKEN_ROOT, folderToken, "Google.Apis.Auth.OAuth2.Responses.TokenResponse-" + Session["uid"].ToString());
            string desc = System.IO.Path.Combine(INTEGRATION_TOKEN_ROOT, folderToken, a);
            if (System.IO.File.Exists(desc))
            {
                if (IsExpiredToken(email, folderToken))
                {
                    System.IO.File.Delete(desc);
                    System.IO.File.Move(source, desc);
                }
                else
                {
                    System.IO.File.Delete(source);
                }              
            }
            else System.IO.File.Move(source, desc);
        }

        [NonAction]
        bool IsExpiredToken(string email, string folder)
        {
            string a = "Google.Apis.Auth.OAuth2.Responses.TokenResponse-" + email;
            string desc = System.IO.Path.Combine(INTEGRATION_TOKEN_ROOT, folder, a);
            if (System.IO.File.Exists(desc) == false) return true;
            var txt = System.IO.File.ReadAllText(desc);
            var token = Newtonsoft.Json.JsonConvert.DeserializeObject<GoogleApiToken>(txt);
            if (string.IsNullOrEmpty(token.refresh_token) == false) return false;
            //else if (token.IssuedUtc.AddSeconds(token.expires_in) > DateTime.UtcNow) return false;
            return true;
        }

        public async Task<ActionResult> GAuth(CancellationToken cancellationToken, string uid)
        {
            Session["uid"] = uid;
            var result = await new AuthorizationCodeMvcApp(this, new AppFlowMetadata()).
                AuthorizeAsync(cancellationToken);

            if (result.Credential != null)
            {
                var oauthSerivce = new Google.Apis.Oauth2.v2.Oauth2Service(
                new BaseClientService.Initializer()
                {
                    HttpClientInitializer = result.Credential,
                    ApplicationName = "Punnel",
                });

                var profile = await oauthSerivce.Userinfo.Get().ExecuteAsync();

                ViewData["email"] = profile.Email;
                ViewData["uid"] = uid;
                return View();
            }
            else
            {
                _log.Error(result.RedirectUri);
                return new RedirectResult(result.RedirectUri);
            }
        }

        public async Task<ActionResult> GSheetAuth(CancellationToken cancellationToken, string uid)
        {
            Session["uid"] = uid;
            var result = await new AuthorizationCodeMvcApp(this, new AppSheetFlowMetadata()).
                AuthorizeAsync(cancellationToken);

            if (result.Credential != null)
            {
                var oauthSerivce = new Google.Apis.Oauth2.v2.Oauth2Service(
                new BaseClientService.Initializer()
                {
                    HttpClientInitializer = result.Credential,
                    ApplicationName = "Punnel",
                });

                var userInfo = await oauthSerivce.Userinfo.Get().ExecuteAsync();
                ViewData["email"] = userInfo.Email;
                ViewData["uid"] = uid;
                //ChangeFileName("GOOGLE_SHEET_TOKENS", userInfo.Email);
                return View();
            }
            else
            {
                return new RedirectResult(result.RedirectUri);
            }
        }

        public async Task<ActionResult> ShopifyAuth()
        {
            var qs = Request.QueryString;
            var code = Request.QueryString["code"];
            string myShopifyUrl = Request.QueryString["shop"];
            if (string.IsNullOrEmpty(code))
            {
                var authUrl = _uow.Integration.Shopify_BuildPageAuthUri(myShopifyUrl);
                return Redirect(authUrl.ToString());
            }
            string accessToken = await _uow.Integration.Shopify_GetAccessToken(qs);
            ViewBag.AccessToken = accessToken;
            ViewBag.ShopUrl = myShopifyUrl;
            ViewBag.Hmac = Request.QueryString["signature"];
            return View();
        }

        public async Task<ActionResult> HaravanAuth(FormCollection frm)
        {
            var code = frm["code"];
            string access_token = Request.QueryString["access_token"];
            if (!string.IsNullOrEmpty(access_token))
            {
                ViewBag.AccessToken = access_token;
                return View();
            }
            var res = await _uow.Integration.Haravan_GetAccessToken(code);
            ViewBag.AccessToken = res.Item1;
            ViewBag.ShopUrl = res.Item2;
            ViewBag.Hmac = Request.QueryString["signature"];
            return View();
        }

        public async Task<ActionResult> HaravanInstall(FormCollection frm)
        {
            return View();
        }

        public async Task<ActionResult> SapoAuth()
        {
            try
            {
                var qs = Request.QueryString;
                var code = Request.QueryString["code"];
                string myShopifyUrl = Request.QueryString["store"];
                if (string.IsNullOrEmpty(code))
                {
                    _log.WarnFormat("sapo info shop: myShopifyUrl={0}", myShopifyUrl);
                    var authUrl = _uow.Integration.Sapo_BuildPageAuthUri(myShopifyUrl);
                    return Redirect(authUrl.ToString());
                }

                string accessToken = await _uow.Integration.Sapo_GetAccessToken(qs);
                _log.WarnFormat("sapo info: code={0}, qs={1}, token={2}", code, qs, accessToken);
                ViewBag.AccessToken = accessToken;
                ViewBag.ShopUrl = myShopifyUrl;
                ViewBag.Hmac = Request.QueryString["hmac"];
                //ViewBag.Fr = Request.QueryString["fr"];
            }catch(Exception ex)
            {
                _log.Error(ex);
            }
            return View();
        }

        public async Task<ActionResult> InfusionsoftInstall(string code)
        {
            ViewBag.Code = code;
            return View();
        }
    }

    

    public class AuthCallbackController : Google.Apis.Auth.OAuth2.Mvc.Controllers.AuthCallbackController
    {
        protected override Google.Apis.Auth.OAuth2.Mvc.FlowMetadata FlowData
        {
            get { return new AppFlowMetadata(); }
        }
    }

    public class AuthSheetCallbackController : Google.Apis.Auth.OAuth2.Mvc.Controllers.AuthCallbackController
    {
        protected override Google.Apis.Auth.OAuth2.Mvc.FlowMetadata FlowData
        {
            get { return new AppSheetFlowMetadata(); }
        }
    }
}