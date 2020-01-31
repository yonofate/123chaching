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
    public class HistoryPage
    {
        [Key,Column(Order =0)]
        public long Id { get; set; }
        [Key, Column(Order = 1)]
        public Guid LandingPageId { get; set; }
        public string UserId { get; set; }
        public string Source { get; set; }
        public DateTime SavedDate { get; set; }
    }
}
