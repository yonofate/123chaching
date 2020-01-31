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
    public class CacheServiceQuotaRepository : ServiceQuotaRepository
    {
        internal readonly static CacheHashtable HID = new CacheHashtable(Punnel.Core.Entities.Conts.CACHE_HASHTABLE_COLLECTION);
        private static readonly Hashtable HList = Hashtable.Synchronized(new Hashtable());
        public CacheServiceQuotaRepository(IUow uow) : base(uow) { }

        #region LoadCache
        public override void LoadCache()
        {
            this.LoadCacheHastable(HID, this.LoadCacheById);
        }

        public override Hashtable LoadCacheById()
        {
            Hashtable h = Hashtable.Synchronized(new Hashtable());
            List<ServiceQuota> lst = this.GetAll();
            foreach (ServiceQuota item in lst)
            {
                h.Add((int)item.LevelId, item);
            }
            return h;
        }

        public override void RemoveCache(int id)
        {
            string cacheId = string.Empty;

            // hashtable
            this.RemoveCache(HID.Key);
            this.RemoveCache(HID.KeyVersion);

            // remove item
            cacheId = this.GetCacheKey(id);
            this.RemoveCache(cacheId);
            HList[cacheId] = null;
            HID.Remove(id.ToString());
        }
        #endregion

        public override ServiceQuota GetByLevel(int id)
        {
            if (HID.CacheClient.ContainsKey(id) == true)
            {
                return (ServiceQuota)HID.CacheClient[id];
            }
            ServiceQuota result = base.Get(id);
            HID.Add(id, result);
            return result;
        }

    }
}
