using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Notification
{
    public class PushMessage
    {
        public PushMessage()
        {
            this.priority = "default";
            this.data = "{}";
        }
        //public string to { get; set; }
        public object data { get; set; }
        //public string title { get; set; }
        //public string body { get; set; }
        //public long? ttl { get; set; }
        //public long? expiration { get; set; }
        //public string priority { get; set; }
        //public string sound { get; set; }
        //public int? badge { get; set; }
        //public string channelId { get; set; }
        public string to { get; set; }
        //public string data { get; set; }
        public string sound { get; set; }
        public string body { get; set; }
        public string title { get; set; }
        public string priority { get; set; }

    }
}
