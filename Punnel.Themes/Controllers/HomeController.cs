using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities.RequestModel;
using Punnel.Themes.Models;
using PagedList;
using PagedList.Mvc;
using Punnel.Core.Entities.ViewModel;
using DevTrends.MvcDonutCaching;

namespace Punnel.Themes.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(IUow uow) : base(uow) { }

        [DonutOutputCache(CacheProfile = "1gio")]
        public async Task<ActionResult> Index(string id, int? page=1, int? pageSize = 30)
        {
            string url = "";
            Guid? cid = null;
            string title = "Thiết kế landing page nhanh hơn, dễ dàng hơn";
            string desc = "Có hơn 300 mẫu giao diện landing page đẹp, miễn phí, tối ưu trên di động, máy tính với nhiều ngành nghề khác nhau";
            if (!string.IsNullOrEmpty(id) && id.Length>6)
            {
                var cate = await _uow.TemplateCategory.GetByCode(id);
                if (cate != null)
                {
                    cid = cate.Id;
                    title = $"Mẫu giao diện landing page {cate.Name.ToLower()}";
                    desc = cate.Description.ToLower();
                    url = id;
                }
            }
            
            var objs = await _uow.Template.SearchAsync(new TemplateRequestModel()
            {
                TemplateCateId = cid,
                GroupId = null,
                Type = 10,
                Limit = pageSize.Value,
                Page = page.HasValue ? page.Value : 0,
                Status = 2,
                IsStore = true,
                IsComunity = null,
                IsFree = null,
                UserId = null
            });
            var res = new StaticPagedList<TemplateListViewModel>(objs.Item1, page.Value, pageSize.Value, objs.Item2);

            //SEO
            ViewBag.SEO_Title = title;
            ViewBag.SEO_Desc = desc;
            ViewBag.SEO_Url = url.Length>0? $"https://themes.punnel.com/{url}": "https://themes.punnel.com";

            return View(res);
        }

        public ActionResult NotFound()
        {
            ViewBag.SEO_Title = "Page not found";
            ViewBag.SEO_Desc = "";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}