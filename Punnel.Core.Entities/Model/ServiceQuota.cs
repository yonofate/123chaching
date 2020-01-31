using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Model
{
    [Serializable]
    public class ServiceQuota
    {
        [Key]
        public int LevelId { get; set; }
        public int TemplateQuota { get; set; }
        public int PageQuota { get; set; }
        public int DailyMailQuota { get; set; }
        public int LeadQuota { get; set; }
        public int ViewQuota { get; set; }

    }
}
