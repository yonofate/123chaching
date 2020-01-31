using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Notification
{
    public class MobileDevice
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Token { get; set; }
        public string UserId { get; set; }
        public string Os { get; set; }
        public bool Status { get; set; }
        public DateTime ActiveDate { get; set; }
    }
}
