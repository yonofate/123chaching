using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class DomainViewModel
    {
        public string Id { get; set; }
        public string Dns { get; set; }
        public bool IsChecked { get; set; }
        public DateTime? LastCheckedDate { get; set; }
        public bool Used { get; set; }
    }
}
