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
    public class Template: BaseEntity
    {
        /// <summary>
        /// Khóa chính
        /// </summary>
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.None)]
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Domain { get; set; }
        public string Thumbnail { get; set; }
        public string Source { get; set; }
        public Guid? TemplateCateId { get; set; }
        public int Type { get; set; }
        public byte? Groupid { get; set; }
        public bool Publish { get; set; }
        public bool Deleted { get; set; }
        public string ReferId { get; set; }
        public int Status { get; set; }
        public string RejectMsg { get; set; }
        public bool IsUpThumbnail { get; set; }
        public bool IsStore { get; set; }
        public decimal Price { get; set; }
    }
}
