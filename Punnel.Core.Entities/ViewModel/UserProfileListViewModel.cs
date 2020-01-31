using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class UserProfileListViewModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Mobile { get; set; }
        public string Role { get; set; }
        public int UserStatus { get; set; }
        public DateTime ActiveDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public int Level { get; set; }
        public bool IsAffilateAgent { get; set; }
        public bool IsVerifyMobile { get; set; }
        public bool IsVerifyEmail { get; set; }
        public int SystemStatus { get; set; }
        public string SystemNote { get; set; }
        public bool IsOffAlert { get; set; }

        //public string LevelDisplay
        //{
        //    get
        //    {
        //        if (this.Level == (int)ProfileLevel.Trial) return "Trial";
        //        if (this.Level == (int)ProfileLevel.Economy) return "Economy";
        //        if (this.Level == (int)ProfileLevel.Business) return "Business";
        //        if (this.Level == (int)ProfileLevel.VIP) return "VIP";
        //        else return "";
        //    }
        //    private set { }
        //}

        //public string SystemStatusDisplay
        //{
        //    get
        //    {
        //        if (this.SystemStatus == (int)LeadStatus.New) return "New";
        //        if (this.SystemStatus == (int)LeadStatus.Hot) return "Hot";
        //        if (this.SystemStatus == (int)LeadStatus.Warm) return "Warm";
        //        if (this.SystemStatus == (int)LeadStatus.Cold) return "Cold";
        //        else return "";
        //    }
        //    private set { }
        //}
    }

    public class UserProfileSystemNoteViewModel
    {
        public string Id { get; set; }
        public int SystemStatus { get; set; }
        public string SystemNote { get; set; }
    }

    public class StaffProfileViewModel
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool IsSupported { get; set; }
    }

    public class StaffSupportRequest
    {
        public string CustomerId { get; set; }
        public List<string> StaffIds { get; set; }

    }
}
