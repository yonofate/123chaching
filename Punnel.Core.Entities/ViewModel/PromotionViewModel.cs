using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class PromotionViewModel
    {
        public decimal Discount { get; set; }
        public bool IsDiscountPercent { get; set; }
    }
}
