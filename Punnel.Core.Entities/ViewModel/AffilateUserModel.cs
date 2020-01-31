using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class AffilateUserModel
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public int UserStatus { get; set; }
        public DateTime? ExpiredDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class AffilateSummaryModel
    {
        public decimal Income { get; set; }
        public int TotalSubcrible { get; set; }
    }

    public class AffilateSummaryMobileModel
    {
        public decimal Income_ThisMonth { get; set; }
        public int TotalSubcrible_ThisMonth { get; set; }
        public decimal Income_AllTime { get; set; }
        public int TotalSubcrible_AllTime { get; set; }
    }
}
