using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Punnel.Core.Entities.ViewModel
{
    public class LandingPageItemModel
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string UrlCode { get; set; }
        public string UserId { get; set; }

        [JsonProperty(PropertyName = "type")]
        public int Type { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "domain")]
        public string Domain { get; set; }
        [JsonProperty(PropertyName = "is_publish")]
        public bool Https { get; set; }
        [JsonProperty(PropertyName = "thumnail")]
        public string Thumnail { get; set; }
        [JsonProperty(PropertyName = "source")]
        public string Source { get; set; }
        public long? FanPageId { get; set; }
        public bool IsUpThumbnail { get; set; }
        public bool HasEmailFrm { get; set; }
        public bool HasPhoneFrm { get; set; }
        public bool IsAutomated { get; set; }
        public int PublishType { get; set; }
        public Guid? PublishIntegrationId { get; set; }
    }
}
