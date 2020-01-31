using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Model
{
    [Serializable]
    public class IntegrationLeadSend: BaseEntity
    {
        [Key, Column(Order =1)]
        public int LeadId { get; set; }
        [Key, Column(Order = 2)]
        public Guid IntegrationId { get; set; }
        public string ListId { get; set; }
        public int Status { get; set; }
        public string ResponseMsg { get; set; }
        public int FailedCount { get; set; }
        public DateTime? LastSendDate { get; set; }

    }
}
