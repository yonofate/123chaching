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
    public class PromotionCode : BaseEntity
    {
        [Key]
        public string Code { get; set; }
        public int PromotionId { get; set; }
        public int Total { get; set; }
        public int TotalUsed { get; set; }

    }
}
