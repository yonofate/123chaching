using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using DevTrends.MvcDonutCaching;
using Punnel.Core.BLL.Repositories;

namespace Punnel.Themes.Controllers
{
    public class TemplateController : BaseController
    {
        public TemplateController(IUow uow) : base(uow) { }
        // GET: Template
        [DonutOutputCache(CacheProfile = "1gio")]
        public async Task<ActionResult> Index(string id)
        {
            if (string.IsNullOrEmpty(id) == false && id.Length == 36)
            {
                var gid = Guid.Parse(id);
                var template = await _uow.Template.GetInfoById(gid);
                if (template == null) return RedirectToAction("NotFound", "Home",new { });
                ViewBag.Id = id;
                ViewBag.SEO_Title = $"Mẫu giao diện landing page {template.RejectMsg.ToLower()}";
                ViewBag.SEO_Desc = $"Mẫu giao diện landing page {template.RejectMsg.ToLower()} {template.Name.ToLower()}";
                ViewBag.SEO_Url = $"https://themes.punnel.com/mau-giao-dien/{id}";
                return View();
            }
            return RedirectToAction("NotFound", "Home", new { });
        }
    }
}