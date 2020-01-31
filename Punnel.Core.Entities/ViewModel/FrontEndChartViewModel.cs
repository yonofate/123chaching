using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class AffilateChartViewModel
    {
        public string ActionDate { get; set; }
        public int New { get; set; }
        public int Cancel { get; set; }
        public int Paid { get; set; }
    }

    public class LeadChartViewModel
    {
        public string SubmitDate { get; set; }
        public int Quantity { get; set; }
    }

    public class LeadChartSummaryViewModel
    {
        public int New { get; set; }
        public int Hot { get; set; }
        public int Warm { get; set; }
        public int Cold { get; set; }
    }

    public class DashboardSummaryViewModel
    {
        //Total_lead, Total_page, Total_publish_page, Total_Income, Total_domain
        public int Total_lead { get; set; }
        public int Total_page { get; set; }
        public int Total_publish_page { get; set; }
        public decimal Total_Income { get; set; }
        public int Total_domain { get; set; }
        public int Total_view { get; set; }
    }
}
