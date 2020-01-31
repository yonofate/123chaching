using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.RequestModel
{
    public class InvoiceQuery : BaseQuery
    {
        public int? ServiceId { get; set; }
        public int? PaymentType { get; set; }
        public int DateType { get; set; }
    }

    public class InvoiceRequest
    {
        public int Id { get; set; }
        public string Code { get; set; }
    }
}
