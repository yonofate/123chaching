using Punnel.Core.Entities.Model;

namespace Punnel.Core.BLL.Repositories
{
    public interface IServiceQuotaRepository: IBaseRepository<ServiceQuota>
    {
        ServiceQuota GetByLevel(int levelId);
    }
}