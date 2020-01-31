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
    public class CacheCollectionRepository : CollectionRepository
    {
        internal readonly static CacheHashtable HID = new CacheHashtable(Punnel.Core.Entities.Conts.CACHE_HASHTABLE_COLLECTION);
        private static readonly Hashtable HList = Hashtable.Synchronized(new Hashtable());
        public CacheCollectionRepository(IUow uow) : base(uow) { }

        #region LoadCache
        public override void LoadCache()
        {
            this.LoadCacheHastable(HID, this.LoadCacheById);
        }

        public override Hashtable LoadCacheById()
        {
            Hashtable h = Hashtable.Synchronized(new Hashtable());
            List<Collection> lst = this.GetAll();
            foreach (Collection item in lst)
            {
                h.Add((Guid)item.Id, item);
            }
            return h;
        }

        public override void RemoveCache(Guid id, int type, string userId)
        {
            string cacheId = string.Empty;

            // hashtable
            this.RemoveCache(HID.Key);
            this.RemoveCache(HID.KeyVersion);

            // remove item
            cacheId = this.GetCacheKey(userId, 1);
            this.RemoveCache(cacheId);
            HList[cacheId] = null;
            cacheId = this.GetCacheKey(userId, 2);
            this.RemoveCache(cacheId);
            HList[cacheId] = null;
            HID.Remove(id.ToString());
        }
        #endregion

        public override Collection Get(Guid id)
        {
            if (HID.CacheClient.ContainsKey(id) == true)
            {
                return (Collection)HID.CacheClient[id];
            }
            Collection result = base.Get(id);
            HID.Add(id, result);
            return result;
        }

        public override async Task<List<CollectionViewModel>> GetByType(int type, string userId)
        {
            string cacheId = this.GetCacheKey(userId, type);
            List<CollectionViewModel> result = (List<CollectionViewModel>)HList[cacheId];
            if (result != null && result.Count > 0) return result;

            // Memcache & RuntimeCache
            result = this.GetCacheList<CollectionViewModel>(cacheId, true);
            if (result == null)
            {
                // Database
                result = await base.GetByType(type, userId);
                result.MemoryCache(cacheId, CacheExpiration.OneWeek, true);
            }

            HList[cacheId] = result;
            return result;
        }

        public override void Delete(Guid id, string userId)
        {
            this.RemoveCache(id,0,userId);
            base.Delete(id,userId);
        }

    }
}
