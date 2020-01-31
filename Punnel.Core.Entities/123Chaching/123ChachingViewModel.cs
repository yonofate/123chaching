using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities._123Chaching
{
    public class ChartViewModel
    {
        public DateTime Time { get; set; }
        public string TimeDisplay => Time.ToString("dd/MM", System.Globalization.CultureInfo.InvariantCulture);
        public string Quantity { get; set; }
    }

    public class AffiliateSummary
    {
        public int Total { get; set; }
        public decimal ApprovedAmount { get; set; }
        public decimal WaitToApprovedAmount { get; set; }
    }
}
