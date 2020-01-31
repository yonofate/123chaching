using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.Entities.Notification
{
    public class Alert
    {
        public Alert()
        {
            CreatedDate = DateTime.Now;
            UpdatedDate = DateTime.Now;
            IsRead = false;
        }
        public long Id { get; set; }
        public int Type { get; set; }
        public string UserId { get; set; }
        public string ReferId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool IsBroadCast { get; set; }
        public bool IsRead { get; set; }
        public string Link { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }

    public class AlertViewModel
    {
        [JsonProperty(PropertyName ="i")]
        public long Id { get; set; }
        [JsonProperty(PropertyName = "r")]
        public string ReferId { get; set; }
        [JsonProperty(PropertyName = "t")]
        public int Type { get; set; }
        [JsonProperty(PropertyName = "h")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "b")]
        public string Content { get; set; }
        [JsonProperty(PropertyName = "v")]
        public bool IsRead { get; set; }
        [JsonProperty(PropertyName = "lk")]
        public string Link { get; set; }

        [JsonProperty(PropertyName = "l")]
        public string LinkDisplay
        {
            get
            {
                if (string.IsNullOrEmpty(this.Link)) return "";
                Uri uri = new Uri(this.Link);
                if (uri.AbsolutePath == "/" || string.IsNullOrEmpty(uri.AbsolutePath)) return uri.Host;
                else return uri.Host + uri.AbsolutePath;
            }
            private set { }
        }

        [JsonProperty(PropertyName = "d")]
        public DateTime CreatedDate { get; set; }

        [JsonProperty(PropertyName = "n")]
        public string PageName { get; set; }
    }

    public class AlertData
    {
        [JsonProperty(PropertyName = "r")]
        public string ReferId { get; set; }
        [JsonProperty(PropertyName = "t")]
        public int Type { get; set; }       
    }
}
