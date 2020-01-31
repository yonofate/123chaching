using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.IIS
{
    public class SiteInfo
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public string State { get; set; }
        public bool AutoStart { get; set; }
    }
}
