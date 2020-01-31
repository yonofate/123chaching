using Newtonsoft.Json;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.BLL.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Punnel.App.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(IUow uow) : base(uow) { }
        public ActionResult Index(string r)
        {
            //var x= this.ClientIP;
            //if(!string.IsNullOrEmpty(r) && r.Length==10)Session["affiliate_code"] = r;
            //Session["hook-init-redis"] = DateTime.Now.ToString();
            //Session["EnableExternalAuth"] = true;
            ViewBag.Title = "Home Page";
            return View();
        }

        public ActionResult Referer(string id)
        {
            var response = HttpContext.Response;
            response.Cookies.Remove("referral");
            response.Cookies.Add(new HttpCookie("referral")
            {
                Domain = "app.punnel.com",
                Path="/",
                Expires = DateTime.Now.AddDays(30),
                Value = id
            });
            return Redirect("https://punnel.com");
            //return Redirect($"https://app.punnel.com/#!/auth/register/?ref={id}");
        }

        public ActionResult Error(int id=0)
        {
            return View(new Models.ErrorModel() { StatusCode=id});
        }

        public async Task<ActionResult> Contact()
       {
            ViewBag.Title = "Home Page";

            _uow.Integration.ActiveCampain_AddContact();

            //new EmailServices.GoogleSheetSvc("7a5d2d39-0d39-452c-9e6b-d7bc6010341e_1578114716141", "").Auth();

            //var tmp = _uow.Template.Get(Guid.Parse("B21A704A-B3B1-4045-83A1-00D87E16304C"));
            //_uow.Template.ProcessTemplateImg();
            //new Core.BLL.Queue.CreateSysFileHostingTask().Execute();
            //_uow.PunnelTracking.UpdateImageInfo();
            //new Core.BLL.Queue.CommonTask().Execute();
            //new EmailServices.GmailPersonalSvc(Core.Entities.EmailSendType.Lead_AutoReply, "Lam Nguyen");
            //var x= Helper.GetHash("abc@123");
            //_uow.Lead.IntegrationInfo(1315);
            //new Core.BLL.Queue.LeadSendTask().Execute();
            //var c= CommonUtils.GetLastWordOfString("Nguyen Van A");
            new Core.BLL.Queue.LeadSendMailAutoReplyTask().Execute();
            //await _uow.PublishPage.TestSSL();

            //new Core.BLL.Queue.TrackIPInfoTask().Execute();

            var ldp=_uow.LandingPage.GetAll();
            foreach(var value in ldp)
            {
                try
                {
                    if (!string.IsNullOrEmpty(value.Source))
                    {
                        var newLdp = new Core.Entities.Model.LandingPage()
                        {
                            Id = value.Id
                        };

                        var obj = JsonConvert.DeserializeObject<Core.Entities.ViewModel.LPSourceModel>(value.Source);
                        if (obj.apiElement.Count > 0)
                        {
                            var frm = obj.apiElement.Where(x => x.lang == "ITEM_FORM").ToList();
                            if (frm.Count() > 0)
                            {
                                newLdp.HasEmailFrm = frm.Any(x => x.type_form == "email");
                                newLdp.HasPhoneFrm = frm.Any(x => x.type_form == "phone");
                            }
                        }
                        await _uow.LandingPage.IU(newLdp, "form");
                    }
                }catch(Exception ex) {
                }
            }
            return View();
        }

        public void GetTemplate()
        {
            _uow.Template.ProcessTemplateImg();
            new Core.BLL.Proxy.CrawlLadiPageService().Execute();
        }

        public async Task TemplateChangeImage()
        {
            //Lấy image trong source => lưu link image goc
            //_uow.Template.ProcessTemplateImg();

            //Upload image to hstatic.punnel.com & tao link image moi
            // _uow.Template.ChangeImage();

            //Change img template
            //_uow.Template.ProcessChangeTemplateImg(20);

           //await  _uow.Template.ReplaceTemplateSourceSource("2016", "2019");
           // await _uow.Template.ReplaceTemplateSourceSource(" LDP", " PN");

            _uow.PunnelTracking.UpdateImageInfo();
        }
    }
}
