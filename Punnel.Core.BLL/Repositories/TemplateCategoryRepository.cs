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
    public class TemplateCategoryRepository : BaseRepository<TemplateCategory>, ITemplateCategoryRepository
    {
        private readonly static ILog _log = LogManager.GetLogger("TemplateCategoryRepository");
        public TemplateCategoryRepository(IUow uow) : base(uow) { }

        public virtual async Task<List<TemplateCategoryViewModel>> GetByType(int type)
        {
            return await(_dbContext as Model.PunnelContext).msp_TemplateCategory_GetByType(type);
        }

        public virtual async Task<TemplateCategoryViewModel> GetByCode(string code)
        {
            return await (_dbContext as Model.PunnelContext).msp_TemplateCategory_GetByCode(code);
        }
        /// <summary>
        /// Them, cap nhat User
        /// </summary>
        /// <param name="obj"></param>
        public void IU(TemplateCategory obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.Id== obj.Id);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {
                m.Name = obj.Name;
            }
            this.Commit();
            this.RemoveCache(obj.Id);
            this.RemoveCache(obj.Type);
        }

        public override void Delete(Guid id)
        {
            var col = _dbSet.FirstOrDefault(x => x.Id == id);
            var isUsed = uow.Template.IsUsedCate(id);
            _dbSet.Remove(col);
            this.Commit();
            this.RemoveCache(id, col.Type);
        }

        #region PULL Data
        public void IU_FromSrc(TemplateCategory obj)
        {
            var m = _dbSet.FirstOrDefault(x => x.ReferId == obj.ReferId);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {
                m.Name = obj.Name;
            }
            this.Commit();
        }
        #endregion

        #region cache
        public virtual void RemoveCache(Guid id, int type) { }
        #endregion
    }
}
