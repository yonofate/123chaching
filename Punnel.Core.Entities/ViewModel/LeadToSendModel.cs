using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class LeadToSendIntegrationModel
    {
        public int LeadId { get; set; }
        public Guid IntegrationId { get; set; }
        public string ListId { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ApiKey { get; set; }
        public int SiteId { get; set; }
        public string Phone { get; set; }
        public string Referer { get; set; }  
        public string RegionName { get; set; }
        public string JsonData { get; set; }
        public DateTime SubmitDate { get; set; }
        public string TokenJson { get; set; }
    }

    public class LeadGetMoreModel {
        public int LeadId { get; set; }

    }
    public class LeadToSendAutoEmailModel
    {
        public long TimeId { get; set; }
        public int TemplateId { get; set; }
        public int LeadId { get; set; }
        public string UserId { get; set; }
        public int Type { get; set; }
        public string Title { get; set; }
        public string BodyHtml { get; set; }
        public string SendName { get; set; }
        public string ReplyTo { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string FullName { get; set; }
        public string LastName { get; set; }
        public string RegionName { get; set; }
        public string PrivateCode { get; set; }
        public string Link { get; set; }
        public int SendFromType { get; set; }
        public string FromEmails { get; set; }
        public string FromSms { get; set; }
        public DateTime WillSendDate { get; set; }
        public List<UserIntegartionEmailModel> FromEmailList { get; set; }
        public List<UserIntegartionSmsModel> FromSmsList { get; set; }
        public void MergeVariants()
        {
            this.Title= this.Title.Replace("{#NAME}", this.LastName);
            this.Title = this.Title.Replace("{#FULLNAME}", this.FullName);
            this.Title = this.Title.Replace("{#DOMAIN}", this.Link);

            this.BodyHtml= this.BodyHtml.Replace("{#NAME}", this.LastName);
            this.BodyHtml = this.BodyHtml.Replace("{#FULLNAME}", this.FullName);
            this.BodyHtml = this.BodyHtml.Replace("{#DOMAIN}", this.Link);
            this.BodyHtml = this.BodyHtml.Replace("{#CODE}", this.PrivateCode);
            this.BodyHtml = this.BodyHtml.Replace("{#REGION}", this.RegionName);
            if (this.Type == 1) this.BodyHtml = this.BodyHtml + "<div style='background-image: url(https://hstatic.punnel.com/track/mail?l=" + this.LeadId + "&t=" + this.TemplateId + "&d=" + this.TimeId + ")'></div>";
        }
        public void ToIntegrationEmail()
        {
            if (!string.IsNullOrEmpty(this.FromEmails) && this.Type==1) {
                this.FromEmailList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<UserIntegartionEmailModel>>(this.FromEmails);
            }
        }
        public void ToIntegrationSms()
        {
            if (!string.IsNullOrEmpty(this.FromSms) && this.Type == 2)
            {
                this.FromSmsList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<UserIntegartionSmsModel>>(this.FromSms);
            }
        }
    }

    public class UserIntegartionEmailModel
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
    }

    public class UserIntegartionSmsModel
    {
        //SMS_PhoneUID, SMS_Pin, SMS_Sim
        public Guid Id { get; set; }
        public string PhoneId { get; set; }
        public string Name { get; set; }
        public string Pin { get; set; }
        public string Sim1 { get; set; }
        public string Sim2 { get; set; }
    }
}
