using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.QueueService
{
    public interface IScheduler
    {
        void Start();
        void Stop();
    }
}
