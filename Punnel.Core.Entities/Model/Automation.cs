using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Punnel.Core.Entities.Model
{
    [Serializable]
    public class Automation: BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        public int Type { get; set; }
        public string UserId { get; set; }
        public Guid LandingPageId { get; set; }
        public int TemplateId { get; set; }
        public int DelayHour { get; set; }
        public int DelayMin { get; set; }
        public bool IsEnable { get; set; }
    }


}
