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
    public class AutomationRepository : BaseRepository<Automation>, IAutomationRepository
    {
        public AutomationRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(AutomationRepository));
        /// <summary>
        /// Them, cap nhat User
        /// </summary>
        /// <param name="obj"></param>
        public void IU(Automation obj)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == obj.Id);
            if (m == null)
            {
                if(!_dbSet.Any(x => x.LandingPageId == obj.LandingPageId && x.TemplateId == obj.TemplateId))
                {
                    this.Add(obj);
                }               
            }
            else
            {
                if (IsOwnerOrAdmin(m.UserId, obj.UserId) == false) return;
                m.TemplateId = obj.TemplateId;
                m.Type = obj.Type;
                m.DelayHour = obj.DelayHour;
                m.DelayMin = obj.DelayMin;
                m.IsEnable = obj.IsEnable;
            }
            this.Commit();
        }

        public async Task<List<AutomationViewModel>> GetByPage(Guid pageId)
        {
            return await (_dbContext as Model.PunnelContext).msp_Automation_GetByPage(pageId);
        }

        public virtual async Task<List<AutomationViewModel>> GetByType(string userId)
        {
            return await (_dbContext as Model.PunnelContext).msp_Automation_GetByUser(userId);
        }

        public virtual void Delete(Guid id, string userId)
        {
            var col = _dbSet.FirstOrDefault(x => x.Id == id);
            if (col == null) throw new Exception("not found");
            if (IsOwnerOrAdmin(col.UserId, userId) == false) return;
            _dbSet.Remove(col);
            this.Commit();
        }

        public void DeleteByTemplateId(int templateId, string userId)
        {
            var col = _dbSet.Where(x => x.TemplateId == templateId && x.UserId== userId).ToList();
            if (col.Count > 0)
            {
                _dbSet.RemoveRange(col);
                this.Commit();
            }
        }
    }
}
