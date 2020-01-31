using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL
{
    public class BusinessException: Exception
    {
        public BusinessException(string message) : base(message) { }
        public int ErrorCode = 0;
    }
}
