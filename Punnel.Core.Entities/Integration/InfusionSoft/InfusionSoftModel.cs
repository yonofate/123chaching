using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Integration.InfusionSoft
{
    public class InfusionSoftTokenReq
    {
        public string client_id { get; set; }
        public string client_secret { get; set; }
        public string code { get; set; }
        public string grant_type { get; set; }
        public string redirect_uri { get; set; }
    }
    public class InfusionSoftTokenRes
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
        public int expires_in { get; set; }
        public string refresh_token { get; set; }
        public string scope { get; set; }
    }

    public class InfusionSoftCategory
    {
        public string description { get; set; }
        public int id { get; set; }
        public string name { get; set; }
    }

    public class InfusionSoftTag
    {
        //public InfusionSoftCategory category { get; set; }
        //public string description { get; set; }
        public int id { get; set; }
        public string name { get; set; }
    }

    public class InfusionSoftTags
    {
        public int count { get; set; }
        public string next { get; set; }
        public string previous { get; set; }
        public List<InfusionSoftTag> tags { get; set; }
    }

    public class EmailAddress
    {
        public string email { get; set; }
        public string field { get; set; }
    }

    public class PhoneNumber
    {
        public string extension { get; set; }
        public string field { get; set; }
        public string number { get; set; }
        public string type { get; set; }
    }

    public class ContactRequest
    {
        public List<EmailAddress> email_addresses { get; set; }
        public string family_name { get; set; }
        public List<PhoneNumber> phone_numbers { get; set; }
    }

    public class ContactResponse
    {
        public int id { get; set; }
    }

    public class TagApplyReq
    {
        public List<int> tagIds { get; set; }
    }
}
