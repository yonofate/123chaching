using Punnel.Core.Entities.Model;

namespace Punnel.Core.BLL.Repositories
{
    public interface ISendMailTrackingRepository: IBaseRepository<SendMailTracking>
    {
        void IU(SendMailTracking obj);
    }
}