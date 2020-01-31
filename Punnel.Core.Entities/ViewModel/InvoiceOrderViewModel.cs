using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class InvoiceOrderViewModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string UserId { get; set; }
        public string ServiceName { get; set; }
        public int Quantity { get; set; }
        public string Unit { get; set; }
        public decimal Discount { get; set; }
        public decimal Amount { get; set; }
        public decimal TotalAmount { get; set; }
        public int Status { get; set; }
        public int? PaymentType { get; set; }
        public decimal Price { get; set; }
        public bool IsCreditCard { get; set; }
        public string UnitPriceDisplay => this.Price.ToString("N0") + '/' + this.Unit;
        public string AmountDisplay => this.Amount.ToString("N0");
        public string DiscountDisplay => (this.Discount*-1).ToString("N0");
        public string TotalAmountDisplay => this.TotalAmount.ToString("N0");
    }
}
