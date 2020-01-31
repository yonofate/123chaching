using log4net;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using Punnel.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class SendMailTrackingRepository : BaseRepository<SendMailTracking>, ISendMailTrackingRepository
    {
        public SendMailTrackingRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(SendMailTrackingRepository));
        public void IU(SendMailTracking obj)
        {
            _log.Info(obj);
            var m = _dbSet.FirstOrDefault(x=>x.LeadId==obj.LeadId);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {
                m.IsRead = obj.IsRead;
            }
            this.Commit();
        }

    }
}
