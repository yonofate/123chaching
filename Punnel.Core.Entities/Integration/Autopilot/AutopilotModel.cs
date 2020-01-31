using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Integration.Autopilot
{
    public class CampainPostRequest
    {
        public string name { get; set; }
    }
    public class CampainPostResponse
    {
        public string campaignId { get; set; }
        public string href { get; set; }
        public string name { get; set; }
    }
    public class CampainResponse
    {
        public List<CampainItemResponse> lists { get; set; }
    }

    public class AutopilotCampainItemResponse
    {
        public string id { get; set; }
        public string name { get; set; }
    }
    public class CampainItemResponse
    {
        public string list_id { get; set; }
        public string title { get; set; }
    }

    public class AccountResponse
    {
        public long at { get; set; }
        public string businessName { get; set; }
        public string fullName { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string mobile { get; set; }
    }

    public class ContactModelRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }

    public class ContactRequest
    {
        public ContactModelRequest contact { get; set; }
    }

    public class ContactDetailResponse
    {
        public int id { get; set; }
    }
    public class ContactResponse
    {
        public ContactDetailResponse contact { get; set; }
    }

}
