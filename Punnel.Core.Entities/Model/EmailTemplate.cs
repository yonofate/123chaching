using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Punnel.Core.Entities.Model
{
    [Serializable]
    public class EmailTemplate: BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Type { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string SendName { get; set; }
        public string ReplyTo { get; set; }
        public string Title { get; set; }
        public string BodyHtml { get; set; }
        public string Variants { get; set; }
        public int SendFromType { get; set; }
        public string FromEmails { get; set; }
        public string FromSms { get; set; }
    }


}
