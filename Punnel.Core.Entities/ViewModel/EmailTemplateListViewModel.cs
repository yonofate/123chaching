using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class EmailTemplateListViewModel
    {
        public int Id { get; set; }
        public int Type { get; set; }
        public string Name { get; set; }
        public DateTime UpdatedDate { get; set; }
    }

    public class SendMailTrackingViewModel
    {
        public int Status { get; set; }
        public bool IsRead { get; set; }
        public DateTime SendDate { get; set; }
        public DateTime ReadDate { get; set; }
        public string EmailTemplateName { get; set; }
    }
}
