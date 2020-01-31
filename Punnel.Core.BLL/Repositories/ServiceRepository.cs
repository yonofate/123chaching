using log4net;
using Punnel.Core.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class ServiceRepository : BaseRepository<Service>, IServiceRepository
    {
        public ServiceRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(ServiceRepository));

        public void IU(Service obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.Id== obj.Id);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {               
                m.Price = obj.Price;
            }
            this.Commit();
            //this.RemoveCache(obj.Id);
        }

        public override void Delete(int id)
        {
            var col = _dbSet.FirstOrDefault(x => x.Id == id);
            if (col == null) throw new Exception("not found");
            _dbSet.Remove(col);
            this.Commit();
            //this.RemoveCache(id);
        }

    }
}
