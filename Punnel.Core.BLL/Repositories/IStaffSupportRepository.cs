using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IStaffSupportRepository: IBaseRepository<StaffSupport>
    {
        void Delete(string staffId, string custommerId);
        Task<List<StaffProfileViewModel>> GetStaffByCustomer(string customerId);
        void IU(StaffSupport obj);
        void UpdateStaffSupport(StaffSupportRequest model);
        void DeleteByCustomer(string custommerId);
    }
}