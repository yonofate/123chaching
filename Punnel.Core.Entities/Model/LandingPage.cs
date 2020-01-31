using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Punnel.Core.Entities.Model
{
    [Serializable]
    public class LandingPage : BaseEntity
    {
        /// <summary>
        /// Khóa chính
        /// </summary>
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.None)]
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string UrlCode { get; set; }
        public string UserId { get; set; }
        [JsonProperty(PropertyName = "col")]
        public Guid? CollectionId { get; set; }
        [JsonProperty(PropertyName = "origin_template")]
        public Guid? TemplateId { get; set; }
        [JsonProperty(PropertyName = "type")]
        public int Type { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "domain")]
        public string Domain { get; set; }
        public string BaseDomain { get; set; }

        [JsonProperty(PropertyName = "is_publish")]
        public bool Publish { get; set; }
        public int PublishType { get; set; }
        [JsonProperty(PropertyName = "ishttps")]
        public bool Https { get;set;}
        [JsonProperty(PropertyName = "thumnail")]
        public string Thumnail { get; set; }
        [JsonProperty(PropertyName = "source")]
        public string Source { get; set; }
        public DateTime? PublishDate { get; set; }
        public long? FanPageId { get; set; }
        public bool IsMailAutoResponse { get; set; }
        public bool Deleted { get; set; }
        public bool IsUpThumbnail { get; set; }
        public string PublishReferId { get; set; }
        public Guid? PublishIntegrationId { get; set; }

        public bool HasEmailFrm { get; set; }
        public bool HasPhoneFrm { get; set; }

        public int Position { get; set; }
    }
}
