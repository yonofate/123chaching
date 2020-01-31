using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Tracking
{
    public class PublishPageModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Domain { get; set; }
        public int ViewCount { get; set; }
        public int LeadCount { get; set; }
        public string Link
        {
            get
            {
                if (this.Domain.IndexOf(".punnel.com") >= 0) return "https://" + this.Domain;
                else return "http://" + this.Domain;
            }
            private set { }
        }
    }
    public class TrackIP
    {
        public long TimeId { get; set; }
        public string IpAddress { get; set; }
        public Guid? PageId { get; set; }
        public string Link { get; set; }
        public string Os { get; set; }
        public bool IsMobile { get; set; }
        public string Referer { get; set; }
        public string Host { get; set; }
        public string Params { get; set; }
        public int SourceId { get; set; }
        public bool IsGoogleAds { get; set; }
        public bool IsFacebookAds { get; set; }
        public DateTime? TrackDate { get; set; }
    }

    public class PageReportQuery
    {
        public Guid? PageId { get; set; }
        public string UserId { get; set; }
        public bool? IsMobile { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string Range { get; set; }
    }
    public class PageSummaryReport
    {
        public int ViewCount { get; set; }
        public int UserCount { get; set; }
        public int LeadCount { get; set; }
        public double ConversionRate => this.ViewCount>0? double.Parse(this.LeadCount.ToString()) / this.ViewCount * 100 :0; 
    }

    public class PageSummaryDaily
    {
        public string ActionDate { get; set; }
        public int UserCount { get; set; }
        public int LeadCount { get; set; }
        public int ViewCount { get; set; }
    }

    public class PageViewType
    {
        public string Title { get; set; }
        public int TotalView { get; set; }
        public int TotalLead { get; set; }
    }

    public class PageImage
    {
        public string ImgUrl { get; set; }
        public string NewImgUrl { get; set; }
        public Guid? TemplateId { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public float Size { get; set; }
        public string Type { get; set; }
    }

    public class LeadRegion
    {
        public string RegionName { get; set; }
    }

    public class EmailStatusViewModel
    {
        public string Email { get; set; }
        public int Status { get; set; }
    }

    public class MobileStatusViewModel
    {
        public string Mobile { get; set; }
        public int Status { get; set; }
    }
}
