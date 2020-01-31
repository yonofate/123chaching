using Microsoft.AspNetCore.Mvc;
using Punnel.Core.Entities.ViewModel;
using Punnel.Theme.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Punnel.Theme.Components
{
    public class SeoViewComponent: ViewComponent
    {
        public SeoViewComponent()
        {

        }

        public async Task<IViewComponentResult> InvokeAsync(SeoViewModel model)
        {
            return View(model);
        }
    }
}
