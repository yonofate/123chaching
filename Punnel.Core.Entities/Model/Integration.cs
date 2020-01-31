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
    public class Integration : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public int SiteId { get; set; }
        public string AccId { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string ApiKey { get; set; }
        public string TokenJson { get; set; }
        public string Password { get; set; }
        public bool Enable { get; set; }
        public bool IsExpired { get; set; }
        public DateTime? LastConnectedDate { get; set; }

    }
}
