using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Punnel.Tracking.Model
{
    public class TrackingModel
    {
        public Guid? PageId { get; set; }
        public string IpAddress { get; set; }
        public string Link { get; set; }
        public string Os { get; set; }
        public bool IsMobile { get; set; }
        public string Referer { get; set; }
        public int SourceId { get; set; }
        public string Params { get; set; }
        public bool IsGoogleAds { get; set; }
        public bool IsFacebookAds { get; set; }
    }
}