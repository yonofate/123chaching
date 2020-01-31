using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Punnel.Core.BLL.Repositories;

namespace Punnel.Api.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(IUow uow) : base(uow) { }
        public async Task<ActionResult> Index()
        {
            //var a = new Uri("http://page1.soikeobong.com/");
            //var b = new Uri("http://page1.soikeobong.com/ach-ads/");
            //new Core.BLL.Queue.TrackIPInfoTask().Execute();
            //var r = new Core.Entities.Notification.AlertViewModel()
            //{
            //    Title = "Thong bao dang ki",
            //    Content = "noi dung thong bao"
            //};

            //_uow.Notification.PushNotification("7a5d2d39-0d39-452c-9e6b-d7bc6010341e", r);
            //var data = Newtonsoft.Json.JsonConvert.DeserializeObject<Core.Entities.RequestModel.FormDataRequest>("{'dataForm':[{'top':5348.76563,'name':'name','value':'Nguyên'},{'top':5416.797,'name':'phone','value':'0909082535'},{'top':5545.96875,'name':'street','value':'hcm'},{'top':5481.25,'name':'email','value':'nguyenthibinhnguyen87@gmail.com'},{'top':null,'name':'auto_rep','value':'1012'},{'top':null,'name':'url_page','value':'https://collagenvh.com/'},{'top':null,'name':'utm_source','value':null},{'top':null,'name':'utm_medium','value':null},{'top':null,'name':'utm_campaign','value':null},{'top':null,'name':'utm_term','value':null},{'top':null,'name':'utm_content','value':null}],'id':'a23044a0-d713-494c-b670-717f3985a206','IpAddress':'2001:ee0:4fcf:cb0:3cfe:2fc8:97b2:2b9b','IsMobile':false}");
            //var lead = await _uow.Lead.Add(data);
            return View();
        }
    }
}