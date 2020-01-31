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
    public class MailToSend: BaseEntity
    {
        [Key,Column(Order =0)]
        public int LeadId { get; set; }
        [Key, Column(Order = 1)]
        public int TemplateId { get; set; }
        [Key, Column(Order = 2)]
        public long TimeId { get; set; }
        public string UserId { get; set; }
        public int Status { get; set; }
        public bool IsRead { get; set; }
        public string ResponseMsg { get; set; }
        public DateTime? SendDate { get; set; }
        public DateTime? ReadDate { get; set; }
        public DateTime? WillSendDate { get; set; }
    }
}
