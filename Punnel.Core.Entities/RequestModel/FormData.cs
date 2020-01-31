using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.RequestModel
{
    public class FormData
    {
        public float? top { get; set; }
        public string name { get; set; }
        public string value { get; set; }
    }

    [Serializable]
    public class FormDataRequest
    {
        public IEnumerable<FormData> dataForm { get; set; }
        public Guid id { get; set; }
        public string IpAddress { get; set; }
        public bool? IsMobile { get; set; }
    }
}
