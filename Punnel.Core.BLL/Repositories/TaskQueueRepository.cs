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
    public class TaskQueueRepository : BaseRepository<TaskQueue>, ITaskQueueRepository
    {
        public TaskQueueRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(TaskQueueRepository));
        public List<TaskQueue> GetToExecute()
        {
            var res = _dbSet.AsNoTracking().Where(x => x.IsExecute == false);
            return res.ToList();
        }

        public void AddTask(TaskQueue obj)
        {
            if (_dbSet.AsNoTracking().Any(x => x.Data == obj.Data && x.IsExecute == false)==false)
            {
                this.Add(obj);
                this.Commit();
            }
        }

        public void ExecuteTask(TaskQueue obj)
        {
            var m = _dbSet.SingleOrDefault(x => x.Id == obj.Id);
            if (m != null)
            {
                m.IsExecute = true;
                m.ExecuteDate = DateTime.Now;
                m.UpdatedDate = DateTime.Now;
                this.Commit();
            }
        }

    }
}
