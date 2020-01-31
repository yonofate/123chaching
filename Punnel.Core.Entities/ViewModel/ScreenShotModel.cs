using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class Screenshot
    {
        public string data { get; set; }
        public int height { get; set; }
        public string mime_type { get; set; }
        public int width { get; set; }
    }

    public class ScreenShotModel
    {
        public Screenshot screenshot { get; set; }
    }
}
