using Bot.Messenger.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Punnel.ChatHub.Models
{
    public class MessageItem: Payload
    {
        public string url { get; set; }
        public bool? is_reusable { get; set; }
    }
}