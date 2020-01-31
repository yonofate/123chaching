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
    public class Collection : BaseEntity
    {
        /// <summary>
        /// Khóa chính
        /// </summary>
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.None)]
        [JsonProperty(PropertyName ="id")]
        public Guid Id { get; set; }
        public string UserId { get; set; }
        [JsonProperty(PropertyName = "Name")]
        public string Name { get; set; }
        public bool Deleted { get; set; }
        public int Type { get; set; }
        
    }
}
