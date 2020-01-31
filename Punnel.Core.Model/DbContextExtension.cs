using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Core.Objects;
using System.Threading.Tasks;

namespace Punnel.Core.Model
{
    public static class DbContextExtension
    {
        /// <summary>
        /// Lấy danh sách giá trị của khóa chính của một Entity
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public static object[] GetEntityKey<T>(this DbContext context, T entity)
        {

            var oc = ((IObjectContextAdapter)context).ObjectContext;
            var keys = oc.MetadataWorkspace.GetEntityContainer(oc.DefaultContainerName, System.Data.Entity.Core.Metadata.Edm.DataSpace.CSpace)
                         .BaseEntitySets
                         .First(meta => meta.ElementType.Name == entity.GetType().Name)
                         .ElementType
                         .KeyMembers
                         .Select(k => k.Name)
                         .ToList();


            var propertys =
                entity.GetType()
                     .GetProperties().Where(prop => keys.Contains(prop.Name));
            return propertys.ToList().Select(property => property.GetValue(entity, null)).ToArray();
        }

        public static List<T> ExecuteStoreQuery<T>(this DbContext db, string commandText, params object[] parameters)
        {
            return ((IObjectContextAdapter)db).ObjectContext.ExecuteStoreQuery<T>(commandText, new ExecutionOptions(MergeOption.NoTracking), parameters).ToList();
        }

        public static int ExecuteStoreCommand(this DbContext db, string commandText, params object[] parameters)
        {
            return ((IObjectContextAdapter)db).ObjectContext.ExecuteStoreCommand(TransactionalBehavior.DoNotEnsureTransaction, commandText, parameters);
        }
        public static int ExecuteStoreCommand(this DbContext db, TransactionalBehavior behavior, string commandText, params object[] parameters)
        {
            return ((IObjectContextAdapter)db).ObjectContext.ExecuteStoreCommand(behavior, commandText, parameters);
        }

        #region Async
        public static async Task<List<T>> ExecuteStoreQueryAsync<T>(this DbContext db, string commandText, params object[] parameters)
        {
            var res= await ((IObjectContextAdapter)db).ObjectContext.ExecuteStoreQueryAsync<T>(commandText, new ExecutionOptions(MergeOption.NoTracking), parameters);
            return res.ToList();
        }

        public static async Task<int> ExecuteStoreCommandAsync(this DbContext db, string commandText, params object[] parameters)
        {
            return await ((IObjectContextAdapter)db).ObjectContext.ExecuteStoreCommandAsync(TransactionalBehavior.DoNotEnsureTransaction, commandText, parameters);
        }
        public static async Task<int> ExecuteStoreCommandAsync(this DbContext db, TransactionalBehavior behavior, string commandText, params object[] parameters)
        {
            return await ((IObjectContextAdapter)db).ObjectContext.ExecuteStoreCommandAsync(behavior, commandText, parameters);
        }
        #endregion
    }

}
