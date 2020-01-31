using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Notification
{
    public class AlertUser
    {
        public string UserId { get; set; }
        public DateTime LatestViewDate { get; set; }
    }
}
