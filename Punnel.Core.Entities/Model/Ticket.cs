using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Model
{
    public class Ticket: BaseEntity
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserId { get; set; }
        public int Status { get; set; }
        public string Subject { get; set; }
        public string Time { get; set; }
        public string Industry { get; set; }
        public string Mobile { get; set; }
        public string Note { get; set; }
    }
}
