
using Punnel.Core.Entities.Model;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Punnel.Core.Model
{
    public partial class PunnelContext : DbContext
    {
        public PunnelContext() : base("DBC_Punnel")
        {
            //Disable initializer
            Database.SetInitializer<PunnelContext>(null);
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            SetupEntities(modelBuilder);
        }
        private void SetupEntities(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public DbSet<File> File { get; set; }
        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Collection> Collection { get; set; }
        public DbSet<LandingPage> LandingPage { get; set; }
        public DbSet<Template> Template { get; set; }
        public DbSet<TemplateCategory> TemplateCategory { get; set; }
        public DbSet<TemplateDefault> TemplateDefault { get; set; }
        public DbSet<Lead> Lead { get; set; }
        public DbSet<Integration> Integration { get; set; }
        public DbSet<FormConfig> FormConfig { get; set; }
        public DbSet<DownloadPage> DownloadPage { get; set; }
        public DbSet<IntegrationLeadSend> IntegrationLeadSend { get; set; }
        public DbSet<FBPage> FBPage { get; set; }
        public DbSet<Invoice> Invoice { get; set; }
        public DbSet<AffilateAction> Affilate { get; set; }
        public DbSet<AffilateMonthlySummary> AffilateAgent { get; set; }
        public DbSet<Promotion> Promotion { get; set; }
        public DbSet<PromotionCode> PromotionCode { get; set; }
        public DbSet<Service> Service { get; set; }
        public DbSet<ZaloPayTransaction> ZaloPayTransaction { get; set; }
        public DbSet<Domain> Domain { get; set; }
        public DbSet<HistoryPage> HistoryPage { get; set; }
        public DbSet<Token> Token { get; set; }
        public DbSet<EmailTemplate> EmailTemplate { get; set; }
        public DbSet<SendMailTracking> SendMailTracking { get; set; }
        public DbSet<MailToSend> MailToSend { get; set; }
        public DbSet<PublishPage> PublishPage { get; set; }
        public DbSet<LeadFilter> LeadFilter { get; set; }
        public DbSet<LeadTag> LeadTag { get; set; }
        public DbSet<TaskQueue> TaskQueue { get; set; }
        public DbSet<ExternalPublish> ExternalPublish { get; set; }
        public DbSet<StaffSupport> StaffSupport { get; set; }
        public DbSet<ServiceQuota> ServiceQuota { get; set; }
        public DbSet<ImageStock> ImageStock { get; set; }
        public DbSet<Automation> Automation { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
    }
}
