using log4net;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using Punnel.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Punnel.Core.BLL.Utils;

namespace Punnel.Core.BLL.Repositories
{
    public class MailToSendRepository : BaseRepository<MailToSend>, IMailToSendRepository
    {
        public MailToSendRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(MailToSendRepository));

        public async Task<List<SendMailTrackingViewModel>> GetByLead(int leadId)
        {
            var res = await (_dbContext as Model.PunnelContext).msp_SendMail_ByLeadId(leadId);
            return res;
        }
        public void IU(MailToSend obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.LeadId== obj.LeadId && x.TemplateId==obj.TemplateId && x.TimeId==obj.TimeId);
            if (m == null)
            {
                obj.TimeId = DateTime.Now.ToUnixTimeSeconds();
                if (obj.WillSendDate == null) obj.WillSendDate = DateTime.Now;
                this.Add(obj);
                uow.Lead.CheckSendMail(obj.LeadId);
            }
            else
            {
                m.Status = obj.Status;
                m.ResponseMsg = obj.ResponseMsg;
                m.SendDate = DateTime.Now;
            }
            this.Commit();
        }

        public async Task ReadMail(long timeId, int leadId, int templateId)
        {
            var m = _dbSet.FirstOrDefault(x => x.LeadId == leadId && x.TemplateId == templateId && x.TimeId==timeId);
            if (m != null)
            {
                m.IsRead = true;
                m.ReadDate = DateTime.Now;
                this.Commit();
                await uow.Lead.CheckReadMail(m.LeadId);               
            }
        }

    }
}
