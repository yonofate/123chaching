using Microsoft.AspNetCore.Mvc;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Punnel.Theme.Components
{
    public class ThemeViewComponent: ViewComponent
    {
        public ThemeViewComponent()
        {

        }

        public async Task<IViewComponentResult> InvokeAsync(TemplateListViewModel model)
        {
            return View(model);
        }
    }
}
