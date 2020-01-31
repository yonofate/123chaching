using Punnel.Core.BLL.Repositories;
using System.Web.Mvc;

namespace Punnel.Themes.Controllers
{
    public class BaseController : Controller
    {
        internal IUow _uow;
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
    }
}
