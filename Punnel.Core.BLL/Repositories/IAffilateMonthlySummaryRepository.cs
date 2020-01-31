using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IAffilateMonthlySummaryRepository
    {
        List<AffilateMonthlySummary> Get(string userId);
        void Delete(string userId, int monthId);
        void IU(AffilateMonthlySummary obj);
        Task<AffilateSummaryModel> GetSummary(string userId);
        Task<AffilateSummaryMobileModel> GetSummaryForMobile(string userId, int monthId);
    }
}