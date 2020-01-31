using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.RequestModel
{
    public class BaseQuery
    {
        public string Keyword { get; set; }
        public int Limit { get; set; }
        public int Page { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
