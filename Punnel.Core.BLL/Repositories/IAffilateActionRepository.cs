using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IAffilateActionRepository : IBaseRepository<AffilateAction>
    {
        void Delete(string userId, string owner);
        Task<List<AffilateUserModel>> GetByOwner(string owner, string action);
        Task<List<AffilateChartViewModel>> GetAffilateChart_Action(string owner, string timeType = "");
        void AddNew(AffilateAction obj);
        void Expired(AffilateAction obj);
        void Paid(AffilateAction obj);
    }
}