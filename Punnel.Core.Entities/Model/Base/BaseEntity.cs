using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Model
{
    public class BaseEntity
    {
        [JsonIgnore]
        public string CreatedBy { get; set; }
        [JsonIgnore]
        public string UpdatedBy { get; set; }
        [JsonProperty(PropertyName = "createdAt")]
        public DateTime CreatedDate { get; set; }
        [JsonIgnore]
        public DateTime UpdatedDate { get; set; }
    }
}
