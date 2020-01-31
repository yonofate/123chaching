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
    public class Domain: BaseEntity
    {
        [Key,Column(Order =0)]
        public string Id { get; set; }
        [Key, Column(Order = 1)]
        public string UserId { get; set; }
        public string Dns { get; set; }
        public bool IsSub { get; set; }
        public bool IsChecked { get; set; }
        public DateTime? LastCheckedDate { get; set; }
    }
}
