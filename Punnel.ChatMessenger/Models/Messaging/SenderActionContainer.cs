﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bot.Messenger.Models
{
    public class SenderActionContainer : MessageContainer
    {
        [JsonProperty("sender_action")]
        public virtual SenderAction SenderAction { get; set; }
    }
}
