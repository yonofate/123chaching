using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class TemplateDefaultRepository : BaseRepository<TemplateDefault>, ITemplateDefaultRepository
    {
        public TemplateDefaultRepository(IUow uow) : base(uow) { }

        public TemplateDefault GetByType(int type)
        {
            return _dbSet.FirstOrDefault(x=>x.Type==type);
        }
        public void IU(TemplateDefault obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.Id== obj.Id);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {
                m.Source = obj.Source;
                m.Type = obj.Type;
                m.Optin = obj.Optin;
            }
            this.Commit();
        }
    }
}
