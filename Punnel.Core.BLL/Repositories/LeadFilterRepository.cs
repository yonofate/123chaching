using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class LeadFilterRepository : BaseRepository<LeadFilter>, ILeadFilterRepository
    {
        public LeadFilterRepository(IUow uow) : base(uow) { }
        public async Task<List<LeadFilterViewModel>> GetByUser(string userId)
        {
            var res= await (_dbContext as Model.PunnelContext).msp_LeadFilter_GetByUser(userId);
            return res;
        }

        public LeadFilter IU(LeadFilter obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.Id== obj.Id);
            if (m == null)
            {
                obj.CreatedDate = DateTime.Now;
                obj.UpdatedDate = DateTime.Now;
                this.Add(obj);
            }
            else
            {
                if (IsOwnerOrAdmin(m.UserId, obj.UserId) == false) return null;
                m.Name = obj.Name;
                obj.UpdatedDate = DateTime.Now;
                m.FilterJson = obj.FilterJson;
            }
            this.Commit();
            return obj;
        }

        public void Delete(int id , string userId)
        {
            var col = _dbSet.FirstOrDefault(x => x.Id == id);
            if (col != null)
            {
                if (IsOwnerOrAdmin(col.UserId, userId) == false) return;
                _dbSet.Remove(col);
                this.Commit();
            }
        }

    }
}
