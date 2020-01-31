using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IMailToSendRepository: IBaseRepository<MailToSend>
    { 
        Task<List<SendMailTrackingViewModel>> GetByLead(int leadId);
        void IU(MailToSend obj);
        Task ReadMail(long timeId, int leadId, int templateId);
    }
}