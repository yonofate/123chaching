using MBN.Utils.Caching;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class CacheLandingPageRepository : LandingPageRepository
    {
        internal readonly static CacheHashtable HID = new CacheHashtable(Punnel.Core.Entities.Conts.CACHE_HASHTABLE_COLLECTION);
        //private static readonly Hashtable HList = Hashtable.Synchronized(new Hashtable());
        public CacheLandingPageRepository(IUow uow) : base(uow) { }

        #region LoadCache
        public override void RemoveCache(Guid id, string type)
        {
            string cacheId = this.GetCacheKey(id, type);
            this.RemoveCache(cacheId);
        }

        public override void RemoveCache(Guid id)
        {
            string cacheId = this.GetCacheKey(id);
            this.RemoveCache(cacheId);
        }

        #endregion

        public override async Task<LandingPageItemModel> FrontEnd_GetLandingPage(Guid id, string type)
        {
            string cacheId = this.GetCacheKey(id,type);
            LandingPageItemModel result = cacheId.GetCache<LandingPageItemModel>();
            if (result != null) return result;

            result = await base.FrontEnd_GetLandingPage(id,type);
            return result.MemoryCache(cacheId);
        }

    }
}
