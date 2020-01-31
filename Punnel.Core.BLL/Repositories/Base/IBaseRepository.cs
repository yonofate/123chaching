using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        void SetDbContext(DbContext db);
        void Commit();
        Task CommitAsync();

        /// <summary>
        /// Lấy dữ tất cả dữ liệu của một Entity
        /// </summary>
        /// <returns></returns>
        List<T> GetAll();

        /// <summary>
        /// Lấy một Entity bằng Id kiểu int
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        T Get(int id);
        T Get(Guid id);

        /// <summary>
        /// Lấy một Entity bằng key
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        T Get(params object[] ids);

        /// <summary>
        /// Tạo một Entity trong DB
        /// </summary>
        /// <param name="entity"></param>
        void Add(T entity);

        /// <summary>
        /// Tạo một list entity trong db
        /// </summary>
        /// <param name="entities"></param>
        void AddRange(List<T> entities);

        /// <summary>
        /// Cập nhật một Entity trong DB
        /// </summary>
        /// <param name="entity"></param>

        void Update(T entity);

        void DetachAll();

        /// <summary>
        /// Xóa một Entity trong DB
        /// </summary>
        /// <param name="entity"></param>
        void Delete(T entity);

        /// <summary>
        /// Xóa một Entity bằng Id của nó.
        /// </summary>
        /// <param name="entity"></param>
        void Delete(int id);
        void Delete(Guid id);
        void Delete(int id, bool commit);

        /// <summary>
        /// Xóa nhiều records
        /// </summary>
        /// <param name="lstEntity"></param>
        void Deletes(List<T> lstEntity);


        /// <summary>
        /// Delete entity by its keys
        /// </summary>
        /// <param name="ids">key array. must be in order</param>
        void Delete(params object[] ids);

        void RemoveCache(int id);
        void RemoveCache(Guid id);
        void RemoveCacheByCode(string id);

        #region Cache
        T GetCacheValue<T>(string key);
        void LoadCache();
        void RefreshCache();
        void ClearCacheAll();
        #endregion

        #region Async
        Task<T> GetAsync(int id);
        Task<T> GetAsync(long id);
        Task<T> GetAsync(Guid id);
        #endregion
    }
}
