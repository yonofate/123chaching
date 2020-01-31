using log4net;
using MBN.Utils.Caching;
using Punnel.Core.Entities;
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
    public class CacheTemplateCategoryRepository : TemplateCategoryRepository
    {
        private readonly static ILog _log = LogManager.GetLogger("CacheTemplateCategoryRepository");
        internal readonly static CacheHashtable HID = new CacheHashtable(Punnel.Core.Entities.Conts.CACHE_HASHTABLE_TEMPLATE_CATEGORY);
        private static readonly Hashtable HList = Hashtable.Synchronized(new Hashtable());
        public CacheTemplateCategoryRepository(IUow uow) : base(uow) { }

        public override void RefreshCache()
        {
            #region Remove cache
            string cacheId = string.Empty;

            var lst = this.GetAll();
            foreach (var item in lst)
            {
                if (item.Type > 0) continue;
                cacheId = this.GetCacheKey("GetByParentId", item.Type);
                this.RemoveCache(cacheId);
            }

            // GetAll()
            cacheId = this.GetCacheKey(Entities.Conts.CACHE_KEY_ALL);
            this.RemoveCache(cacheId);

            // Clear
            HID.Clear();
            HList.Clear();

            #endregion

            #region Load cache
            this.LoadCache();
            #endregion
        }

        #region LoadCache
        public override void LoadCache()
        {
            this.LoadCacheHastable(HID, this.LoadCacheById);
        }

        public override Hashtable LoadCacheById()
        {
            Hashtable h = Hashtable.Synchronized(new Hashtable());
            List<TemplateCategory> lst = this.GetAll();
            foreach (TemplateCategory item in lst)
            {
                h.Add((Guid)item.Id, item);
            }
            return h;
        }

        public override void RemoveCache(Guid id, int type)
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
            this.RemoveCache(cacheId.ToString());

            cacheId = this.GetCacheKey("GetByParentId", type);
            this.RemoveCache(cacheId.ToString());
            HID.Remove(id.ToString());
            HList[type] = null;
        }
        #endregion

        public override TemplateCategory Get(Guid id)
        {
            if (HID.CacheClient.ContainsKey(id) == true)
            {
                return (TemplateCategory)HID.CacheClient[id];
            }
            TemplateCategory result = base.Get(id);
            HID.Add(id, result);
            return result;
        }

        public override async Task<TemplateCategoryViewModel> GetByCode(string code)
        {
            if (HID.CacheClient.ContainsKey(code) == true)
            {
                return (TemplateCategoryViewModel)HID.CacheClient[code];
            }
            TemplateCategoryViewModel result = await base.GetByCode(code);
            HID.Add(code, result);
            return result;
        }

        public override async Task<List<TemplateCategoryViewModel>> GetByType(int type)
        {
            List<TemplateCategoryViewModel> result = (List<TemplateCategoryViewModel>)HList[type];
            if (result != null && result.Count > 0) return result;

            string cacheId = this.GetCacheKey("GetByParentId", type);

            // Memcache & RuntimeCache
            result = this.GetCacheList<TemplateCategoryViewModel>(cacheId, true);
            if (result == null)
            {
                // Database
                result = await base.GetByType(type);
                result.MemoryCache(cacheId, CacheExpiration.OneMonth, true);
            }

            HList[type] = result;
            return result;
        }
    }
}
