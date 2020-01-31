using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IHistoryPageRepository: IBaseRepository<HistoryPage>
    {
        Task<HistoryPage> GetById(long id, Guid landingPageId);
        void DeleteOldest(Guid landingPageId);
        Task<List<HistoryViewModel>> GetByLandingPage(Guid landingPageId);
        void Save(HistoryPage obj);
        void Delete(long id, Guid landingPageId);
    }
}