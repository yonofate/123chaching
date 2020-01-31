using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IDomainRepository: IBaseRepository<Domain>
    {
        Task<List<DomainViewModel>> GetByUser(string userId);        
        void AddDomain(Domain obj);
        void IU(Domain obj);
        void Verify(string id,string userId);
        void Delete(string id, string userId);
        bool IsNotOwner(string domain, string userId);
    }
}