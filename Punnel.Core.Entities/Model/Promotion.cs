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
    public class Promotion : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int ServiceId { get; set; }
        public bool IsDiscountPercent { get; set; }
        public decimal Discount { get; set; }
        public DateTime ActiveDate { get; set; }
        public DateTime ExpiredDate { get; set; }

    }
}
