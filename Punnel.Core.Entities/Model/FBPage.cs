using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Punnel.Core.Entities.Model
{
    [Serializable]
    public class FBPage : BaseEntity
    {
        /// <summary>
        /// Khóa chính
        /// </summary>
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.None)]
        public long Id { get; set; }
        public long FbId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }

        [JsonProperty(PropertyName ="access_token")]
        public string AccessToken { get; set; }
        public DateTime? LastConnected { get; set; }
        [JsonProperty(PropertyName = "domains")]
        public string WhiteListDomains { get; set; }
        public string GreetingIn { get; set; }
        public string GreetingOut { get; set; }
        [JsonProperty(PropertyName = "theme_color")]
        public string ThemeColor { get; set; }
        public int Delay { get; set; }
        public bool Publish { get; set; }
        public bool UseBot { get; set; }

    }
}
