using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Integration.Sms
{
    public class Elements
    {
        public int phone_uid { get; set; }
    }

    public class SmsRemoveDeviceResponse
    {
        public string status { get; set; }
        public int total { get; set; }
        public string message { get; set; }
        public bool elements { get; set; }
    }

    public class SmsAddDeviceResponse
    {
        public string status { get; set; }
        public int total { get; set; }
        public string message { get; set; }
        public Elements elements { get; set; }
    }
}
