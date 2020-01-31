using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.RequestModel
{
    [Serializable]
    public class FileRequestModel
    {
        [JsonProperty(PropertyName = "coid")]
        public Guid? CollectionId { get; set; }
        public int Page { get; set; }
        public int Limit { get; set; }
        public int Type { get; set; }
        public string UserId { get; set; }
    }

    public class FileCollectionRequestModel
    {
        [JsonProperty(PropertyName = "coid")]
        public Guid? CollectionId { get; set; }
        public List<Guid> Ids { get; set; }
    }

        public class ThumbRequestModel
    {
        [JsonProperty(PropertyName = "code")]
        public string Code { get; set; }
        [JsonProperty(PropertyName = "fileName")]
        public Guid FileName { get; set; }
        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }
    }
}
