using Punnel.Core.Entities.Model;

namespace Punnel.Core.BLL.Repositories
{
    public interface IServiceRepository: IBaseRepository<Service>
    {
        void IU(Service obj);
    }
}