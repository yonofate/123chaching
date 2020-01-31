using System;
using System.Collections.Generic;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System.Threading.Tasks;
using Punnel.Core.Entities;
using Punnel.Api.Models;

namespace Punnel.Core.BLL.Repositories
{
    public interface ILeadRepository: IBaseRepository<Lead>
    {
        Task IU(Lead obj);
        void UpdateStatus(Lead obj);
        Task<LeadViewModel> GetById(int id, string userId);
        Task<Tuple<List<LeadSearchResult>, int>> SearchAsync(LeadSearchRequest req);
        Task<List<LeadChartViewModel>> GetChartSubcrible(string userId, string timeType = "");
        Task<LeadChartSummaryViewModel> GetChartSummary(string userId, string timeType = "");
        Task<List<LeadHistoryViewModel>> GetHistoryByPhoneOrEmail(string userId, string email, string phone);
        Task<DashboardSummaryViewModel> GetDashboardSummary(string userId);
        Task<Lead> Add(Core.Entities.RequestModel.FormDataRequest data);
        void GetMoreInfo(int leadId);
        void GetRefererInfo(int leadId);
        void IntegrationInfo(int leadId);
        void Delete(int id, string userId);
        void DeleteList(List<string> ids, string userId);
        ApiResponse SendViaApi(LeadToSendIntegrationModel item);
        List<LeadToSendIntegrationModel> GetLeadsToSendIntegration();
        List<LeadToSendAutoEmailModel> GetLeadsToSendAutomation();
        ApiResponse SendAutomation(LeadToSendAutoEmailModel data);
        void SendNotifyEmail(int leadId);
        void CheckSendMail(int id);
        Task CheckReadMail(int id);
        List<LeadGetMoreModel> LeadToGetMoreInfo();

        Task AddSendAutomation(AutomationRequestModel data);
        void SendLeadData(AutomationRequestModel data);
    }
}