using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Themes.Models
{
    public class TemplateResultViewModel
    {
        public List<TemplateListViewModel> Data { get; set; }
        public int Total { get; set; }
    }

    public class TemplateRequestViewModel
    {
        public string Cate{ get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}