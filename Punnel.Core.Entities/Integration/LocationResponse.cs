using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Punnel.Core.Entities.Integration
{
    public class LocationResponse
    {
        //public int Accuracy { get; set; }
        [JsonProperty(PropertyName = "as")]
        public string Asd { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string CountryCode { get; set; }
        public string Isp { get; set; }
        public decimal Lat { get; set; }
        public decimal Lon { get; set; }
        public bool Mobile { get; set; }
        public string Org { get; set; }
        public bool Proxy { get; set; }
        public string Query { get; set; }
        public string Region { get; set; }
        public string RegionName { get; set; }
        public string Status { get; set; }
        public string Timezone { get; set; }
        public string Zip { get; set; }
        public string Os { get; set; }
        public bool IsMobile { get; set; }
        public string Ip { get; set; }

    }

    public class LocationIPResponse
    {
        public string ip { get; set; }
        //public bool is_eu { get; set; }
        public string city { get; set; }
        public string region { get; set; }
        public string region_code { get; set; }
        public string country_name { get; set; }
        public string country_code { get; set; }
        public string continent_name { get; set; }
        public string continent_code { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        //public string asn { get; set; }
        public string organisation { get; set; }
        public string postal { get; set; }
        public string calling_code { get; set; }
        public string flag { get; set; }
        //public string emoji_flag { get; set; }
        //public string emoji_unicode { get; set; }
        //public List<Language> languages { get; set; }
        //public Currency currency { get; set; }
        //public TimeZone time_zone { get; set; }
        //public Threat threat { get; set; }
        public string count { get; set; }

        public string Os { get; set; }
        public bool IsMobile { get; set; }
        public string Ip { get; set; }

    }

    public class Language
    {
        public string name { get; set; }
        public string native { get; set; }
    }

    public class Currency
    {
        public string name { get; set; }
        public string code { get; set; }
        public string symbol { get; set; }
        public string native { get; set; }
        public string plural { get; set; }
    }

    public class TimeZone
    {
        public string name { get; set; }
        public string abbr { get; set; }
        public string offset { get; set; }
        public bool? is_dst { get; set; }
        public DateTime? current_time { get; set; }
    }
}
