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
    public class PromotionRepository : BaseRepository<Promotion>, IPromotionRepository
    {
        public PromotionRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(PromotionRepository));

        public void IU(Promotion obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.Id== obj.Id);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {
                m.Name = obj.Name;
                m.IsDiscountPercent = obj.IsDiscountPercent;
                m.ServiceId = obj.ServiceId;
                m.ActiveDate = obj.ActiveDate;
                m.ExpiredDate = obj.ExpiredDate;
                m.Discount = obj.Discount;
            }
            this.Commit();
            //this.RemoveCache(obj.Id);
        }

        public async Task<Tuple<List<PromotionSearchViewModel>, int>> Search(PromotionQuery req)
        {
            return await (_dbContext as Model.PunnelContext).msp_Promotion_Search(req);
        }

        public async Task<List<OptionViewModel>> Options()
        {
            return await (_dbContext as Model.PunnelContext).msp_Promotion_GetForEnum();
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
