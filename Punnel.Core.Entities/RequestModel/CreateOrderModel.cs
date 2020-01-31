using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.RequestModel
{
    public class CreateOrderModel
    {
        public string Code { get; set; }
        public int ServiceId { get; set; }
        public int TimeId { get; set; }
        public string PromotionCode { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal Amount { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
