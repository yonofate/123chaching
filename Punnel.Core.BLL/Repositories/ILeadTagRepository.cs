using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface ILeadTagRepository: IBaseRepository<LeadTag>
    {
        Task Delete(int id, string userId);
        Task DeleteTag(LeadTagDeleteRequest model, string userId);
        List<LeadTag> GetByUser(string userId);
        LeadTag IU(LeadTag obj);
        Task<LeadTag> AddTag(LeadTagAddRequest model);
        void ReName(LeadTag obj);
    }
}