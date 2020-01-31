using log4net;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class CollectionRepository : BaseRepository<Collection>, ICollectionRepository
    {
        public CollectionRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(CollectionRepository));
        /// <summary>
        /// Them, cap nhat User
        /// </summary>
        /// <param name="obj"></param>
        public void IU(Collection obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.Id== obj.Id);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {
                if (IsOwnerOrAdmin(m.UserId, obj.UserId) == false) return;
                m.Name = obj.Name;
                //m.Type = obj.Type;
                m.Deleted = obj.Deleted;
            }
            this.Commit();
            this.RemoveCache(obj.Id,obj.Type, obj.UserId);
        }

        public async Task<List<CollectionViewModel>> FrontEnd_GetCollection(string userId)
        {
            return await (_dbContext as Model.PunnelContext).msp_Collection_GetByUser(userId);
        }

        public virtual async Task<List<CollectionViewModel>> GetByType(int type, string userId)
        {
            return await(_dbContext as Model.PunnelContext).msp_Collection_GetByType(userId, type);
        }

        public virtual void Delete(Guid id,string userId)
        {
            var col = _dbSet.FirstOrDefault(x => x.Id == id);
            if (col == null) throw new Exception("not found");
            if (IsOwnerOrAdmin(col.UserId, userId) == false) return;
            uow.LandingPage.DeleteByGroup(id, userId);
            _dbSet.Remove(col);
            this.Commit();
        }

        #region cache
        public virtual void RemoveCache(Guid id, int type, string userId) { }
        #endregion
    }
}
