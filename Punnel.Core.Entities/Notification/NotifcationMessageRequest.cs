using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Notification
{
    public class NotificationMessageRequest
    {
        //string url,string title,string content
        public string Url { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string UserId { get; set; }
        public bool IsBroadCast { get; set; }

    }
}
