using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class PublishPageResponseModel
    {
        public string BaseDomain { get; set; }
        public string FullUrl { get; set; }
        public string PathUrl { get; set; }
        public int Type { get; set; }
        public Guid? PublishIntegrationId { get; set; }
    }
}
