using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;

namespace Punnel.Core.Entities.ViewModel
{
    public class LeadViewModel
    {
        public int Id { get; set; }
        public Guid LandingPageId { get; set; }
        public string UserId { get; set; }
        public int Status { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Link { get; set; }       
        public string Notes { get; set; }
        public DateTime SubmitDate { get; set; }       
        public string RegionName { get; set; }
        public string Referer { get; set; }
        public bool IsMobile { get; set; }
        public bool IsSendMail { get; set; }
        public bool IsReadMail { get; set; }
        public string PrivateCode { get; set; }
        public string JsonData { get; set; }
    }

    public class LeadTagAddRequest
    {
        public LeadTag Tag { get; set; }
        public List<int> LeadIds { get; set; }
    }

    public class LeadTagDeleteRequest
    {
        public LeadTag Tag { get; set; }
        public List<int> LeadIds { get; set; }
        public bool IsDelete { get; set; }
    }

    public class LeadRemoveModel
    {
        public List<int> Id { get; set; }
    }

    public class LeadFilterViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FilterJson { get; set; }
    }
}
