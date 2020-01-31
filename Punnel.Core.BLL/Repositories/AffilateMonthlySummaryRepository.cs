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
    public class AffilateMonthlySummaryRepository : BaseRepository<AffilateMonthlySummary>, IAffilateMonthlySummaryRepository
    {
        public AffilateMonthlySummaryRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(AffilateMonthlySummaryRepository));

        public List<AffilateMonthlySummary> Get(string userId)
        {
            return _dbSet.AsNoTracking().Where(x => x.UserId == userId).OrderByDescending(x=>x.MonthId).ToList();
        }
        public void IU(AffilateMonthlySummary obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.UserId== obj.UserId && x.MonthId==obj.MonthId);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {               
                m.Level = obj.Level;
                m.SubcribleAmount = obj.SubcribleAmount;
            }
            this.Commit();
        }

        public void Delete(string userId, int monthId)
        {
            var col = _dbSet.FirstOrDefault(x => x.UserId == userId && x.MonthId==monthId);
            if (col == null) throw new Exception("not found");
            _dbSet.Remove(col);
            this.Commit();
        }

        public async Task<AffilateSummaryModel> GetSummary(string userId)
        {
            return await (_dbContext as Model.PunnelContext).msp_FrontEnd_GetAffilateSummary(userId);
        }

        public async Task<AffilateSummaryMobileModel> GetSummaryForMobile(string userId, int monthId)
        {
            return await (_dbContext as Model.PunnelContext).msp_FrontEnd_GetAffilateSummary_Mobile(userId, monthId);
        }

    }
}
