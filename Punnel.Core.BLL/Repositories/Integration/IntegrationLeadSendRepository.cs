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
    public class IntegrationLeadSendRepository : BaseRepository<IntegrationLeadSend>, IIntegrationLeadSendRepository
    {
        public IntegrationLeadSendRepository(IUow uow) : base(uow) { }

        public void IU(IntegrationLeadSend obj)
        {

            var m = _dbSet.FirstOrDefault(x=>x.IntegrationId== obj.IntegrationId && x.LeadId==obj.LeadId);
            if (m == null)
            {                
                this.Add(obj);
            }
            else
            {
                m.Status = obj.Status;
                if (obj.Status == (int)LeadSendStatus.Failed) m.FailedCount += 1;
                m.ResponseMsg = obj.ResponseMsg;
                m.LastSendDate = obj.LastSendDate;
            }
            this.Commit();
        }

        public void Delete(int leadId, Guid integrationId)
        {
            var m = _dbSet.FirstOrDefault(x => x.LeadId == leadId && x.IntegrationId == integrationId);
            _dbSet.Remove(m);
            this.Commit();
        }

        public void DeleteByLead(int leadId)
        {
            var m = _dbSet.Where(x => x.LeadId == leadId);
            foreach(var item in m)
            {
                _dbSet.Remove(item);
            }           
            this.Commit();
        }

    }
}
