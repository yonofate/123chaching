using log4net;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class AffilateActionRepository : BaseRepository<AffilateAction>, IAffilateActionRepository
    {
        public AffilateActionRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(AffilateActionRepository));

        public void AddNew(AffilateAction obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.UserId== obj.UserId && x.OwnerId==obj.OwnerId);
            if (m == null)
            {
                obj.Status = (int)AffilateMemberStatus.New;
                obj.Action = "NEW"; //
                obj.ActionDate = DateTime.Now;
                this.Add(obj);

                var staff = uow.UserProfile.Get(obj.OwnerId);
                if (staff != null && IsEditorOrAdmin(staff.Role)==true)
                {
                    uow.StaffSupport.IU(new StaffSupport()
                    {
                        CustomerId = obj.UserId,
                        StaffId = obj.OwnerId
                    });
                }
            }
            this.Commit();
        }

        public void Expired(AffilateAction obj)
        {
            var m = _dbSet.FirstOrDefault(x => x.UserId == obj.UserId && x.OwnerId == obj.OwnerId);
            if (m != null)
            {
                m.Status = (int)AffilateMemberStatus.Expired;
                m.Action = "EXP"; //
                obj.ActionDate = DateTime.Now;
                uow.UserProfile.UpdateStatus(obj.UserId,AffilateMemberStatus.Expired);
            }
            this.Commit();
        }

        public void Paid(AffilateAction obj)
        {
            var m = _dbSet.FirstOrDefault(x => x.UserId == obj.UserId && x.OwnerId == obj.OwnerId);
            if (m != null)
            {
                m.Status = (int)AffilateMemberStatus.Paid;
                m.Action = "PAD"; //
                obj.ActionDate = DateTime.Now;
                uow.UserProfile.UpdateStatus(obj.UserId, AffilateMemberStatus.Paid);
            }
            this.Commit();
        }

        public async Task<List<AffilateUserModel>> GetByOwner(string owner, string action)
        {
            return await (_dbContext as Model.PunnelContext).msp_FrontEnd_GetAffilateByOwner(owner, action);
        }
        public async Task<List<AffilateChartViewModel>> GetAffilateChart_Action(string owner, string timeType="")
        {
            return await (_dbContext as Model.PunnelContext).msp_Affilate_Chart_Subcrible(owner, timeType);
        }

        public void Delete(string userId, string owner)
        {
            var col = _dbSet.FirstOrDefault(x => x.UserId == userId && x.OwnerId == owner);
            if (col == null) throw new Exception("not found");
            _dbSet.Remove(col);
            this.Commit();
        }

    }
}
