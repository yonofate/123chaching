using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Model
{
    [Serializable]
    public class FormConfig: BaseEntity
    {
        [Key, Column(Order = 0)]
        [JsonProperty(PropertyName = "pageid")]       
        public Guid LandingPageId { get; set; }

        [Key, Column(Order = 1)]
        [JsonProperty(PropertyName = "integrationid")]       
        public Guid IntegrationId { get; set; }
        public bool Enable { get; set; }
        public string ListId { get; set; }
        public string ListName { get; set; }

    }
}
