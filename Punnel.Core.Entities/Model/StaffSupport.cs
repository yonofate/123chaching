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
    public class StaffSupport: BaseEntity
    {
        [Key,Column(Order =0)]
        public string StaffId { get; set; }
        [Key, Column(Order = 1)]
        public string CustomerId { get; set; }
    }
}
