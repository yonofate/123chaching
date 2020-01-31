using Punnel.App.Filters;
using Punnel.Core.BLL.Repositories;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using System.Web;
using Punnel.App.Models;
using System;
using log4net;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.App.Controllers
{
    [TCCorsPolicyProvider]
    public class BaseApiController : ApiController
    {
        internal IUow _uow;
        private static readonly ILog _log = LogManager.GetLogger("BaseApiController");
        protected string _CurrentUserId = null;
        protected int? _Level=null;
        internal readonly string General_Err = Core.Entities.Resources.Messages.System_Err;
        internal readonly string CanNotDelete_Err = Core.Entities.Resources.Messages.CanNotDelete;
        internal readonly string RequiredUpgrade_MaxPage_Err = Core.Entities.Resources.Messages.RequiredUpgrade_MaxPage;
        public BaseApiController(IUow uow)
        {
            this._uow = uow;            
        }

        internal string GetUserId()
        {
            var identity = System.Web.HttpContext.Current.User.Identity;
            if (identity.IsAuthenticated == true)
            {
                return identity.GetUserId();
            }
            return null;
        }
        internal string CurrentUserId
        {
            get { if (string.IsNullOrEmpty(_CurrentUserId)) _CurrentUserId = GetUserId(); return _CurrentUserId; }
        }

        internal int Level
        {
            get { if (_Level ==null) _Level = Helper.GetLevel(CurrentUserId); return _Level.Value; }
        }

        internal bool isEditor()
        {
            if(User.IsInRole("editor") ==false && User.IsInRole("admin") == false){
                return false;
            }
            return true;
        }

        internal bool Can_UI(string userId)
        {
            if (User.IsInRole("editor") == true || User.IsInRole("admin") == true || CurrentUserId== userId)
            {
                return true;
            }
            return false;
        }

        private string _ClientIP = string.Empty;
        internal string ClientIP
        {
            get
            {
                if (string.IsNullOrEmpty(_ClientIP))
                {
                    _ClientIP = Punnel.Core.Utils.StringUtils.GetRequestIP();
                }

                return _ClientIP;
            }
        }

        internal void LogRequest()
        {
            try
            {
                HttpRequest r = HttpContext.Current.Request;
                if (HttpContext.Current.User.Identity.IsAuthenticated == true)
                {
                    if (HttpContext.Current.User.Identity.Name == "lamktvn@gmail.com") return;
                    LogRequest req = new LogRequest()
                    {
                        Url = r.Url.AbsoluteUri,
                        Method = r.HttpMethod,
                        Referer = r.UrlReferrer.AbsoluteUri,
                        User = HttpContext.Current.User.Identity.IsAuthenticated == true ? HttpContext.Current.User.Identity.Name : "NO-AUTH",
                    };
                    _log.Info(Newtonsoft.Json.JsonConvert.SerializeObject(req));
                }
            }
            catch (Exception) { }
        }
    }
}
