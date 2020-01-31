using System;
using Punnel.Core.Entities.Model;

namespace Punnel.Core.BLL.Repositories
{
    public interface IIntegrationLeadSendRepository
    {
        void Delete(int leadId, Guid integrationId);
        void DeleteByLead(int leadId);
        void IU(IntegrationLeadSend obj);
    }
}