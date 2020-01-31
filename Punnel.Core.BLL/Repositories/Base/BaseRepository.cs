using Punnel.Core.Entities;
using Punnel.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Linq;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Collections;
using MBN.Utils.Caching;

namespace Punnel.Core.BLL.Repositories
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private IUow _uow = null;
        public IUow uow
        {
            get { if (_uow == null) _uow = ObjectFactory.GetInstance<IUow>(); return _uow; }
        }
        private PunnelDataContext _l2qContext = null;
        public PunnelDataContext L2qContext
        {
            get
            {
                if (_l2qContext == null) _l2qContext = new PunnelDataContext(this.GetConnectionString()) { ObjectTrackingEnabled = false };
                return _l2qContext;
            }
        }

        protected DbContext _dbContext;
        protected DbSet<T> _dbSet;
        protected string _tableName { get; private set; }
        internal string GetConnectionString()
        {
            return _dbContext.Database.Connection.ConnectionString;
        }

        public BaseRepository(IUow uow)
        {
            if (uow == null)
            {
                throw new ArgumentNullException("uow is null");
            }

            _uow = uow;
            _dbContext = _uow.dbContext;
            _dbSet = _dbContext.Set<T>();
            _tableName = "Punnel_" + typeof(T).Name;
        }

        public BaseRepository(IUow uow, DbContext db)
        {
            if (uow == null)
            {
                throw new ArgumentNullException("uow is null");
            }

            _uow = uow;
            _dbContext = db;
            _dbSet = _dbContext.Set<T>();
            _tableName = "Punnel_" + typeof(T).Name;
        }

        public void SetDbContext(DbContext db)
        {
            _dbContext = db;
            _dbSet = _dbContext.Set<T>();
            _tableName = "Punnel_" + typeof(T).Name;
        }

        public DbContext CreateDbContext()
        {
            var ctx = new PunnelContext();
            ctx.Configuration.ProxyCreationEnabled = false;
            ctx.Configuration.LazyLoadingEnabled = false;
            ctx.Configuration.ValidateOnSaveEnabled = false;
            return ctx;
        }

        public void Commit()
        {
            _dbContext.SaveChanges();
        }

        public async Task CommitAsync()
        {
            await _dbContext.SaveChangesAsync();
        }


        public virtual T Get(int id)
        {
            return _dbSet.Find(id);
        }
        public virtual T Get(Guid id)
        {
            return _dbSet.Find(id);
        }

        public virtual T Get(byte id)
        {
            return _dbSet.Find(id);
        }

        public virtual T Get(params object[] ids)
        {
            return _dbSet.Find(ids);
        }

        public virtual List<T> GetAll()
        {
            return _dbSet.AsNoTracking().ToList();
        }

        public void Add(T entity)
        {
            PreConditionAdd(entity);
            PreConditionUpdate(entity);
            DbEntityEntry dbEntityEntry = _dbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Detached)
            {
                dbEntityEntry.State = EntityState.Added;
            }
            else
            {
                _dbSet.Add(entity);
            }
        }

        /// <summary>
        /// Thực hiện trước khi update
        /// </summary>
        public virtual void PreConditionUpdate(T entity)
        {
            Type entityType = entity.GetType();
            var updatedUserFieldProperty = entityType.GetProperty("UpdatedBy");
            var updatedDateFieldProperty = entityType.GetProperty("UpdatedDate");
            if (updatedUserFieldProperty == null || updatedDateFieldProperty == null) return;

            string userName = System.Threading.Thread.CurrentPrincipal.Identity.IsAuthenticated ? System.Threading.Thread.CurrentPrincipal.Identity.Name : "System";

            DbEntityEntry<T> dbEntityEntry = _dbContext.Entry(entity);
            var pros = entity.GetType().GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);

            var pro_UpdateDate = pros.FirstOrDefault(x => x.Name == updatedDateFieldProperty.Name);
            if (pro_UpdateDate != null)
                pro_UpdateDate.SetValue(entity,DateTime.Now);

            var pro_UpdateBy = pros.FirstOrDefault(x => x.Name == updatedUserFieldProperty.Name);
            if (pro_UpdateBy != null)
                pro_UpdateBy.SetValue(entity, userName);
        }

        public virtual void PreConditionAdd(T entity)
        {
            Type entityType = entity.GetType();
            var updatedUserFieldProperty = entityType.GetProperty("CreatedBy");
            var updatedDateFieldProperty = entityType.GetProperty("CreatedDate");
            if (updatedUserFieldProperty == null || updatedDateFieldProperty == null) return;

            string userName = System.Threading.Thread.CurrentPrincipal.Identity.IsAuthenticated ? System.Threading.Thread.CurrentPrincipal.Identity.Name : "System";

            DbEntityEntry<T> dbEntityEntry = _dbContext.Entry(entity);
            var pros = entity.GetType().GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);

            var pro_UpdateDate = pros.FirstOrDefault(x => x.Name == updatedDateFieldProperty.Name);
            if (pro_UpdateDate != null)
                pro_UpdateDate.SetValue(entity, DateTime.Now);

            var pro_UpdateBy = pros.FirstOrDefault(x => x.Name == updatedUserFieldProperty.Name);
            if (pro_UpdateBy != null)
                pro_UpdateBy.SetValue(entity, userName);
        }

        public void Update(T entity)
        {
            PreConditionUpdate(entity);
            DbEntityEntry<T> dbEntityEntry = _dbContext.Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                object[] keys = _dbContext.GetEntityKey(entity);
                T attached = _dbSet.Find(keys);
                if (attached == null)
                {
                    _dbSet.Attach(entity);
                    dbEntityEntry.State = EntityState.Modified;
                }
                else
                {
                    _dbContext.Entry(attached).CurrentValues.SetValues(entity);
                }
            }
        }

        public void DetachAll()
        {
            _dbSet.Local.ToList().ForEach(x =>
            {
                _dbContext.Entry(x).State = EntityState.Detached;
            });
        }

        /// <summary>
        /// Xóa nhiều entity
        /// </summary>
        /// <param name="lstEntity"></param>
        public void Deletes(List<T> lstEntity)
        {
            foreach (var item in lstEntity)
            {
                Delete(item);
            }
        }

        public void Delete(T entity)
        {
            throw new NotImplementedException();

            //DbEntityEntry dbEntityEntry = _dbContext.Entry(entity);
            //if (dbEntityEntry.State == EntityState.Detached)
            //{
            //    _dbSet.Attach(entity);
            //}
            //else if (dbEntityEntry.State != EntityState.Deleted)
            //{
            //    dbEntityEntry.State = EntityState.Deleted;
            //}
            //else
            //{
            //    _dbSet.Remove(entity);
            //}
        }

        public virtual void Delete(int id)
        {
            var entity = _dbSet.Find(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                _dbContext.SaveChanges();
            }
        }

        public virtual void Delete(int id, bool commit)
        {
            var entity = _dbSet.Find(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                if (commit == true)
                {
                    _dbContext.SaveChanges();
                }
            }
        }

        public virtual void Delete(Guid id)
        {
            var entity = _dbSet.Find(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                _dbContext.SaveChanges();
            }
        }

        public void AddRange(List<T> entities)
        {
            _dbSet.AddRange(entities);
        }

        public virtual void Delete(params object[] ids)
        {
            var entity = _dbSet.Find(ids);
            if (entity != null)
            {
                _dbSet.Remove(entity);
            }
        }

        public virtual string ToJson(int id)
        {
            var obj= _dbSet.Find(id);
            return Newtonsoft.Json.JsonConvert.SerializeObject(obj);
        }

        #region Async
        public virtual async Task<T> GetAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }
        public virtual async Task<T> GetAsync(long id)
        {
            return await _dbSet.FindAsync(id);
        }
        public virtual async Task<T> GetAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }
        #endregion

        #region Cache

        #region GetCacheKey
        public string GetCacheKey(string key)
        {
            return _tableName + "_" + key;
        }
        public string GetCacheKey(int key)
        {
            return _tableName + "_" + key.ToString();
        }

        public string GetCacheKey(Guid key)
        {
            return _tableName + "_" + key.ToString();
        }

        public string GetCacheKey(string prefix, int key)
        {
            return _tableName + "_" + prefix + "_" + key.ToString();
        }

        public string GetCacheKey(params object[] keys)
        {
            string key = _tableName;
            for (int i = 0; i < keys.Length; i++)
            {
                key += "_" + keys[i].ToString();
            }
            return key;
        }
        #endregion


        /// <summary>
        /// Khởi tạo Cache cho các bảng danh mục
        /// </summary>
        public virtual void LoadCache() { }
        public virtual void RefreshCache() { }

        /// <summary>
        /// Tạo Hashtable theo PrimaryKey của bảng danh mục tương ứng
        /// </summary>
        /// <returns></returns>
        public virtual Hashtable LoadCacheById() { return null; }

        /// <summary>
        /// Cập nhật Cache Hashtable cho các bảng dữ liệu danh mục
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="actionLoad"></param>
        public void LoadCacheHastable(CacheHashtable obj, Func<Hashtable> actionLoad)
        {
            try
            {
                // Check cache version (cacheVersion = 0: Refresh Cache)
                long cacheVersion = this.GetCacheValue(obj.KeyVersion, (long)0);

                if (obj.CacheVersion < cacheVersion || cacheVersion == 0)
                {
                    Hashtable h = null;

                    if (cacheVersion != 0)
                    {
                        h = h.GetCache(obj.Key); // load hashtable from cache
                    }

                    if (h == null)
                    {
                        // load from db
                        h = actionLoad();

                        cacheVersion = DateTime.Now.Ticks;
                        h.MemoryCache(obj.Key, CacheExpiration.OneMonth);
                        cacheVersion.MemoryCache(obj.KeyVersion, CacheExpiration.OneMonth);
                    }
                    obj.CacheVersion = cacheVersion;

                    System.Threading.Interlocked.Exchange(ref obj.CacheClient, Hashtable.Synchronized(h));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Cập nhật Cache khi có sự thay đổi entity CRUD
        /// </summary>
        /// <param name="entity"></param>
        public virtual void UpdateCache(T entity) { }

        public virtual void UpdateCache(T entity, bool delete)
        {
            // do nothing
        }

        public object GetCacheValue(string key)
        {
            return CacheManager.CacheClient.GetValue(key);
        }

        public string GetCacheValue(string key, string def)
        {
            return CacheManager.CacheClient.GetValue(key, def);
        }

        public int GetCacheValue(string key, int def)
        {
            return CacheManager.CacheClient.GetValue(key, def);
        }

        public long GetCacheValue(string key, long def)
        {
            return CacheManager.CacheClient.GetValue(key, def);
        }

        public T GetCacheValue<T>(string key)
        {
            return CacheManager.CacheClient.GetValue<T>(key);
        }

        /// <summary>
        /// Lấy một danh sách đã Cache
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public List<TEntity> GetCacheList<TEntity>(string key)
        {
            return (List<TEntity>)CacheManager.CacheClient.GetValue(key);
        }

        /// <summary>
        /// Lấy một danh sách đã Cache
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="key"></param>
        /// <param name="usedHttpRuntimeCache">Ưu tiên lấy từ HttpRuntime.Cache</param>
        /// <returns></returns>
        public List<TEntity> GetCacheList<TEntity>(string key, bool usedHttpRuntimeCache)
        {
            return CacheManager.CacheClient.GetValue<List<TEntity>>(key, usedHttpRuntimeCache);
        }

        /// <summary>
        /// Xóa Cache liên quan khi thay đổi dữ liệu CRUD
        /// </summary>
        /// <param name="id"></param>
        public virtual void RemoveCache(int id)
        {
        }
        public virtual void RemoveCache(Guid id)
        {
        }

        public virtual void RemoveCacheByCode(string id)
        {
        }
        public bool RemoveCache(string key)
        {
            return CacheManager.RemoveCache(key);
        }
        public void ClearCacheAll()
        {
            CacheManager.CacheClient.FlushAll();
        }
        #endregion

        #region Helper
        internal int GetStartIndex(ref int pageIndex, int pageSize)
        {
            pageIndex = Math.Max(0, pageIndex - 1);
            return pageIndex * pageSize;
        }
        internal bool IsOwnerOrAdmin(string userId_x, string userId)
        {
            return (userId_x == userId || userId == Entities.Conts.Cpanel_user);
        }

        internal bool IsEditorOrAdmin(string role)
        {
            return (role=="admin" || role =="editor");
        }
        #endregion

    }
}
