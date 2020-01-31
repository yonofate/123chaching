using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class TemplateViewModel
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Source { get; set; }
        public int Type { get; set; }
        public int Status { get; set; }
        public Guid TemplateCateId { get; set; }
        public string RejectMsg { get; set; }
        public string CateUrl { get; set; }

    }
}
