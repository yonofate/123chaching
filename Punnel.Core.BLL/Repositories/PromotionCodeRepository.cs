using log4net;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class PromotionCodeRepository : BaseRepository<PromotionCode>, IPromotionCodeRepository
    {
        public PromotionCodeRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(PromotionCodeRepository));

        public void IU(PromotionCode obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.Code== obj.Code);
            if (m == null && string.IsNullOrEmpty(obj.Code)==false)
            {
                this.Add(obj);
            }
            else
            {
               // m.Code = obj.Code;
                m.Total = obj.Total;
                m.PromotionId = obj.PromotionId;
                m.TotalUsed = obj.TotalUsed;
            }
            this.Commit();
        }

        public async Task<PromotionViewModel> UseByCode(int serviceId,string code)
        {
            return await (_dbContext as Model.PunnelContext).msp_Promotion_UseByCode(serviceId,code);
        }

        public void UseByCode(string code)
        {
            var col = _dbSet.FirstOrDefault(x => x.Code == code);
            if(col!=null && col.TotalUsed<col.Total)
            {
                col.TotalUsed++;
            }
            this.Commit();
        }

        public async Task<Tuple<List<PromotionCodeSearchViewModel>, int>> Search(PromotionCodeQuery req)
        {
            return await (_dbContext as Model.PunnelContext).msp_PromotionCode_Search(req);
        }

        public void Delete(string code)
        {
            var col = _dbSet.FirstOrDefault(x => x.Code == code);
            if (col == null) throw new Exception("not found");
            _dbSet.Remove(col);
            this.Commit();
        }

    }
}
