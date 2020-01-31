using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class AutomationViewModel
    {
        public Guid Id { get; set; }
        public int Type { get; set; }
        public string UserId { get; set; }
        public Guid LandingPageId { get; set; }
        public int TemplateId { get; set; }
        public int DelayHour { get; set; }
        public int DelayMin { get; set; }
        public bool IsEnable { get; set; }
        public string TemplateName { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
