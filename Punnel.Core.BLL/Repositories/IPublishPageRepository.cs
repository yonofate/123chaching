using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IPublishPageRepository: IBaseRepository<PublishPage>
    {
        List<PublishPage> GetForSysTracking();
        void IU(PublishPage obj);
        void AddSysTracking(PublishPage obj);
        Task TestSSL();
    }
}