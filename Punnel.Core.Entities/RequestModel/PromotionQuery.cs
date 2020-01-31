using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.RequestModel
{
    public class PromotionQuery : BaseQuery
    {
        public int DateType { get; set; }
        public int? ServiceId { get; set; }
    }

    public class PromotionCodeQuery : BaseQuery
    {
        public int DateType { get; set; }
        public int? PromotionId { get; set; }
    }
}
