using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Punnel.Api.Models
{
    public class AutomationRequestModel
    {
        public int LeadId { get; set; }
        public Guid PageId { get; set; }
        public string UserId { get; set; }
    }
}