using MBN.Utils.Caching;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class CacheImageStockRepository : ImageStockRepository
    {
        internal readonly static CacheHashtable HID = new CacheHashtable(Punnel.Core.Entities.Conts.CACHE_HASHTABLE_IMAGESTOCK);
        private static readonly Hashtable HList = Hashtable.Synchronized(new Hashtable());
        public CacheImageStockRepository(IUow uow) : base(uow) { }

        #region LoadCache
        public override void RemoveCache(Guid id)
        {
            string cacheId = string.Empty;

            cacheId = this.GetCacheKey(id);
            this.RemoveCache(cacheId);
        }
        #endregion

        public override async Task<List<ImageStockResult>> GetByCate(Guid type)
        {
            string cacheId = GetCacheKey(type);
            List<ImageStockResult> result = (List<ImageStockResult>)HList[cacheId];
            if (result != null && result.Count > 0) return result;

            // Memcache & RuntimeCache
            result = GetCacheList<ImageStockResult>(cacheId, true);
            if (result == null)
            {
                // Database
                result = await base.GetByCate(type);
                result.MemoryCache(cacheId, CacheExpiration.OneWeek, true);
            }

            HList[cacheId] = result;
            return result;
        }

        string GetCacheKey(Guid type)
        {
            return Punnel.Core.Entities.Conts.CACHE_HASHTABLE_IMAGESTOCK + "_list_" + type.ToString();
        }

        List<TEntity> GetCacheList<TEntity>(string key, bool usedHttpRuntimeCache)
        {
            return CacheManager.CacheClient.GetValue<List<TEntity>>(key, usedHttpRuntimeCache);
        }

        bool RemoveCache(string key)
        {
            return CacheManager.RemoveCache(key);
        }

    }
}
