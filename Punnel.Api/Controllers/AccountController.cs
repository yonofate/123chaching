using Punnel.Api.Models;
using Punnel.Api.Results;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.ViewModel;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Punnel.Core.BLL;
using System.Web.Http;
using System.Net.Http;
using log4net;
using MBN.Utils;

namespace Punnel.Api.Controllers
{
    [RoutePrefix("api/auth")]
    public class AccountController : BaseApiController
    {
        private static readonly string ZALO_APP_ID = WebUtils.AppSettings("ZALO_APP_ID", "3253505469606898301");
        private static readonly string ZALO_APP_CALLBACK = WebUtils.AppSettings("ZALO_APP_CALLBACK", "http://localhost:2171/authZaloComplete.html");
        private static readonly ILog _log = LogManager.GetLogger("AccountController");
        internal AuthRepository _repoUser = null;
        public AccountController(IUow uow) : base(uow)
        {
            _repoUser = new AuthRepository();
        }

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        [AllowAnonymous]
        [Route("check-ref")]
        public async Task<IHttpActionResult> CheckReferral(ReferralCodeModel model)
        {
            try
            {
                var res = _uow.UserProfile.ReferralCode_Validate(model.Code);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("sign-up")]
        public async Task<IHttpActionResult> Register(UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _uow.UserProfile.ValidateUserBeforeUI(userModel.Email, userModel.Mobile);
                IdentityResult result = await _repoUser.RegisterUser(userModel);

                IHttpActionResult errorResult = GetErrorResult(result);

                if (errorResult != null)
                {
                    return BadRequest("Email hoặc số điện thoại này đã được đăng kí");
                }
                var user = await _repoUser.FindByNameAsync(userModel.Email);

                //await _repoUser.SetPhoneNumberAsync(user.Id, userModel.Mobile);
                await _repoUser.AddClaimAsync(user.Id, new Claim("FullName", userModel.FullName));
                await _repoUser.AddClaimAsync(user.Id, new Claim("Level", ((int)ProfileLevel.Trial).ToString()));
                await _repoUser.AddRoleAsync(user.Id, Conts.Role_Member);

                await _uow.UserProfile.IU(new Core.Entities.Model.UserProfile()
                {
                    Id = user.Id,
                    Mobile = userModel.Mobile,
                    FullName = userModel.FullName,
                    Email = userModel.Email
                });


                //Nếu đăng kí từ nguồn referral
                if (!string.IsNullOrEmpty(userModel.Ref))
                {
                    var owner = _uow.UserProfile.GetByReferralCode(userModel.Ref);
                    if (owner != null)
                    {
                        _uow.AffilateAction.AddNew(new Core.Entities.Model.AffilateAction()
                        {
                            UserId = user.Id,
                            OwnerId = owner.Id
                        });
                    }
                }
                var accessTokenResponse = GenerateLocalAccessTokenResponse(user);
                return Ok(accessTokenResponse);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(this.General_Err);
            }
        }

        [AllowAnonymous]
        [Route("forgot-password")]
        public async Task<IHttpActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            //Send email to email
            try
            {
                var user = await _repoUser.FindByNameAsync(model.Email);
                if (user == null)
                {
                    return BadRequest("Email này chưa được đăng kí, bạn vui lòng kiểm tra lại!");
                }
                _uow.UserProfile.ForgetPass(user.Id);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [AllowAnonymous]
        [Route("validate-link-resetpass")]
        public async Task<IHttpActionResult> ResetPassword(LinkNewPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Thông tin cung cấp không hợp lệ");
            }

            try
            {
                var res = _uow.Token.Verify(new Core.Entities.Model.Token()
                {
                    UserId = model.UserId,
                    Id = model.Code
                });

                return Ok(res);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [Route("send-verify-email")]
        [HttpGet]
        [Authorize]
        public async Task<IHttpActionResult> SendVerifyEmail()
        {
            try
            {
                var user = await _repoUser.FindByNameAsync(this._CurrentUserId);
                _uow.UserProfile.SendVerifyEmail(user.Email);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [AllowAnonymous]
        [Route("verify-email")]
        public async Task<IHttpActionResult> VerifyEmail(LinkNewPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Thông tin xác thực không hợp lệ");
            }

            try
            {
                var res = _uow.Token.Verify(new Core.Entities.Model.Token()
                {
                    UserId = model.UserId,
                    Id = model.Code
                });

                if (res == true)
                {
                    await _uow.UserProfile.VerifyEmail(model.UserId);
                }

                return Ok(res);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [AllowAnonymous]
        [Route("reset-password")]
        public async Task<IHttpActionResult> ResetPassword(ResetPassViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var profile = _uow.UserProfile.Get(model.UserId);
                if (profile == null)
                {
                    return BadRequest("Thông tin bạn cung cấp không hợp lệ!");
                }
                var user = await _repoUser.FindByNameAsync(profile.Email);
                var result = await _repoUser.ResetPasswordAsync(user.Id, model.Password);

                IHttpActionResult errorResult = GetErrorResult(result);
                if (errorResult != null)
                {
                    return BadRequest(errorResult.ToString());
                }
                _uow.Token.Delete(model.Code);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        //[AllowAnonymous]
        [Route("update-password")]
        public async Task<IHttpActionResult> UpdatePassword(NewPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _repoUser.FindByNameAsync(User.Identity.Name);
            var result = await _repoUser.ResetPasswordAsync(user.Id, model.Password);

            IHttpActionResult errorResult = GetErrorResult(result);
            if (errorResult != null)
            {
                return BadRequest(errorResult.ToString());
            }
            return Ok();
        }

        // GET api/Account/ExternalLogin
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [Route("ExternalLogin", Name = "ExternalLogin")]
        public async Task<IHttpActionResult> GetExternalLogin(string provider, string error = null)
        {
            try
            {
                string redirectUri = string.Empty;

                if (error != null)
                {
                    return BadRequest(Uri.EscapeDataString(error));
                }

                if (provider == "Zalo")
                {
                    return Redirect($"https://oauth.zaloapp.com/v3/auth?app_id={ZALO_APP_ID}&redirect_uri={ZALO_APP_CALLBACK}&state=punnel2019");
                }

                if (!User.Identity.IsAuthenticated)
                {
                    return new ChallengeResult(provider, this);
                }

                var redirectUriValidationResult = ValidateClientAndRedirectUri(this.Request, ref redirectUri);

                if (!string.IsNullOrWhiteSpace(redirectUriValidationResult))
                {
                    return BadRequest(redirectUriValidationResult);
                }

                ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);
                _log.Info(externalLogin);
                if (externalLogin == null)
                {
                    return InternalServerError();
                }

                if (externalLogin.LoginProvider != provider)
                {
                    _log.Error($"provider is not valid {provider} , base provider {externalLogin.LoginProvider}");
                    Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                    return new ChallengeResult(provider, this);
                }

                // IdentityUser user = await _repoUser.FindAsync(new UserLoginInfo(externalLogin.LoginProvider, externalLogin.ProviderKey));
                //case facebook not return email

                var user = string.IsNullOrEmpty(externalLogin.Email) ? null : await _repoUser.FindByNameAsync(externalLogin.Email);
                //var profile = _uow.UserProfile.GetUserByProviderId(externalLogin.UserId, provider);
                if (user == null && string.IsNullOrEmpty(externalLogin.UserId) == false)
                {
                    var profile = _uow.UserProfile.GetUserByProviderId(externalLogin.UserId, provider);
                    user = profile == null ? null : await _repoUser.FindByNameAsync(profile.Email);
                }

                bool hasRegistered = false;
                if (user != null)
                {
                    hasRegistered = true;
                    var profile = _uow.UserProfile.Get(user.Id);
                    if (profile == null || string.IsNullOrEmpty(profile.Email)) hasRegistered = false;
                }
                if (hasRegistered == false)
                {
                    return BadRequest("Tài khoản chưa được đăng kí trên Punnel");
                }

                redirectUri = string.Format("{0}#external_access_token={1}&provider={2}&haslocalaccount={3}&external_user_name={4}&external_full_name={5}&external_email={6}",
                                                redirectUri,
                                                externalLogin.ExternalAccessToken,
                                                externalLogin.LoginProvider,
                                                hasRegistered.ToString(),
                                                externalLogin.UserName,
                                                externalLogin.FullName,
                                                externalLogin.Email);

                return Redirect(redirectUri);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                if (ex.Message != null) _log.Error(ex.Message);
                return BadRequest("Chưa thể đăng nhập bằng tài khoản liên kết lúc này, hãy thử đăng nhập bằng email hoặc số điện thoại");
            }

        }

        // POST api/Account/RegisterExternal
        [AllowAnonymous]
        [Route("RegisterExternal")]
        public async Task<IHttpActionResult> RegisterExternal(RegisterExternalBindingModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var verifiedAccessToken = await VerifyExternalAccessToken(model.Provider, model.ExternalAccessToken);
                if (verifiedAccessToken == null)
                {
                    return BadRequest("Thông tin không hợp lệ");
                }

                _uow.UserProfile.ValidateUserBeforeUI(model.Email, model.Mobile);

                IdentityUser user = await _repoUser.FindByNameAsync(model.Email);

                bool hasRegistered = user != null;

                if (hasRegistered)
                {
                    return BadRequest("Tài khoản đã được đăng kí trước đó");
                }

                user = new IdentityUser() { UserName = model.Email, Email = model.Email, PhoneNumber = model.Mobile };

                IdentityResult result = await _repoUser.CreateAsync(user);
                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }
                else
                {
                    await _repoUser.AddPasswordAsync(user.Id, model.Password);
                    await _repoUser.SetPhoneNumberAsync(user.Id, model.Mobile);
                    await _repoUser.AddClaimAsync(user.Id, new Claim("FullName", model.FullName));
                    await _repoUser.AddClaimAsync(user.Id, new Claim("Level", ((int)ProfileLevel.Trial).ToString()));
                    await _repoUser.AddRoleAsync(user.Id, Conts.Role_Member);

                    await _uow.UserProfile.IU(new Core.Entities.Model.UserProfile()
                    {
                        Id = user.Id,
                        Mobile = model.Mobile,
                        FullName = model.FullName,
                        Email = model.Email,
                        IsVerifyEmail = model.Provider == "Zalo" ? false : true,
                        Provider = model.Provider,
                        ProviderId = verifiedAccessToken.user_id
                    });

                    // Nếu đăng kí từ nguồn referral
                    if (!string.IsNullOrEmpty(model.Ref))
                    {
                        var owner = _uow.UserProfile.GetByReferralCode(model.Ref);
                        if (owner != null)
                        {
                            _uow.AffilateAction.AddNew(new Core.Entities.Model.AffilateAction()
                            {
                                UserId = user.Id,
                                OwnerId = owner.Id
                            });
                        }
                    }
                }

                var info = new ExternalLoginInfo()
                {
                    DefaultUserName = model.UserName,
                    Login = new UserLoginInfo(model.Provider, user.Id)
                };
                result = await _repoUser.AddLoginAsync(user.Id, info.Login);
                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }

                //generate access token response
                var accessTokenResponse = GenerateLocalAccessTokenResponse(user);
                return Ok(accessTokenResponse);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(this.General_Err);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ObtainLocalAccessToken")]
        public async Task<IHttpActionResult> ObtainLocalAccessToken(string provider, string externalAccessToken, string userName)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(provider) || string.IsNullOrWhiteSpace(externalAccessToken))
                {
                    return BadRequest("Provider or external access token is not sent");
                }

                var verifiedAccessToken = await VerifyExternalAccessToken(provider, externalAccessToken);
                if (verifiedAccessToken == null)
                {
                    return BadRequest("Invalid Provider or External Access Token");
                }
                ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

                //IdentityUser user = await _repoUser.FindAsync(new UserLoginInfo(provider, verifiedAccessToken.user_id));
                var user = await _repoUser.FindByNameAsync(userName);
                Core.Entities.Model.UserProfile profile = null;
                if (user == null)
                {
                    profile = _uow.UserProfile.GetUserByProviderId(externalLogin.UserId, provider);
                    user = profile == null ? null : await _repoUser.FindByNameAsync(profile.Email);
                }
                else profile = _uow.UserProfile.Get(user.Id);

                bool hasRegistered = user != null;
                //var profile = _uow.UserProfile.Get(user.Id);
                if (!hasRegistered)
                {
                    return BadRequest("Chưa đăng kí tài khoản");
                }
                else if (profile == null)
                {
                    var roles = await _repoUser.GetRolesAsync(user.Id);
                    await _uow.UserProfile.IU(new Core.Entities.Model.UserProfile()
                    {
                        Id = user.Id,
                        Email = user.Email,
                        Mobile = user.PhoneNumber,
                        Role = roles.Count > 0 ? roles.FirstOrDefault() : Conts.Role_Member,
                        UserStatus = (int)UserStatus.Done,
                        ActiveDate = DateTime.Now
                    });
                }
                //generate access token response
                var accessTokenResponse = GenerateLocalAccessTokenResponse(user);
                return Ok(accessTokenResponse);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest();
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _repoUser.Dispose();
            }

            base.Dispose(disposing);
        }

        #region Zalo
        [AllowAnonymous]
        [HttpPost]
        [Route("validate-zalo-token")]
        public async Task<IHttpActionResult> ValidateZaloToken(Core.BLL.Utils.ZaloAuthResponse data)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(data.uid) || string.IsNullOrWhiteSpace(data.code) || string.IsNullOrWhiteSpace(data.state))
                {
                    return BadRequest("Provider or external access token is not sent");
                }
                if (data.state != "punnel2019")
                {
                    return BadRequest("Token state is not valid");
                }

                var profile = _uow.UserProfile.GetByExternalId("Zalo", data.uid);

                //Neu user chua dang ki => redirect dang ki
                if (profile == null)
                {
                    var zaloProfile = new Core.BLL.Utils.ZaloUtils().GetProfile(data.code);
                    return Ok(new { status = 0, profile = zaloProfile });
                }
                else
                {
                    var user = await _repoUser.FindByNameAsync(profile.Email);
                    if (user == null)
                    {
                        return BadRequest("Profile is invalid");
                    }
                    else
                    {
                        var accessTokenResponse = GenerateLocalAccessTokenResponse(user);
                        return Ok(new { status = 1, token = accessTokenResponse });
                    }
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest();
            }
        }
        #endregion

        #region Helpers

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private string ValidateClientAndRedirectUri(HttpRequestMessage request, ref string redirectUriOutput)
        {

            Uri redirectUri;

            var redirectUriString = GetQueryString(Request, "redirect_uri");

            if (string.IsNullOrWhiteSpace(redirectUriString))
            {
                return "redirect_uri is required";
            }

            bool validUri = Uri.TryCreate(redirectUriString, UriKind.Absolute, out redirectUri);

            if (!validUri)
            {
                return "redirect_uri is invalid";
            }

            var clientId = GetQueryString(Request, "client_id");

            if (string.IsNullOrWhiteSpace(clientId))
            {
                return "client_Id is required";
            }

            //var client = _repoUser.FindClient(clientId);

            //if (client == null)
            //{
            //    return string.Format("Client_id '{0}' is not registered in the system.", clientId);
            //}

            //if (!string.Equals(client.AllowedOrigin, redirectUri.GetLeftPart(UriPartial.Authority), StringComparison.OrdinalIgnoreCase))
            //{
            //    return string.Format("The given URL is not allowed by Client_id '{0}' configuration.", clientId);
            //}

            redirectUriOutput = redirectUri.AbsoluteUri;

            return string.Empty;

        }

        private string GetQueryString(HttpRequestMessage request, string key)
        {
            var queryStrings = request.GetQueryNameValuePairs();

            if (queryStrings == null) return null;

            var match = queryStrings.FirstOrDefault(keyValue => string.Compare(keyValue.Key, key, true) == 0);

            if (string.IsNullOrEmpty(match.Value)) return null;

            return match.Value;
        }

        private async Task<ParsedExternalAccessToken> VerifyExternalAccessToken(string provider, string accessToken)
        {
            ParsedExternalAccessToken parsedToken = null;

            var verifyTokenEndPoint = "";

            if (provider == "Facebook")
            {
                //You can get it from here: https://developers.facebook.com/tools/accesstoken/
                //More about debug_tokn here: http://stackoverflow.com/questions/16641083/how-does-one-get-the-app-access-token-for-debug-token-inspection-on-facebook
                var appToken = Core.Utils.ConfigSettings.Get("FACEBOOK_APP_TOKEN", "370027363509032|fSFT-7JA_Gzswojp5Rl5on8hUvo");// "483985835067602|_C4qSBFWgJHefHrbasrduvpjog8");
                verifyTokenEndPoint = string.Format("https://graph.facebook.com/debug_token?input_token={0}&access_token={1}", accessToken, appToken);
            }
            else if (provider == "Google")
            {
                verifyTokenEndPoint = string.Format("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={0}", accessToken);
            }
            else if (provider == "Zalo")
            {
                var zaloProfile = new Core.BLL.Utils.ZaloUtils().GetProfile(accessToken);
                return new ParsedExternalAccessToken()
                {
                    user_id = zaloProfile.id,
                    user_name = zaloProfile.id
                };
            }
            else
            {
                return null;
            }

            _log.InfoFormat("uri ext login: {0}", verifyTokenEndPoint);
            var client = new HttpClient();
            var uri = new Uri(verifyTokenEndPoint);
            var response = await client.GetAsync(uri);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();

                dynamic jObj = (JObject)Newtonsoft.Json.JsonConvert.DeserializeObject(content);

                parsedToken = new ParsedExternalAccessToken();

                if (provider == "Facebook")
                {
                    _log.Warn(jObj);
                    parsedToken.user_id = jObj["data"]["user_id"];
                    parsedToken.app_id = jObj["data"]["app_id"];
                    //parsedToken.user_name = jObj["email"];
                    if (!string.Equals(Startup.facebookAuthOptions.AppId, parsedToken.app_id, StringComparison.OrdinalIgnoreCase))
                    {
                        return null;
                    }
                }
                else if (provider == "Google")
                {
                    parsedToken.user_id = jObj["user_id"];
                    parsedToken.user_name = jObj["email"];
                    parsedToken.app_id = jObj["audience"];

                    if (!string.Equals(Startup.googleAuthOptions.ClientId, parsedToken.app_id, StringComparison.OrdinalIgnoreCase))
                    {
                        return null;
                    }

                }

            }

            return parsedToken;
        }

        private JObject GenerateLocalAccessTokenResponse(IdentityUser user)
        {

            var tokenExpiration = TimeSpan.FromDays(30);

            ClaimsIdentity identity = new ClaimsIdentity(OAuthDefaults.AuthenticationType);

            identity.AddClaim(new Claim(ClaimTypes.Name, user.UserName));
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));

            //Set Roles
            var roles = user.Roles.ToList();
            if (roles.Count == 0)
            {
                using (AuthRepository _repo = new AuthRepository())
                {
                    _repo.AddRole(user.Id, Core.Entities.Conts.Role_Member);
                }
                roles = user.Roles.ToList();
            }

            foreach (var role in roles)
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, role.RoleId));
            }


            var props = new AuthenticationProperties()
            {
                IssuedUtc = DateTime.UtcNow,
                ExpiresUtc = DateTime.UtcNow.Add(tokenExpiration),
            };

            var ticket = new AuthenticationTicket(identity, props);

            var accessToken = Startup.OAuthBearerOptions.AccessTokenFormat.Protect(ticket);

            JObject tokenResponse = new JObject(
                                        new JProperty("user_id", user.Id),
                                        new JProperty("access_token", accessToken),
                                        new JProperty("token_type", "bearer"),
                                        //new JProperty("role", roles.FirstOrDefault().RoleId),
                                        new JProperty("expires_in", tokenExpiration.TotalSeconds.ToString()),
                                        new JProperty(".issued", ticket.Properties.IssuedUtc.ToString()),
                                        new JProperty(".expires", ticket.Properties.ExpiresUtc.ToString())
            );
            return tokenResponse;
        }

        private class ExternalLoginData
        {
            public string LoginProvider { get; set; }
            public string ProviderKey { get; set; }
            public string UserId { get; set; }
            public string UserName { get; set; }
            public string FullName { get; set; }
            public string Email { get; set; }
            public string Avatar { get; set; }
            public string ExternalAccessToken { get; set; }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)
                {
                    return null;
                }

                Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer) || String.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                string fullName = identity.FindFirstValue(ClaimTypes.Name);
                if (!string.IsNullOrEmpty(identity.FindFirstValue(ClaimTypes.GivenName)))
                {
                    fullName = string.Format("{0} {1}", identity.FindFirstValue(ClaimTypes.Surname), identity.FindFirstValue(ClaimTypes.GivenName));
                }

                _log.InfoFormat("email: {0}", identity.FindFirstValue(ClaimTypes.Email));
                _log.InfoFormat("id: {0}", identity.FindFirstValue(ClaimTypes.NameIdentifier));
                _log.InfoFormat("name: {0}", identity.FindFirstValue(ClaimTypes.Name));
                var userName = identity.FindFirstValue(ClaimTypes.Email);
                if (string.IsNullOrEmpty(userName)) userName = identity.FindFirstValue(ClaimTypes.NameIdentifier);
                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    Email = identity.FindFirstValue(ClaimTypes.Email),
                    UserName = identity.FindFirstValue(ClaimTypes.NameIdentifier),
                    FullName = fullName,
                    ExternalAccessToken = identity.FindFirstValue("ExternalAccessToken"),
                };
            }
        }

        #endregion

        #region Extend API Mobile
        [Route("sign-out")]
        [HttpPost]
        [Authorize]
        public async Task<IHttpActionResult> LogoutDevice(DeviceModel model)
        {
            try
            {
                var device = _uow.Notification.MobileDevice_GetById(model.Id);
                if (device != null)
                {
                    device.Status = false;
                    _uow.Notification.IU_MobileDevice(device);
                    return Ok(1);
                }
                return Ok(1);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(0);
            }
        }

        [Route("sign-in")]
        [HttpPost]
        [Authorize]
        public async Task<IHttpActionResult> RegisterDevice(DeviceModel model)
        {
            try
            {
                _log.Info(Newtonsoft.Json.JsonConvert.SerializeObject(model));
                var device = _uow.Notification.MobileDevice_GetById(model.Id);
                if (device == null)
                {
                    device = new Core.Entities.Notification.MobileDevice()
                    {
                        Id = model.Id,
                        Name= model.Name,
                        Token= model.Token,
                        Os= model.Os,
                        UserId = this.CurrentUserId,
                        ActiveDate = DateTime.Now,
                        Status = true
                    };
                    _uow.Notification.IU_MobileDevice(device);
                    return Ok(1);
                }
                else
                {
                    _log.Info(model.Token);
                    device.Status = true;
                    device.Token = model.Token;
                    device.UserId = this.CurrentUserId;
                    device.Os = model.Os;
                    device.ActiveDate = DateTime.Now;
                    _uow.Notification.IU_MobileDevice(device);
                    return Ok(1);
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(0);
            }
        }
        #endregion

        [Route("tes")]
        [HttpPost]
        public IHttpActionResult Test()
        {
            return BadRequest("loi roi");
        }

    }
}
