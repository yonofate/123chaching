using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using log4net;
using Punnel.Core.Entities.Model;

namespace Punnel.Core.BLL.Repositories
{
    public class ServiceQuotaRepository : BaseRepository<ServiceQuota>, IServiceQuotaRepository
    {
        public ServiceQuotaRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(ServiceQuotaRepository));       
        public virtual ServiceQuota GetByLevel(int levelId)
        {
            return _dbSet.AsNoTracking().FirstOrDefault(x => x.LevelId == levelId);
        }
    }
}
