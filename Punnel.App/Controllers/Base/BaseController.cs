using Microsoft.AspNet.Identity;
using Punnel.Core.BLL.Repositories;
using System.Web.Mvc;

namespace Punnel.App.Controllers
{
    public class BaseController : Controller
    {
        internal IUow _uow;
        protected string _CurrentUserId = null;
        public BaseController(IUow uow)
        {
            this._uow = uow;
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
    }
}
