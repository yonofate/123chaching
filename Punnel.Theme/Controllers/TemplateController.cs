using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Punnel.Core.Entities.ViewModel;
using Punnel.Theme.Infrastructures;

namespace Punnel.Theme.Controllers
{
    public class TemplateController : Controller
    {
        private readonly IConfiguration _configuration;
        public TemplateController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [OutputCache(Duration = 30 * 60, VaryByParam = "id")]
        public async Task<IActionResult> Index(Guid id)
        {
            TemplateViewModel template;
            using (var cnn = new SqlDatabase(_configuration).DefaultConnection())
            {
                template = await cnn.QueryFirstOrDefaultAsync<TemplateViewModel>("select a.Id, a.RejectMsg, a.Name, b.CodeUrl as CateUrl from Template a (nolock) inner join TemplateCategory b (nolock) on a.TemplateCateId = b.Id where a.Id= @id", new { id = id });
            }

            if (template == null) return RedirectToAction("NotFound", "Home", new { });
            ViewBag.Id = id;
            ViewBag.CateUrl = template.CateUrl;
            ViewBag.SEO_Title = $"Mẫu giao diện landing page {template.RejectMsg}";
            ViewBag.SEO_Desc = $"Mẫu giao diện landing page {template.RejectMsg} {template.Name}";
            ViewBag.SEO_Url = $"https://themes.punnel.com/mau-giao-dien/{id}";
            return View();
        }
    }
}