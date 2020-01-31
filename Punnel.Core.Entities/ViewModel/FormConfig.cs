using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class FormConfigViewModel
    {
        public Guid Id { get; set; }
        public Guid LandingPageId { get; set; }
        public List<IntegrationViewModel> Configs { get; set; }
    }

    public class IntegrationViewModel
    {
        public Guid Id { get; set; }
        public int Type { get; set; }
        public string ApiAccId { get; set; }
        public string ApiKey { get; set; }
    }
}
