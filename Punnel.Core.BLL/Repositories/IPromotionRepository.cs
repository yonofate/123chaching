using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public interface IPromotionRepository: IBaseRepository<Promotion>
    {

        Task<List<OptionViewModel>> Options();
        Task<Tuple<List<PromotionSearchViewModel>, int>> Search(PromotionQuery req);
        void IU(Promotion obj);
    }
}