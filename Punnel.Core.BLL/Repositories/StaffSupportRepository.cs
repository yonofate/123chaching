using log4net;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class StaffSupportRepository : BaseRepository<StaffSupport>, IStaffSupportRepository
    {
        public StaffSupportRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(StaffSupportRepository));
        /// <summary>
        /// Them, cap nhat User
        /// </summary>
        /// <param name="obj"></param>
        /// 
        public void IU(StaffSupport obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.StaffId== obj.StaffId && x.CustomerId==obj.CustomerId);
            if (m == null)
            {
                this.Add(obj);
            }
            this.Commit();
        }

        public async Task<List<StaffProfileViewModel>> GetStaffByCustomer(string customerId)
        {
            return await (_dbContext as Model.PunnelContext).msp_UserProfile_GetStaffByCustomer(customerId);
        }

        public void UpdateStaffSupport(StaffSupportRequest model)
        {
            DeleteByCustomer(model.CustomerId);
            foreach(var item in model.StaffIds)
            {
                IU(new StaffSupport()
                {
                    CustomerId = model.CustomerId,
                    StaffId = item
                });
            }
        }

        public void Delete(string staffId, string custommerId)
        {
            var col = _dbSet.FirstOrDefault(x => x.StaffId == staffId && x.CustomerId== custommerId);
            if (col == null) throw new Exception("not found");
            _dbSet.Remove(col);
            this.Commit();
        }

        public void DeleteByCustomer(string custommerId)
        {
            var col = _dbSet.Where(x => x.CustomerId == custommerId);
            if (col == null) throw new Exception("not found");
            _dbSet.RemoveRange(col);
            this.Commit();
        }

    }
}
