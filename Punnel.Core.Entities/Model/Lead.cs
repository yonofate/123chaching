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
    public class Lead: BaseEntity
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Guid LandingPageId { get; set; }
        public string UserId { get; set; }
        public int Status { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string IpAddress { get; set; }
        public string Link { get; set; }
        public string Tags { get; set; }
        public int TagId { get; set; }
        public string Notes { get; set; }
        public string SystemNote { get; set; }
        public int SubmitCount { get; set; }
        public DateTime SubmitDate { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Isp { get; set; }
        public decimal? Lat { get; set; }
        public decimal? Lon { get; set; }
        public string RegionName { get; set; }
        public string Referer { get; set; }
        public bool IsMobile { get; set; }
        public string JsonData { get; set; }
        public bool IsSendMail { get; set; }
        public bool IsReadMail { get; set; }
        public string PrivateCode { get; set; }
        public void BeforeUpdate()
        {
            if(string.IsNullOrEmpty(this.FullName) && string.IsNullOrEmpty(this.FirstName) && string.IsNullOrEmpty(this.LastName))
            {
                if (!string.IsNullOrEmpty(this.Email) && this.Email.IndexOf("@")>0) this.FullName = this.Email.Substring(0, this.Email.IndexOf("@"));
            }

            if (!string.IsNullOrEmpty(this.FullName) && string.IsNullOrEmpty(this.FirstName))
            {
                this.FullName += " ";
                this.FirstName = this.FullName.Split(new char[1] { ' ' })[0].Trim();
                this.LastName = this.FullName.Replace(this.FirstName, "").Trim();
            }
            else if (string.IsNullOrEmpty(this.FullName) && !string.IsNullOrEmpty(this.FirstName) && !string.IsNullOrEmpty(this.LastName))
            {
                this.FullName = this.FirstName + " " + this.LastName;
            }
        }
        public bool IsVerifyEmail { get; set; }
        public bool IsVerifyMobile { get; set; }

    }
}
