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
    public class HistoryPageRepository : BaseRepository<HistoryPage>, IHistoryPageRepository
    {
        public HistoryPageRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(HistoryPageRepository));
        public async Task<List<HistoryViewModel>> GetByLandingPage(Guid landingPageId)
        {
            var res = await (_dbContext as Model.PunnelContext).msp_HistoryPage_GetByLandingPage(landingPageId);
            return res;
        }
        public async Task<HistoryPage> GetById(long id, Guid landingPageId)
        {
            var res = await (_dbContext as Model.PunnelContext).msp_HistoryPage_GetById(id,landingPageId);
            return res.FirstOrDefault();
        }

        public void Save(HistoryPage obj)
        {
            var m = _dbSet.AsNoTracking().Count(x => x.LandingPageId == obj.LandingPageId);
            if (m>5)
            {
                var col = _dbSet.FirstOrDefault(x => x.LandingPageId == obj.LandingPageId);
                col.Source = obj.Source;
                col.SavedDate = DateTime.Now;
                this.Commit();
            }
            else
            {
                obj.Id = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                obj.SavedDate = DateTime.Now;
                this.Add(obj);
                this.Commit();
            }
        }

        public void DeleteOldest(Guid landingPageId)
        {
            var col = _dbSet.FirstOrDefault(x => x.LandingPageId == landingPageId);
            if (col != null) _dbSet.Remove(col);
            this.Commit();
        }

        public void Delete(long id, Guid landingPageId)
        {
            var col = _dbSet.FirstOrDefault(x => x.LandingPageId == landingPageId && x.Id==id);
            if (col != null) _dbSet.Remove(col);
            this.Commit();
        }
    }
}
