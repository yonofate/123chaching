using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class PromotionSearchViewModel
    {
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public string Name { get; set; }
        public bool IsDiscountPercent { get; set; }
        public decimal Discount { get; set; }
        public DateTime ActiveDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string Code { get; set; }
        public int Total { get; set; }
        public int TotalUsed { get; set; }
    }

    public class PromotionCodeSearchViewModel
    {
        public string Code { get; set; }
        public int PromotionId { get; set; }
        public int Total { get; set; }
        public int TotalUsed { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }

        public string Name { get; set; }
        public bool IsDiscountPercent { get; set; }
        public decimal Discount { get; set; }
        public DateTime ActiveDate { get; set; }
        public DateTime ExpiredDate { get; set; }
    }

    public class OptionViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
