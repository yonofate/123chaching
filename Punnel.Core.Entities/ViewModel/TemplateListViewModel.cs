using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{

    [Serializable]
    public class TemplateListViewModel
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Domain { get; set; }
        public string Thumbnail { get; set; }
        public int Type { get; set; }
        public int Status { get; set; }
        public byte? Groupid { get; set; }
        public Guid? TemplateCateId { get; set; }
        public bool IsStore { get; set; }
        public decimal Price { get; set; }
    }

    public class TemplateListResult
    {
        public int Total { get; set; }
        public List<TemplateListViewModel> Templates { get; set; }
    }

    public class ListResult
    {
        [JsonProperty(PropertyName ="i")]
        public Guid Id { get; set; }
        [JsonProperty(PropertyName = "n")]
        public string Name { get; set; }
    }

    public class CountData
    {
        public int Total { get; set; }
    }
}
