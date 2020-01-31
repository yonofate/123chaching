using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class LeadTagRepository : BaseRepository<LeadTag>, ILeadTagRepository
    {
        public LeadTagRepository(IUow uow) : base(uow) { }
        public List<LeadTag> GetByUser(string userId)
        {
            return _dbSet.AsNoTracking().Where(x => x.UserId == userId || x.IsSystem==true).ToList();
        }

        int GetKey(string userId)
        {
            var m = _dbSet.AsNoTracking().Where(x => x.UserId == userId || x.UserId == "");
            if (m.Count() > 0)
            {
                return m.Max(x => x.Id) * 2;
            }
            else
            {
                return 1;
            }
        }

        public LeadTag IU(LeadTag obj)
        {
            var m = _dbSet.AsNoTracking().Any(x=>x.UserId== obj.UserId && x.Name==obj.Name);
            if (m == false)
            {
                if (string.IsNullOrEmpty(obj.Name))
                {
                    throw new BusinessException("Tên nhãn không hợp lệ");
                }

                obj.Id = GetKey(obj.UserId);
                obj.Name = obj.Name.ToLower();
                obj.CreatedDate = DateTime.Now;
                obj.UpdatedDate = DateTime.Now;
                this.Add(obj);
            }
            else
            {
                throw new BusinessException("Nhãn này đã có rồi");
            }
            //else
            //{
            //    if (IsOwnerOrAdmin(m.UserId, obj.UserId) == false) return null;
            //    m.Name = obj.Name;
            //    obj.UpdatedDate = DateTime.Now;
            //    m.Name = obj.Name;
            //    m.Score = obj.Score;
            //}
            this.Commit();
            return obj;
        }

        public void ReName(LeadTag obj)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == obj.Id);
            if (m != null)
            {
                if(_dbSet.AsNoTracking().Any(x=>x.UserId==obj.UserId && x.Name == obj.Name))
                {
                    throw new BusinessException("Nhãn này đã có rồi");
                }
                if (IsOwnerOrAdmin(m.UserId, obj.UserId) == false) return;
                m.Name = obj.Name.ToLower();
                this.Commit();
            }
        }

        public async Task<LeadTag> AddTag(LeadTagAddRequest model)
        {
            var tag = model.Tag.Id>0? model.Tag: IU(model.Tag);
            foreach(var item in model.LeadIds)
            {
                await (_dbContext as Model.PunnelContext).msp_Lead_AddTag(item,tag.Id);
            }
            return tag;
        }
        public async Task DeleteTag(LeadTagDeleteRequest model , string userId)
        {
            var col = _dbSet.FirstOrDefault(x => x.Id == model.Tag.Id);
            if (col != null)
            {
                //if (IsOwnerOrAdmin(col.UserId, userId) == false) return;
                foreach (var item in model.LeadIds)
                {
                    await (_dbContext as Model.PunnelContext).msp_Lead_RemoveTag(item, model.Tag.Id);
                }
            }
        }

        public async Task Delete(int id, string userId)
        {
            var col = _dbSet.FirstOrDefault(x => x.Id == id);
            if (col != null)
            {
                if (IsOwnerOrAdmin(col.UserId, userId) == false) return;
                await (_dbContext as Model.PunnelContext).msp_LeadTag_Remove(id);
            }
        }

    }
}
