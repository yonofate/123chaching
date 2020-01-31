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
    public class SendMailTracking
    {
        [Key]
        public int LeadId { get; set; }
        public bool IsRead { get; set; }
        public DateTime OpenDate { get; set; }
    }
}
