using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class TicketViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int Status { get; set; }
        public string Subject { get; set; }
        public string Time { get; set; }
        public string Industry { get; set; }
        public string Mobile { get; set; }
        public string Note { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public DateTime CreatedDate { get; set; }
        public string StatusDisplay
        {
            get
            {
                if (this.Status == 0) return "Mới";
                else if (this.Status == 1) return "Đang xử lý";
                else if (this.Status == 2) return "Đã xử lý";
                else return "Đóng";
            }
            set { }
        }
    }

    public class TicketSearchRequest
    {
        public string UserId { get; set; }
        public string Keyword { get; set; }
        public int Limit { get; set; }
        public int Page { get; set; }
        public int? Status { get; set; }
    }
}
