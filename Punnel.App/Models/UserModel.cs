using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Punnel.App.Models
{
    public class UserModel
    {
        [Required(ErrorMessage ="Vui lòng nhập họ tên")]
        [MaxLength(50, ErrorMessage = "Họ tên phải có độ dài từ 6 đến 50 kí tự")]
        [MinLength(6, ErrorMessage = "Họ tên phải có độ dài từ 6 đến 50 kí tự")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
        [MaxLength(11, ErrorMessage = "Vui lòng nhập số điện thoại là số di động hợp lệ")]
        [RegularExpression("^(03|05|07|08|09)[0-9]{8}$", ErrorMessage = "Vui lòng nhập số điện thoại là số di động hợp lệ")]
        public string Mobile { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập email")]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "Vui lòng nhập email hợp lệ")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập mật khẩu")]
        [MaxLength(50, ErrorMessage = "Mật khẩu phải có độ dài từ 6 đến 30 kí tự")]
        [MinLength(6, ErrorMessage = "Mật khẩu phải có độ dài từ 6 đến 30 kí tự")]
        public string Password { get; set; }
        public string Ref { get; set; }
        public bool AllowCallback { get; set; }

    }

   public class ReferralCodeModel
    {
        public string Code { get; set; }
    }
}