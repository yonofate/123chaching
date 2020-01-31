using Punnel.Core.Entities.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    [Serializable]
    public class LandingPageViewModel
    {
        [JsonProperty(PropertyName ="cols")]
        public List<Collection> Colllections { get; set; }
        [JsonProperty(PropertyName = "ladi")]
        public List<LandingPageSearchResult> LandingPages { get; set; }
    }

    [Serializable]
    public class LandingPageSearchResult
    {
        public Guid Id { get; set; }
        public int Type { get; set; }
        public string Code { get; set; }
        [JsonProperty(PropertyName = "coid")]
        public Guid? CollectionId { get; set; }

        [JsonProperty(PropertyName = "gname")]
        public string GroupName { get; set; }
        public string Name { get; set; }
        public string ColName { get; set; }
        public string Domain { get; set; }
        [JsonProperty(PropertyName = "is_publish")]
        public bool Publish { get; set; }
        [JsonProperty(PropertyName = "ishttps")]
        public bool Https { get; set; }
        public DateTime? PublishDate { get; set; }

        [JsonProperty(PropertyName = "createdAt")]       
        public DateTime CreatedDate { get; set; }
        [JsonProperty(PropertyName = "mail_auto_response")]
        public bool IsMailAutoResponse { get; set; }
        public bool HasEmailFrm { get; set; }
        public bool HasPhoneFrm { get; set; }
        public int IsAutomated { get; set; }
    }

    public class LandingPageIdModel
    {
        public Guid Id { get; set; }
    }

    public class LandingPageForSubcribleModel
    {
        public Guid Id { get; set; }
        public string Domain { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string UrlCode { get; set; }
        public string PublishReferId { get; set; }
    }


    [Serializable]
    public class LandingPageAdminResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Domain { get; set; }
        public string UrlCode { get; set; }
        public bool Publish { get; set; }
        public int PublishType { get; set; }
        public DateTime? PublishDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
