using MBN.Utils.Caching;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class CacheFileRepository : FileRepository
    {
        internal readonly static CacheHashtable HID = new CacheHashtable(Punnel.Core.Entities.Conts.CACHE_HASHTABLE_FILE);
        public CacheFileRepository(IUow uow) : base(uow) { }

        #region LoadCache
        public override void LoadCache()
        {
            this.LoadCacheHastable(HID, this.LoadCacheById);
        }

        public override Hashtable LoadCacheById()
        {
            Hashtable h = Hashtable.Synchronized(new Hashtable());
            List<File> lst = this.GetAll();
            foreach (File item in lst)
            {
                h.Add((Guid)item.Id, item);
            }
            return h;
        }

        public override void RemoveCache(Guid id)
        {
            string cacheId = string.Empty;

            // hashtable
            this.RemoveCache(HID.Key);
            this.RemoveCache(HID.KeyVersion);

            // get all
            cacheId = this.GetCacheKey(Punnel.Core.Entities.Conts.CACHE_KEY_ALL);
            this.RemoveCache(cacheId);

            // remove item
            cacheId = this.GetCacheKey(id);
            this.RemoveCache(cacheId);
            HID.Remove(id.ToString());
        }
        #endregion

        public override File Get(Guid id)
        {
            string cacheId = this.GetCacheKey(id);
            File result = HID.GetCache<File>(cacheId, id.ToString());
            if (result != null) return result;

            result = base.Get(id);
            return result.MemoryCache(cacheId, HID, id.ToString());
        }

    }
}
