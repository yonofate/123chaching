using Punnel.FileServiceProxy;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public interface IUow
    {
        bool IsNested { get; }
        DbContext dbContext { get; }

        /// <summary>
        /// Connection string
        /// </summary>
        string ConnectionString { get; }

        /// <summary>
        /// Commit data save into db
        /// </summary>
        void Commit();

        void LoadCache();
        void CreateNestedContainer();

        IFileService FileService { get; }
        INotificationRepository Notification { get; }
        IFileRepository File { get; }
        IUserProfileRepository UserProfile { get; }
        ICollectionRepository Collection { get; }
        ILandingPageRepository LandingPage { get; }
        ITemplateCategoryRepository TemplateCategory { get; }
        ITemplateRepository Template { get; }
        ITemplateDefaultRepository TemplateDefault { get; }
        ILeadRepository Lead { get; }
        IIntegrationRepository Integration { get; }
        IFormConfigRepository FormConfig { get; }
        IDownloadPageRepository DownloadPage { get; }
        IIntegrationLeadSendRepository IntegrationLeadSend { get; }
        IFBPageRepository FBPage { get; }
        IAffilateMonthlySummaryRepository AffilateMonthlySummary { get; }
        IAffilateActionRepository AffilateAction { get; }
        IInvoiceRepository Invoice { get; }
        IPromotionRepository Promotion { get; }
        IPromotionCodeRepository PromotionCode { get; }
        IServiceRepository Service { get; }
        IZaloPayTransactionRepository ZaloPayTransaction { get; }
        IDomainRepository Domain { get; }
        IHistoryPageRepository HistoryPage { get; }
        ITokenRepository Token { get; }
        IEmailTemplateRepository EmailTemplate { get; }
        ISendMailTrackingRepository SendMailTracking { get; }
        IMailToSendRepository MailToSend { get; }
        IPunnelTrackingRepository PunnelTracking { get; }
        IPublishPageRepository PublishPage { get; }
        ILeadFilterRepository LeadFilter { get; }
        ILeadTagRepository LeadTag { get; }
        IStaffSupportRepository StaffSupport { get; }
        ITaskQueueRepository TaskQueue { get; }
        IServiceQuotaRepository ServiceQuota { get; }
        IImageStockRepository ImageStock { get; }
        IAutomationRepository Automation { get; }
        ITicketRepository Ticket { get; }
    }
}
