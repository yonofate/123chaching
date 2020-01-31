using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Model
{
    public class TemplateCategory : BaseEntity
    {
        /// <summary>
        /// Khóa chính
        /// </summary>
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.None)]
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public int No { get; set; }
        [JsonIgnore]
        public bool Active { get; set; }
        [JsonIgnore]
        public int Type { get; set; }

        [JsonIgnore]
        public string Description { get; set; }
        public string ReferId { get; set; }
        //[JsonProperty(PropertyName = "user_id")]

        [JsonIgnore]
        public string UserId { get; set; }
    }
}
