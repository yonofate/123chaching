using System.Collections.Generic;
using Bot.Messenger.Models;
using Newtonsoft.Json;

namespace Punnel.ChatHub
{
    //public class WebhookModel
    //{
    //    [JsonProperty("object")]
    //    public string _object { get; set; }
    //    public List<Entry> entry { get; set; }
    //}

    //public class Entry
    //{
    //    public string id { get; set; }
    //    public long time { get; set; }
    //    public List<Messaging> messaging { get; set; }
    //}

    //public class Messaging
    //{
    //    public Sender sender { get; set; }
    //    public Recipient recipient { get; set; }
    //    public long timestamp { get; set; }
    //    public Message message { get; set; }
    //    public Postback postback { get; set; }
    //}

    //public class Postback
    //{
    //    public string payload { get; set; }
    //}

    //public class Sender
    //{
    //    public string id { get; set; }
    //}

    //public class Recipient
    //{
    //    public string id { get; set; }
    //}

    //public class Message
    //{
    //    public string mid { get; set; }
    //    public int seq { get; set; }
    //    public string text { get; set; }
    //}

    //public class Button
    //{
    //    public string type { get; set; }
    //    public string payload { get; set; }
    //    public string title { get; set; }
    //    public string url { get; set; }
    //}

    //public class Payload
    //{
    //    public string template_type { get; set; }
    //    public string text { get; set; }
    //    public List<Button> buttons { get; set; }
    //}

    //public class Attachment
    //{
    //    public string type { get; set; }
    //    public Payload payload { get; set; }
    //}

    //public class Msg
    //{
    //    public Attachment attachment { get; set; }
    //}

    //public class ToMsg
    //{
    //    public Recipient recipient { get; set; }
    //    public Msg message { get; set; }
    //}

    public class Img: Payload
    {
        [JsonProperty("is_reusable")]
        public bool? IsReusable { get; set; }
        [JsonProperty("url")]
        public string Url { get; set; }
    }
}