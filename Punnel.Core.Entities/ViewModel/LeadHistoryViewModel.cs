using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class LeadHistoryViewModel
    {
        public string Email { get; set; }
        public string Phone { get; set; }
        public string FullName { get; set; }
        public string Link { get; set; }
        public string SystemNote { get; set; }
        public DateTime SubmitDate { get; set; }
        public string RegionName { get; set; }
        public string Referer { get; set; }
        public string Notes { get; set; }
        public string Tags { get; set; }
        public bool IsMobile { get; set; }
    }
}
