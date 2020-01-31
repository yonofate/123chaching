using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.RequestModel
{
    public class AffilateSubcribleModel
    {
        [Required]
        public string BankCode { get; set; }
        [Required]
        public string BankAccount { get; set; }
        public string ReferralCode { get; set; }
    }
}
