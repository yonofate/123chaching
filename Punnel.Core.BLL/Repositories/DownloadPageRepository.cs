using Punnel.Core.Entities.Model;
using System;
using System.Linq;


namespace Punnel.Core.BLL.Repositories
{
    public class DownloadPageRepository : BaseRepository<DownloadPage>, IDownloadPageRepository
    {
        public DownloadPageRepository(IUow uow) : base(uow) { }

        public bool IsExists(Guid landingPageId)
        {
            return _dbSet.AsNoTracking().Any(x =>x.LandingPageId == landingPageId && x.Deleted==false);
        }
        public void IU(DownloadPage obj)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == obj.Id);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {
                m.LandingPageId = obj.LandingPageId;
                m.UserId = obj.UserId;
                m.Deleted = obj.Deleted;
            }
            this.Commit();
        }

        public override void Delete(Guid id)
        {
            var DownloadPage = _dbSet.Find(id);
            _dbSet.Remove(DownloadPage);
            this.Commit();
            this.RemoveCache(id);
        }
    }
}
