using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.RequestModel
{
    [Serializable]
    public class TemplateRequestModel
    {
        public Guid? TemplateCateId { get; set; }
        public Guid? TemplateCollectionId { get; set; }
        public int? GroupId { get; set; }
        public int? Status { get; set; }
        public int Limit { get; set; }
        public int Page { get; set; }
        public int Type { get; set; }
        public bool? IsStore { get; set; }
        public bool? IsFree { get; set; }
        public bool? IsComunity { get; set; }
        public string UserId { get; set; }
        public string GetCacheKey()
        {
            return "template_search_" + (TemplateCateId.HasValue ? TemplateCateId.ToString(): "all") + "_" + (Status.HasValue? Status.Value.ToString(): "all")  + "_" + Limit.ToString() + "_" + Page.ToString() + "_" + Type.ToString() + "_" + UserId;
        }
    }
}
