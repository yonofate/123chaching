// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DefaultRegistry.cs" company="Web Advanced">
// Copyright 2012 Web Advanced (www.webadvanced.com)
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace Punnel.Core.BLL.DI
{
    using Punnel.Core.BLL.Repositories;
    using Punnel.FileServiceProxy;
    using StructureMap;
    using StructureMap.Configuration.DSL;
    using StructureMap.Graph;
    using StructureMap.Web.Pipeline;

    public class BLLRegistry : Registry
    {

        #region Constructors and Destructors

        public BLLRegistry()
        {
            Scan(
                scan =>
                {
                    scan.TheCallingAssembly();
                    scan.WithDefaultConventions();
                });
            For<IUow>().LifecycleIs<HybridLifecycle>().Use<Uow>();
            For<IConnectionFactory>().LifecycleIs<HybridLifecycle>().Use<ConnectionFactory>();
            For<IFileService>().LifecycleIs<HybridLifecycle>().Use<FileService>();
            For<INotificationRepository>().LifecycleIs<HybridLifecycle>().Use<NotificationRepository>();
            For<IFileRepository>().LifecycleIs<HybridLifecycle>().Use<FileRepository>();
            For<IUserProfileRepository>().LifecycleIs<HybridLifecycle>().Use<UserProfileRepository>();
            For<ICollectionRepository>().LifecycleIs<HybridLifecycle>().Use<CollectionRepository>();
            For<ILandingPageRepository>().LifecycleIs<HybridLifecycle>().Use<LandingPageRepository>();
            For<ITemplateCategoryRepository>().LifecycleIs<HybridLifecycle>().Use<TemplateCategoryRepository>();
            For<ITemplateRepository>().LifecycleIs<HybridLifecycle>().Use<TemplateRepository>();
            For<ITemplateDefaultRepository>().LifecycleIs<HybridLifecycle>().Use<TemplateDefaultRepository>();
            For<ILeadRepository>().LifecycleIs<HybridLifecycle>().Use<LeadRepository>();
            For<IIntegrationRepository>().LifecycleIs<HybridLifecycle>().Use<IntegrationRepository>();
            For<IFormConfigRepository>().LifecycleIs<HybridLifecycle>().Use<FormConfigRepository>();
            For<IDownloadPageRepository>().LifecycleIs<HybridLifecycle>().Use<DownloadPageRepository>();
            For<IIntegrationLeadSendRepository>().LifecycleIs<HybridLifecycle>().Use<IntegrationLeadSendRepository>();
            For<IFBPageRepository>().LifecycleIs<HybridLifecycle>().Use<FBPageRepository>();
            For<IAffilateActionRepository>().LifecycleIs<HybridLifecycle>().Use<AffilateActionRepository>();
            For<IAffilateMonthlySummaryRepository>().LifecycleIs<HybridLifecycle>().Use<AffilateMonthlySummaryRepository>();
            For<IInvoiceRepository>().LifecycleIs<HybridLifecycle>().Use<InvoiceRepository>();
            For<IPromotionRepository>().LifecycleIs<HybridLifecycle>().Use<PromotionRepository>();
            For<IPromotionCodeRepository>().LifecycleIs<HybridLifecycle>().Use<PromotionCodeRepository>();
            For<IServiceRepository>().LifecycleIs<HybridLifecycle>().Use<ServiceRepository>();
            For<IZaloPayTransactionRepository>().LifecycleIs<HybridLifecycle>().Use<ZaloPayTransactionRepository>();
            For<IDomainRepository>().LifecycleIs<HybridLifecycle>().Use<DomainRepository>();
            For<IHistoryPageRepository>().LifecycleIs<HybridLifecycle>().Use<HistoryPageRepository>();
            For<ITokenRepository>().LifecycleIs<HybridLifecycle>().Use<TokenRepository>();
            For<IEmailTemplateRepository>().LifecycleIs<HybridLifecycle>().Use<EmailTemplateRepository>();
            For<ISendMailTrackingRepository>().LifecycleIs<HybridLifecycle>().Use<SendMailTrackingRepository>();
            For<IMailToSendRepository>().LifecycleIs<HybridLifecycle>().Use<MailToSendRepository>();
            For<IPunnelTrackingRepository>().LifecycleIs<HybridLifecycle>().Use<PunnelTrackingRepository>();
            For<IPublishPageRepository>().LifecycleIs<HybridLifecycle>().Use<PublishPageRepository>();
            For<ILeadFilterRepository>().LifecycleIs<HybridLifecycle>().Use<LeadFilterRepository>();
            For<ILeadTagRepository>().LifecycleIs<HybridLifecycle>().Use<LeadTagRepository>();
            For<IAutomationRepository>().LifecycleIs<HybridLifecycle>().Use<AutomationRepository>();
            For<IStaffSupportRepository>().LifecycleIs<HybridLifecycle>().Use<StaffSupportRepository>();
            For<ITicketRepository>().LifecycleIs<HybridLifecycle>().Use<TicketRepository>();
            For<ITaskQueueRepository>().LifecycleIs<HybridLifecycle>().Use<TaskQueueRepository>();
            //For<IExternalPublishRepository>().LifecycleIs<HybridLifecycle>().Use<ExternalPublishRepository>();

        }

        #endregion
    }
}