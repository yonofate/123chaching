using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface ILeadFilterRepository: IBaseRepository<LeadFilter>
    {
        void Delete(int id, string userId);
        Task<List<LeadFilterViewModel>> GetByUser(string userId);
        LeadFilter IU(LeadFilter obj);
    }
}