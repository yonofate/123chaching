using System;
using Punnel.Core.Entities.Model;

namespace Punnel.Core.BLL.Repositories
{
    public interface IDownloadPageRepository: IBaseRepository<DownloadPage>
    {
        bool IsExists(Guid landingPageId);
        void IU(DownloadPage obj);
    }
}