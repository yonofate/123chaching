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
    public class UserProfile 
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.None)]
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }
        [JsonProperty(PropertyName = "full_name")]
        public string FullName { get; set; }
       // [JsonProperty(PropertyName = "phone")]
        public string Mobile { get; set; }
        [JsonProperty(PropertyName = "avatar_org")]
        public string Avatar { get; set; }
        public string Role { get; set; }
        [JsonProperty(PropertyName = "type")]
        public int UserType { get; set; }
        [JsonProperty(PropertyName = "business")]
        public int BusinessCateId { get; set; }
        [JsonProperty(PropertyName = "status")]
        public int UserStatus { get; set; }
        [JsonProperty(PropertyName = "birthday")]
        public DateTime? Birthday { get; set; }
        
        [JsonProperty(PropertyName = "dateActive")]
        public DateTime ActiveDate { get; set; }
        [JsonProperty(PropertyName = "expired")]
        public DateTime? ExpiredDate { get; set; }

        [JsonProperty(PropertyName = "enddate")]
        public int EndDate => ExpiredDate.HasValue ? (int)Math.Round(ExpiredDate.Value.Subtract(DateTime.Now).TotalDays) : 0;
        public int Count { get; set; }
        public string ReferralCode { get; set; }
        public string ReferralBy { get; set; }
        public string BankAccount { get; set; }
        public string BankCode { get; set; }
        public bool IsAffilateAgent { get; set; }
        public int Level { get; set; }
        public DateTime? AffilateAgentDate { get; set; }

        [JsonProperty(PropertyName = "avatar")]
        public string AvatarIcon => string.IsNullOrEmpty(this.Avatar) ? "" : string.Format("{0}{1}", Punnel.Core.Utils.ConfigSettings.Get("IMG_ROOT", ""), this.Avatar);
        public bool HasAvatar => !string.IsNullOrEmpty(this.Avatar);
        public int SmsId { get; set; }
        public bool IsVerifiedSms { get; set; }
        public string SystemNote { get; set; }
        public int SystemStatus { get; set; }
        public bool IsVerifyMobile { get; set; }
        public bool IsVerifyEmail { get; set; }
        public string Provider { get; set; }
        public string ProviderId { get; set; }
        public bool IsOffAlert { get; set; }
    }
}
