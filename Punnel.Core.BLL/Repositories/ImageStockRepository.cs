using log4net;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class ImageStockRepository : BaseRepository<ImageStock>, IImageStockRepository
    {
        public ImageStockRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(ImageStockRepository));
        /// <summary>
        /// Them, cap nhat User
        /// </summary>
        /// <param name="obj"></param>

        public virtual async Task<List<ImageStockResult>> GetByCate(Guid cateId)
        {
            return await (_dbContext as Model.PunnelContext).msp_ImageStock_GetByCate(cateId);
        }

        public async Task<Tuple<List<ImageStockResult>, int>> SearchAsync(FileRequestModel req)
        {
            return await (_dbContext as Model.PunnelContext).msp_ImageStock_SearchAsync(req);
        }

        public void AddNew(ImageStock obj)
        {
            if (_dbSet.AsNoTracking().Any(x => x.Path == obj.Path) == false)
            {
                this.Add(obj);
                this.Commit();
                //if(obj.CateId.HasValue) this.RemoveCache(obj.CateId.Value);
            }
        }
        public void UpdateCate(FileCollectionRequestModel files)
        {
            foreach (var item in files.Ids)
            {
                var f = _dbSet.SingleOrDefault(x => x.Id == item);
                if (f != null)
                {
                    if (f.CateId.HasValue) this.RemoveCache(f.CateId.Value);
                    f.CateId = files.CollectionId;
                    
                }
            }
            //if (files.CollectionId.HasValue) this.RemoveCache(files.CollectionId.Value);
            this.Commit();
        }

        public void Delete(List<Guid> ids)
        {
            foreach (var id in ids)
            {
                var file = _dbSet.Find(id);
                if (file != null)
                {
                    _dbSet.Remove(file);
                    this.Commit();
                    //if(file.CateId.HasValue) this.RemoveCache(file.CateId.Value);
                }
            }
        }
    }
}
