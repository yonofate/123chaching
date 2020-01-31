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
    public class ExternalPublish: BaseEntity
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int VendorId { get; set; }
        public Guid LandingPageId { get; set; }
        public string UserId { get; set; }
        public string Token { get; set; }
        public string Domain { get; set; }
        public string PathUrl { get; set; }
        public bool IsChecked { get; set; }
        public DateTime? LastCheckedDate { get; set; }
    }
}
