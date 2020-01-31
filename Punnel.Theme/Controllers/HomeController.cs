using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using X.PagedList.Mvc;
using X.PagedList;
using Punnel.Core.Entities.ViewModel;
using Punnel.Theme.Infrastructures;
using Punnel.Theme.Models;

namespace Punnel.Theme.Controllers
{
    public class HomeController : Controller
    {
        private readonly IConfiguration _configuration;
        public HomeController(IConfiguration configuration) {
            _configuration = configuration;
        }
        [OutputCache(Duration = 20 * 60, VaryByParam = "id,page,pageSize")]
        public async Task<IActionResult> Index(string id, int? page = 1, int? pageSize = 30)
        {
            string url = "";
            Guid? cid = null;
            string title = "Thiết kế landing page nhanh hơn, dễ dàng hơn";
            string desc = "Có hơn 300 mẫu giao diện landing page đẹp, miễn phí, tối ưu trên di động, máy tính với nhiều ngành nghề khác nhau";
            if (!string.IsNullOrEmpty(id) && id.Length > 6)
            {
                TemplateCategoryViewModel cate;
                using (var cnn = new SqlDatabase(_configuration).DefaultConnection())
                {
                    cate = await cnn.QueryFirstOrDefaultAsync<TemplateCategoryViewModel>("select * from TemplateCategory (nolock) where Code= @code", new { code = id });
                }

                if (cate != null)
                {
                    cid = cate.Id;
                    title = $"Mẫu giao diện landing page {cate.Name.ToLower()}";
                    desc = cate.Description;
                    url = id;
                }
            }

            List<TemplateListViewModel> objs = new List<TemplateListViewModel>();
            int total = 0;
            using (var cnn = new SqlDatabase(_configuration).DefaultConnection())
            {
                total = await cnn.ExecuteScalarAsync<int>(@"select count(*) from Template (nolock) where 1 = 1" + (cid.HasValue? " and TemplateCateId= @cid" : "") + @" and type = 10 and status = 2 and IsStore = 1 
                                                                    ", new { cid = cid});

                var t = await cnn.QueryAsync<TemplateListViewModel>(@"select * from Template (nolock) where 1 = 1" + (cid.HasValue ? " and TemplateCateId= @cid" : "") + @" and type = 10 and status = 2 and IsStore = 1 
                                                                      ORDER BY UpdatedDate DESC
                                                                      OFFSET @PageSize * (@PageNumber - 1) ROWS
                                                                      FETCH NEXT @PageSize ROWS ONLY; ", new { cid = cid, PageSize = pageSize, PageNumber = page});
                objs = t.ToList();
            }
            var res = new StaticPagedList<TemplateListViewModel>(objs, page.Value, pageSize.Value, total);
            //SEO
            ViewBag.SEO_Title = title;
            ViewBag.SEO_Desc = desc;
            ViewBag.SEO_Url = url.Length > 0 ? $"https://themes.punnel.com/{url}" : "https://themes.punnel.com";

            return View(res);
        }

        public IActionResult NotFound()
        {
            ViewBag.SEO_Title = "Page not found";
            ViewBag.SEO_Desc = "";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
