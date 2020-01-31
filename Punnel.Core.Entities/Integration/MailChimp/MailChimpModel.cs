using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Integration.MailChimp
{
    #region MailChimp
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
        public List<CampainResponseItem> lists { get; set; }
        public int total_items { get; set; }
    }
    public class CampainResponseItem
    {
        public string id { get; set; }
        public string name { get; set; }
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
        public string email_address { get; set; }
        public string status { get; set; }
        public MergeFields merge_fields { get; set; }
    }

    public class MergeFields
    {
        public string FNAME { get; set; }
        public string LNAME { get; set; }
    }

    //public class ContactResponse
    //{
    //    public string id { get; set; }
    //    public string email_address { get; set; }
    //    public string unique_email_id { get; set; }
    //    public string email_type { get; set; }
    //    public string status { get; set; }
    //    public string title { get; set; }
    //}

    public class AccountResponse
    {
        public string account_id { get; set; }
        public string login_id { get; set; }
        public string account_name { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string username { get; set; }
    }

    public class ContactResponse
    {
        public string status { get; set; }
        public string title { get; set; }
        //public int status { get; set; }
        //public string detail { get; set; }
        //public string instance { get; set; }
    }
    #endregion
}
