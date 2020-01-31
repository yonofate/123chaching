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
    public class AffilateMonthlySummary : BaseEntity
    {
        [Key, Column(Order = 0)]
        public string UserId { get; set; }
        [Key, Column(Order = 1)]
        public int MonthId { get; set; }
        public int Level { get; set; }
        public int SubcriblePercent { get; set; }
        public int RenewalPercent { get; set; }
        public int TotalSubcrible { get; set; }
        public int TotalRenewal { get; set; }
        public decimal SubcribleAmount { get; set; }
        public decimal RenewalAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal Income { get; set; }
        
    }
}
