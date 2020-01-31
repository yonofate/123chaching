using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IPromotionCodeRepository: IBaseRepository<PromotionCode>
    {
        void Delete(string code);
        void IU(PromotionCode obj);
        Task<PromotionViewModel> UseByCode(int serviceId, string code);
        void UseByCode(string code);
        Task<Tuple<List<PromotionCodeSearchViewModel>, int>> Search(PromotionCodeQuery req);
    }
}