using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using log4net;
using Microsoft.AspNet.SignalR;

namespace Punnel.Api.Models
{
    public class CustomUserIdProvider : IUserIdProvider
    {
        private static readonly ILog _log = LogManager.GetLogger("CustomUserIdProvider");
        public string GetUserId(IRequest request)
        {
            //var token = request.QueryString["token"];
            var uid= request.QueryString["uid"];
            return uid;
            //if (token == null) return null;
            //else
            //{
            //    var res = new Core.BLL.Services.TokenService().Validate(token);
            //    if (res.Code != System.Net.HttpStatusCode.OK) return null;
            //    else
            //    {
            //        if (res.Code== System.Net.HttpStatusCode.OK && res.Data!=null) return uid;
            //        else return null;
            //    }
            //}
        }
    }
}