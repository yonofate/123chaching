using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class IntergationPagePublishViewModel
    {
        public Guid Id { get; set; }
        public int SiteId { get; set; }
        public string AccId { get; set; }
        public string ApiKey { get; set; }
        public string SiteName { get; set; }
    }
}
