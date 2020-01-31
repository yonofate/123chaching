using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.RequestModel
{
    public class PublishRequestModel
    {
        public Guid id { get; set; }
        public string domain { get; set; }
        public string urlCode { get; set; }
        public string html { get; set; }
        public string source { get; set; }
        public int type { get; set; }
        public string action { get; set; }
    }

    public class ChangePublishUrlModel
    {
        public Guid Id { get; set; }
        public string UrlCode { get; set; }
        public string html { get; set; }
    }

    public class DownloadRequestModel
    {
        public Guid pageId { get; set; }
        public string type { get; set; }
    }

    public class ThemeHtmlRequestModel
    {
        public Guid Id { get; set; }
        public string Html { get; set; }
    }

    public class PublishWpRequestModel
    {
        public int? Id { get; set; } 
        public Guid PageId { get; set; }
        public string Token { get; set; }
        public string Domain { get; set; }
        public string PathUrl { get; set; }
        public string Title { get; set; }
        public string Html { get; set; }
    }

    public class PublishExternalRequestModel
    {
        public Guid PageId { get; set; }
        public Guid IntegrationId { get; set; }
        public string PathUrl { get; set; }
        //public string Title { get; set; }
        public string Html { get; set; }
        public int Vendor { get; set; }
    }
}
