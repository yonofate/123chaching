using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    [Serializable]
    public class LeadSearchRequest
    {
        public string Keyword { get; set; }
        public Guid? LandingPageId { get; set; }
        public int Limit { get; set; }
        public int Page { get; set; }
        public int? Status { get; set; }
        public int? Contact { get; set; }
        public string Region { get; set; }
        public bool? IsMobile { get; set; }
        public int? TagId { get; set; }
        public string UserId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }

    [Serializable]
    public class LeadSearchResult
    {
        public int Id { get; set; }
        public Guid LandingPageId { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int Status { get; set; }

        [JsonProperty(PropertyName = "lk")]
        public string Link { get; set; }
        public string Notes { get; set; }
        public int TagId { get; set; }
        public string Tags { get; set; }
        public string SystemNote { get; set; }
        public string RegionName { get; set; }
        public int SubmitCount { get; set; }
        public DateTime SubmitDate { get; set; }
        public bool IsMobile { get; set; }
        public bool IsSendMail { get; set; }
        public bool IsReadMail { get; set; }
        public string Referer { get; set; }
        public string PrivateCode { get; set; }
        public string JsonData { get; set; }
        public string PageName { get; set; }

        [JsonProperty(PropertyName = "Link")]
        public string LinkDisplay
        {
            get
            {
                Uri uri = new Uri(this.Link);
                if (uri.AbsolutePath == "/" || string.IsNullOrEmpty(uri.AbsolutePath)) return uri.Host;
                else return uri.Host + uri.AbsolutePath;
            }
            private set { }
        }
    }

    public class LeadNotifyResponse
    {
        public string Email { get; set; }
        public string Phone { get; set; }
        public string FullName { get; set; }
        public string IpAddress { get; set; }
        public string Link { get; set; }
        public string Region { get; set; }
        public string Content 
        {
            get
            {
                Uri uri = new Uri(this.Link);
                if (uri.AbsolutePath == "/" || string.IsNullOrEmpty(uri.AbsolutePath)) return uri.Host;
                else return uri.Host + uri.AbsolutePath;
            }
            private set { }
        }

        public string Title
        {
            get
            {
                var name = string.IsNullOrEmpty(this.FullName) ? "Đăng kí mới" : this.FullName;
                string c =  string.IsNullOrEmpty(this.Region)? name: $"{name} từ {this.Region}";
                return c;
            }
            private set { }
        }
    }
}
