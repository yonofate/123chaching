using System;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IFormConfigRepository: IBaseRepository<FormConfig>
    {
        FormConfigViewModel GetDetail(Guid id);
        void IU(FormConfig obj);
        void Delete(Guid landingPageId, Guid integrationId);
        void DeleteByIntegration(Guid integrationId);
    }
}