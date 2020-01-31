using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Integration.GetResponse
{
    #region GetResponse
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
        public string campaignId { get; set; }
        public string name { get; set; }

        public string id => this.campaignId;
    }

    public class Campaign
    {
        public string campaignId { get; set; }
    }
    public class CustomFieldValue
    {
        public string customFieldId { get; set; }
        public List<string> value { get; set; }
    }
    public class ContactRequest
    {
        public string name { get; set; }
        public string email { get; set; }
        //public string dayOfCycle { get; set; }
        public Campaign campaign { get; set; }
        //public List<Tag> tags { get; set; }
        //public int scoring { get; set; }
        //public List<CustomFieldValue> customFieldValues { get; set; }
        //public string ipAddress { get; set; }
    }

    public class AccountResponse
    {
        public string accountId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string companyName { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public string href { get; set; }
    }
    #endregion
}
