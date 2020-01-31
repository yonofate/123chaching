using Punnel.Core.Entities;
using Punnel.Core.Model;
using Punnel.FileServiceProxy;
using StructureMap;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class Uow : IUow, IDisposable
    {
        private bool disposed = false; // Track whether Dispose has been called. 
        private IContainer container;
        private bool _isNested = false;
        public bool IsNested { get { return _isNested; } }
        private PunnelContext _dbContext;

        public Uow()
        {
            container = ObjectFactory.Container;
        }


        /// <summary>
        /// Connection string
        /// </summary>
        public string ConnectionString
        {
            get
            {
                return _dbContext.Database.Connection.ConnectionString;
            }
        }


        #region DataContext
        public DbContext dbContext
        {
            get
            {
                if (_dbContext == null)
                {
                    _dbContext = new PunnelContext();
                    _dbContext.Configuration.ProxyCreationEnabled = false;
                    _dbContext.Configuration.LazyLoadingEnabled = false;
                    _dbContext.Configuration.ValidateOnSaveEnabled = false;
                }
                return _dbContext;
            }
        }
        #endregion

        public void Commit()
        {
            if (_dbContext != null)
            {
                _dbContext.SaveChanges();
            }
        }

        private T GetRepository<T>() where T : class
        {
            return container.With<IUow>(this).GetInstance<T>();
        }

        public void CreateNestedContainer()
        {
            if (_isNested == true) return;

            _isNested = true;
            container = ObjectFactory.Container.GetNestedContainer();
        }

        private IFileRepository _File = null;
        public IFileRepository File
        {
            get { return _File ?? (_File = this.GetRepository<IFileRepository>()); }
        }

        private IUserProfileRepository _UserProfile = null;
        public IUserProfileRepository UserProfile
        {
            get { return _UserProfile ?? (_UserProfile = this.GetRepository<IUserProfileRepository>()); }
        }

        private ICollectionRepository _Collection = null;
        public ICollectionRepository Collection
        {
            get { return _Collection ?? (_Collection = this.GetRepository<ICollectionRepository>()); }
        }

        private ILandingPageRepository _LandingPage = null;
        public ILandingPageRepository LandingPage
        {
            get { return _LandingPage ?? (_LandingPage = this.GetRepository<ILandingPageRepository>()); }
        }

        private ITemplateCategoryRepository _TemplateCategory = null;
        public ITemplateCategoryRepository TemplateCategory
        {
            get { return _TemplateCategory ?? (_TemplateCategory = this.GetRepository<ITemplateCategoryRepository>()); }
        }

        private ITemplateRepository _Template = null;
        public ITemplateRepository Template
        {
            get { return _Template ?? (_Template = this.GetRepository<ITemplateRepository>()); }
        }

        private ITemplateDefaultRepository _TemplateDefault = null;
        public ITemplateDefaultRepository TemplateDefault
        {
            get { return _TemplateDefault ?? (_TemplateDefault = this.GetRepository<ITemplateDefaultRepository>()); }
        }

        private ILeadRepository _Lead = null;
        public ILeadRepository Lead
        {
            get { return _Lead ?? (_Lead = this.GetRepository<ILeadRepository>()); }
        }

        private IIntegrationRepository _Integration = null;
        public IIntegrationRepository Integration
        {
            get { return _Integration ?? (_Integration = this.GetRepository<IIntegrationRepository>()); }
        }

        private IFormConfigRepository _FormConfig = null;
        public IFormConfigRepository FormConfig
        {
            get { return _FormConfig ?? (_FormConfig = this.GetRepository<IFormConfigRepository>()); }
        }

        private IDownloadPageRepository _DownloadPage = null;
        public IDownloadPageRepository DownloadPage
        {
            get { return _DownloadPage ?? (_DownloadPage = this.GetRepository<IDownloadPageRepository>()); }
        }

        private IIntegrationLeadSendRepository _IntegrationLeadSend = null;
        public IIntegrationLeadSendRepository IntegrationLeadSend
        {
            get { return _IntegrationLeadSend ?? (_IntegrationLeadSend = this.GetRepository<IIntegrationLeadSendRepository>()); }
        }

        private IFBPageRepository _FBPage = null;
        public IFBPageRepository FBPage
        {
            get { return _FBPage ?? (_FBPage = this.GetRepository<IFBPageRepository>()); }
        }

        private IAffilateActionRepository _Affilate = null;
        public IAffilateActionRepository Affilate
        {
            get { return _Affilate ?? (_Affilate = this.GetRepository<IAffilateActionRepository>()); }
        }

        private IAffilateActionRepository _AffilateAction = null;
        public IAffilateActionRepository AffilateAction
        {
            get { return _AffilateAction ?? (_AffilateAction = this.GetRepository<IAffilateActionRepository>()); }
        }

        private IAffilateMonthlySummaryRepository _AffilateMonthlySummary = null;
        public IAffilateMonthlySummaryRepository AffilateMonthlySummary
        {
            get { return _AffilateMonthlySummary ?? (_AffilateMonthlySummary = this.GetRepository<IAffilateMonthlySummaryRepository>()); }
        }

        private IInvoiceRepository _Invoice = null;
        public IInvoiceRepository Invoice
        {
            get { return _Invoice ?? (_Invoice = this.GetRepository<IInvoiceRepository>()); }
        }
        private IPromotionRepository _Promotion = null;
        public IPromotionRepository Promotion
        {
            get { return _Promotion ?? (_Promotion = this.GetRepository<IPromotionRepository>()); }
        }
        private IPromotionCodeRepository _PromotionCode = null;
        public IPromotionCodeRepository PromotionCode
        {
            get { return _PromotionCode ?? (_PromotionCode = this.GetRepository<IPromotionCodeRepository>()); }
        }
        private IServiceRepository _Service = null;
        public IServiceRepository Service
        {
            get { return _Service ?? (_Service = this.GetRepository<IServiceRepository>()); }
        }

        private IZaloPayTransactionRepository _ZaloPayTransaction = null;
        public IZaloPayTransactionRepository ZaloPayTransaction
        {
            get { return _ZaloPayTransaction ?? (_ZaloPayTransaction = this.GetRepository<IZaloPayTransactionRepository>()); }
        }

        private IDomainRepository _Domain = null;
        public IDomainRepository Domain
        {
            get { return _Domain ?? (_Domain = this.GetRepository<IDomainRepository>()); }
        }

        private IHistoryPageRepository _HistoryPage = null;
        public IHistoryPageRepository HistoryPage
        {
            get { return _HistoryPage ?? (_HistoryPage = this.GetRepository<IHistoryPageRepository>()); }
        }

        private ITokenRepository _Token = null;
        public ITokenRepository Token
        {
            get { return _Token ?? (_Token = this.GetRepository<ITokenRepository>()); }
        }

        private IEmailTemplateRepository _EmailTemplate = null;
        public IEmailTemplateRepository EmailTemplate
        {
            get { return _EmailTemplate ?? (_EmailTemplate = this.GetRepository<IEmailTemplateRepository>()); }
        }

        private ISendMailTrackingRepository _SendMailTracking = null;
        public ISendMailTrackingRepository SendMailTracking
        {
            get { return _SendMailTracking ?? (_SendMailTracking = this.GetRepository<ISendMailTrackingRepository>()); }
        }

        private IMailToSendRepository _MailToSend = null;
        public IMailToSendRepository MailToSend
        {
            get { return _MailToSend ?? (_MailToSend = this.GetRepository<IMailToSendRepository>()); }
        }

        private IPunnelTrackingRepository _PunnelTracking = null;
        public IPunnelTrackingRepository PunnelTracking
        {
            get { return _PunnelTracking ?? (_PunnelTracking = this.GetRepository<IPunnelTrackingRepository>()); }
        }

        private IPublishPageRepository _PublishPage = null;
        public IPublishPageRepository PublishPage
        {
            get { return _PublishPage ?? (_PublishPage = this.GetRepository<IPublishPageRepository>()); }
        }

        private ILeadFilterRepository _LeadFilter = null;
        public ILeadFilterRepository LeadFilter
        {
            get { return _LeadFilter ?? (_LeadFilter = this.GetRepository<ILeadFilterRepository>()); }
        }

        private ILeadTagRepository _LeadTag = null;
        public ILeadTagRepository LeadTag
        {
            get { return _LeadTag ?? (_LeadTag = this.GetRepository<ILeadTagRepository>()); }
        }

        private IStaffSupportRepository _StaffSupport = null;
        public IStaffSupportRepository StaffSupport
        {
            get { return _StaffSupport ?? (_StaffSupport = this.GetRepository<IStaffSupportRepository>()); }
        }

        private ITaskQueueRepository _TaskQueue = null;
        public ITaskQueueRepository TaskQueue
        {
            get { return _TaskQueue ?? (_TaskQueue = this.GetRepository<ITaskQueueRepository>()); }
        }

        private IServiceQuotaRepository _ServiceQuota = null;
        public IServiceQuotaRepository ServiceQuota
        {
            get { return _ServiceQuota ?? (_ServiceQuota = this.GetRepository<IServiceQuotaRepository>()); }
        }

        private IImageStockRepository _ImageStock = null;
        public IImageStockRepository ImageStock
        {
            get { return _ImageStock ?? (_ImageStock = this.GetRepository<IImageStockRepository>()); }
        }

        private IAutomationRepository _Automation = null;
        public IAutomationRepository Automation
        {
            get { return _Automation ?? (_Automation = this.GetRepository<IAutomationRepository>()); }
        }

        private ITicketRepository _Ticket = null;
        public ITicketRepository Ticket
        {
            get { return _Ticket ?? (_Ticket = this.GetRepository<ITicketRepository>()); }
        }

        #region Notification
        private INotificationRepository _Notification = null;
        public INotificationRepository Notification
        {
            get { return _Notification ?? (_Notification = this.GetRepository<INotificationRepository>()); }
        }
        #endregion
        #region Services
        private IFileService _FileService = null;
        public IFileService FileService
        {
            get { return _FileService ?? (_FileService = this.GetRepository<IFileService>()); }
        }
        #endregion
        public void LoadCache()
        {
            throw new NotImplementedException();
        }

        #region Dispose
        ~Uow()
        {
            this.Dispose(false);
        }
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (this.disposed == true) return;

            if (disposing)
            {
                if (_dbContext != null) _dbContext.Dispose();
                if (_isNested == true) container.Dispose();
            }

            this.disposed = true;
        }
        #endregion
    }
}
