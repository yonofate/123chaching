#pragma checksum "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "876f5a4f14cc51078d88c842c918da6093b3d222"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Index), @"mvc.1.0.view", @"/Views/Home/Index.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Home/Index.cshtml", typeof(AspNetCore.Views_Home_Index))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\_ViewImports.cshtml"
using Punnel.Theme;

#line default
#line hidden
#line 2 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\_ViewImports.cshtml"
using Punnel.Theme.Models;

#line default
#line hidden
#line 1 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
using X.PagedList;

#line default
#line hidden
#line 2 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
using X.PagedList.Mvc.Core;

#line default
#line hidden
#line 3 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
using X.PagedList.Mvc.Common;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"876f5a4f14cc51078d88c842c918da6093b3d222", @"/Views/Home/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"209f7cf30687226d64e91e1c7341b13d60037064", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<StaticPagedList<Punnel.Core.Entities.ViewModel.TemplateListViewModel>>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(84, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 6 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
  
    ViewData["Title"] = ViewBag.SEO_Title;

#line default
#line hidden
            BeginContext(215, 73, true);
            WriteLiteral("\r\n\r\n<div class=\"theme-collection\">\r\n    <div class=\"container\">\r\n        ");
            EndContext();
            BeginContext(289, 38, false);
#line 13 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
   Write(await Html.PartialAsync("_SEO.cshtml"));

#line default
#line hidden
            EndContext();
            BeginContext(327, 2, true);
            WriteLiteral("\r\n");
            EndContext();
            BeginContext(391, 39, true);
            WriteLiteral("        <div class=\"row themes-list\">\r\n");
            EndContext();
#line 16 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
             foreach (var item in Model)
            {

#line default
#line hidden
            BeginContext(487, 211, true);
            WriteLiteral("                <div class=\"theme-item col-lg-4 col-md-4 col-sm-6 col-xs-12 product-loop-mb fixheight\" style=\"height:278px;\">\r\n                    <div class=\"image\">\r\n                        <a class=\"loop-img\"");
            EndContext();
            BeginWriteAttribute("href", " href=\"", 698, "\"", 728, 2);
            WriteAttributeValue("", 705, "/mau-giao-dien/", 705, 15, true);
#line 20 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
WriteAttributeValue("", 720, item.Id, 720, 8, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginWriteAttribute("title", " title=\"", 729, "\"", 764, 4);
            WriteAttributeValue("", 737, "Mẫu", 737, 3, true);
            WriteAttributeValue(" ", 740, "landing", 741, 8, true);
            WriteAttributeValue(" ", 748, "page", 749, 5, true);
#line 20 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
WriteAttributeValue(" ", 753, item.Name, 754, 10, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(765, 35, true);
            WriteLiteral(">\r\n                            <img");
            EndContext();
            BeginWriteAttribute("src", " src=\"", 800, "\"", 821, 1);
#line 21 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
WriteAttributeValue("", 806, item.Thumbnail, 806, 15, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginWriteAttribute("title", " title=\"", 822, "\"", 857, 4);
            WriteAttributeValue("", 830, "Mẫu", 830, 3, true);
            WriteAttributeValue(" ", 833, "landing", 834, 8, true);
            WriteAttributeValue(" ", 841, "page", 842, 5, true);
#line 21 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
WriteAttributeValue(" ", 846, item.Name, 847, 10, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginWriteAttribute("alt", " alt=\"", 858, "\"", 874, 1);
#line 21 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
WriteAttributeValue("", 864, item.Name, 864, 10, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(875, 153, true);
            WriteLiteral(" class=\"img-responsive\">\r\n                        </a>\r\n                    </div>\r\n                    <div class=\"details\">\r\n                        <a");
            EndContext();
            BeginWriteAttribute("href", " href=\"", 1028, "\"", 1058, 2);
            WriteAttributeValue("", 1035, "/mau-giao-dien/", 1035, 15, true);
#line 25 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
WriteAttributeValue("", 1050, item.Id, 1050, 8, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(1059, 66, true);
            WriteLiteral(" class=\"clearfix\">\r\n                            <h3 class=\"title\">");
            EndContext();
            BeginContext(1126, 9, false);
#line 26 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
                                         Write(item.Name);

#line default
#line hidden
            EndContext();
            BeginContext(1135, 156, true);
            WriteLiteral("</h3>\r\n                        </a>\r\n                        <div class=\"actions\">\r\n                            <a class=\" btn-proloop view-demo\" name=\"add\"");
            EndContext();
            BeginWriteAttribute("href", " href=\"", 1291, "\"", 1321, 2);
            WriteAttributeValue("", 1298, "/mau-giao-dien/", 1298, 15, true);
#line 29 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
WriteAttributeValue("", 1313, item.Id, 1313, 8, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(1322, 118, true);
            WriteLiteral(" target=\"_blank\">XEM THỰC TẾ</a>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n");
            EndContext();
#line 33 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
            }

#line default
#line hidden
            BeginContext(1455, 54, true);
            WriteLiteral("        </div>\r\n        <div class=\"clearfix\"></div>\r\n");
            EndContext();
#line 36 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
         if (Model.PageCount > 1)
        {

#line default
#line hidden
            BeginContext(1555, 127, true);
            WriteLiteral("            <div class=\"pagination-themes text-center center-block\">\r\n                <div class=\"pager\">\r\n                    ");
            EndContext();
            BeginContext(1683, 125, false);
#line 40 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
               Write(Html.PagedListPager(Model, page => Url.Action("Index", new { page = page }), PagedListRenderOptions.OnlyShowFivePagesAtATime));

#line default
#line hidden
            EndContext();
            BeginContext(1808, 46, true);
            WriteLiteral("\r\n                </div>\r\n            </div>\r\n");
            EndContext();
#line 43 "C:\Source\yonofate\punnel\src\Punnel.Theme\Views\Home\Index.cshtml"
        }

#line default
#line hidden
            BeginContext(1865, 20, true);
            WriteLiteral("    </div>\r\n</div>\r\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<StaticPagedList<Punnel.Core.Entities.ViewModel.TemplateListViewModel>> Html { get; private set; }
    }
}
#pragma warning restore 1591
