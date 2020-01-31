using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface ICollectionRepository: IBaseRepository<Collection>
    {
        Task<List<CollectionViewModel>> FrontEnd_GetCollection(string userId);
        Task<List<CollectionViewModel>> GetByType(int type, string userId);
        void IU(Collection obj);
        void Delete(Guid id, string userId);
    }
}