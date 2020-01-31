using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Integration.ActiveCampain
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

    public class CampainItemResponse
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    public class AccountResponse
    {
        public string username { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
    }

    public class ContactModelRequest
    {
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string phone { get; set; }
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
