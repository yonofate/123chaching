using Punnel.Core.BLL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Punnel.Api.Infrastructure;
using System.Web;
using System.ServiceModel.Channels;

namespace Punnel.Api.Controllers
{
    [AllowCrossSiteJsonAttribute]
    public class BaseApiController : ApiController
    {
        internal IUow _uow;

        protected string _CurrentUserId = null;
        internal readonly string General_Err = Core.Entities.Resources.Messages.System_Err;
        internal readonly string CanNotDelete_Err = Core.Entities.Resources.Messages.CanNotDelete;
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

        internal bool isEditor()
        {
            if (User.IsInRole("editor") == false && User.IsInRole("admin") == false)
            {
                return false;
            }
            return true;
        }

        internal bool Can_UI(string userId)
        {
            if (User.IsInRole("editor") == true || User.IsInRole("admin") == true || CurrentUserId == userId)
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

        //internal string ClientIP
        //{
        //    get
        //    {
        //        var request = this.Request;
        //        request = request ?? Request;

        //        if (request.Properties.ContainsKey("MS_HttpContext"))
        //        {
        //            _ClientIP = ((HttpContextWrapper)request.Properties["MS_HttpContext"]).Request.UserHostAddress;
        //        }
        //        else if (request.Properties.ContainsKey(RemoteEndpointMessageProperty.Name))
        //        {
        //            RemoteEndpointMessageProperty prop = (RemoteEndpointMessageProperty)request.Properties[RemoteEndpointMessageProperty.Name];
        //            _ClientIP = prop.Address;
        //        }
        //        else if (HttpContext.Current != null)
        //        {
        //            _ClientIP = HttpContext.Current.Request.UserHostAddress;
        //        }
        //        else
        //        {
        //            _ClientIP = null;
        //        }
        //        return _ClientIP;
        //    }
        //}
    }
}
