using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IImageStockRepository: IBaseRepository<ImageStock>
    {
        Task<Tuple<List<ImageStockResult>, int>> SearchAsync(FileRequestModel req);
        Task<List<ImageStockResult>> GetByCate(Guid cateId);
        void UpdateCate(FileCollectionRequestModel files);
        void Delete(List<Guid> ids);
        void AddNew(ImageStock obj);
    }
}