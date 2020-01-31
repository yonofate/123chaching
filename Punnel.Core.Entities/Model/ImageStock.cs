using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Model
{
    public class ImageStock
    {
        [Key]
        public Guid Id { get; set; }
        public string Path { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public Guid? TemplateId { get; set; }
        public Guid? CateId { get; set; }
        public DateTime CreatedDate { get; set; }
        public long Size { get; set; }
        public string Type { get; set; }
    }
}
