using Punnel.Core.Entities.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    [Serializable]
    public class UserViewModel
    {
        [JsonProperty(PropertyName = "me")]
        public UserProfile UserProfile { get; set; }

        [JsonProperty(PropertyName = "endday")]
        public int EndDay { get; set; }

        [JsonProperty(PropertyName = "count")]
        public int Count { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required]
        public string Email { get; set; }
    }


    public class ValidateSmsCodeViewModel
    {
        public string Mobile { get; set; }
        public string Code { get; set; }
    }
    public class LinkNewPasswordViewModel
    {
        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }
        [JsonProperty(PropertyName = "code")]
        public Guid Code { get; set; }
    }
    public class NewPasswordViewModel
    {
        [JsonProperty(PropertyName = "code")]
        public string Code { get; set; }
        [JsonProperty(PropertyName = "pass")]
        public string Password { get; set; }
    }

    public class ResetPassViewModel
    {
        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }
        [JsonProperty(PropertyName = "code")]
        public Guid Code { get; set; }
        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }
    }

    public class UserInfoViewModel
    {
        [JsonProperty(PropertyName = "full_name")]
        [Required]
        public string FullName { get; set; }
        [JsonProperty(PropertyName = "email")]
        [Required]
        public string Email { get; set; }
        [JsonProperty(PropertyName = "phone")]
        [Required]
        public string Mobile { get; set; }

    }

    public class UserDomainExpiredViewModel
    {
        public int Level { get; set; }
        public string Role { get; set; }
        public string Domain { get; set; }
        public DateTime ExpiredDate { get; set; }
        public string ReferralCode { get; set; }
    }
}
