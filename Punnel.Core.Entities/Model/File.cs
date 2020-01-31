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
    public class File : BaseEntity
    {
        /// <summary>
        /// Khóa chính
        /// </summary>
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.None)]
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }
        public double Size { get; set; }
        public string Path { get; set; }
        public string NameRaw { get; set; }
        public int OptimalStatus { get;set;}
        [JsonProperty(PropertyName = "dateOptimal")]
        public DateTime? OptimalDate { get; set; }
        [JsonProperty(PropertyName = "collection")]
        public Guid? CollectionId { get; set; }
        
    }
}
