using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using MBN.Utils;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.Gmail;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using Punnel.EmailServices;

namespace Punnel.Core.BLL.Utils
{

    public class EmailUtils
    {
        static string EMAIL_IMG_BASE_URL = WebUtils.AppSettings("EMAIL_IMG_BASE_URL", "https://hstatic.punnel.com/img/mail/");
        static string BASE_URL_IMG_200 = WebUtils.AppSettings("BASE_URL_IMG_200", "https://hstatic.punnel.com/img/s200x200/");
        MailAddress _replyMail;
        EmailToModel _emailTo;
        public EmailUtils(EmailToModel data)
        {
            data.AvatarUrl = BASE_URL_IMG_200 + data.AvatarUrl;
            _emailTo = data;
            _replyMail = new MailAddress("noreply@punnel.com", "Punnel Team");
        }

        public EmailUtils()
        {
        }

        string CreateHeader()
        {
            string headerTmp = Punnel.Core.Entities.Resources.Email.HEADER;
            return CommonUtils.FormatEmailTemplate(
                    headerTmp,
                    new KeyValuePair<string, string>("{#USER_FULLNAME}", _emailTo.FullName),
                    new KeyValuePair<string, string>("{#USER_AVATAR}", _emailTo.AvatarUrl));
        }
        string CreateFooter()
        {
            return Punnel.Core.Entities.Resources.Email.FOOTER;
        }

        string Build(string icon, string title , string bodyHtml)
        {
            var template = Punnel.Core.Entities.Resources.Email.CONTAINER;
            string body = CommonUtils.FormatEmailTemplate(
                    template,
                    new KeyValuePair<string, string>("{#ICON_CONTENT}", icon),
                    new KeyValuePair<string, string>("{#TITLE_CONTENT}", title),
                    new KeyValuePair<string, string>("{#BODY_CONTENT}", bodyHtml),
                    new KeyValuePair<string, string>("{#HEADER}", CreateHeader()),
                    new KeyValuePair<string, string>("{#FOOTER}", CreateFooter()));
            return body;
        }

        string GetIconUrl(string fileName)
        {
            return string.Format("{0}{1}", EMAIL_IMG_BASE_URL, fileName);
        }

        #region Send email cases

        public void SendWelcome()
        {
            string template = Punnel.Core.Entities.Resources.Email.WELCOME;
            string title = "Chào mừng đến với Punnel";
            string iconType = GetIconUrl("welcome-icon.png");
            var bodyHtml = CommonUtils.FormatEmailTemplate(
                    template,
                   new KeyValuePair<string, string>("{#FULLNAME}", _emailTo.FullName));

            var html = Build(iconType, title, bodyHtml);
            GmailSvc svc = new GmailSvc(EmailSendType.System_NoReply);
            svc.SendMail(title, html, new MailAddress(_emailTo.Email, _emailTo.FullName), _replyMail);
        }

        public void SendWelcomeWidthVerifyEmail(string urlVerify)
        {
            string template = Punnel.Core.Entities.Resources.Email.WELCOME_WITH_VERIFY_EMAIL;
            string title = "Chào mừng đến với Punnel";
            string iconType = GetIconUrl("welcome-icon.png");
            var bodyHtml = CommonUtils.FormatEmailTemplate(
                    template,
                   new KeyValuePair<string, string>("{#FULLNAME}", _emailTo.FullName),
                   new KeyValuePair<string, string>("{#LINK-URL}", urlVerify),
                    new KeyValuePair<string, string>("{#LINK}", "Xác thực email"));

            var html = Build(iconType, title, bodyHtml);
            GmailSvc svc = new GmailSvc(EmailSendType.System_NoReply);
            _replyMail = new MailAddress("hi@punnel.com", "Punnel Team");
            svc.SendMail(title, html, new MailAddress(_emailTo.Email, _emailTo.FullName), _replyMail);
        }

        public void SendVerifyEmail(string urlVerify)
        {
            string template = Punnel.Core.Entities.Resources.Email.VERIFY_EMAIL;
            string title = "Xác thực email của bạn trên Punnel.com";
            string iconType = GetIconUrl("verify-icon.png");
            var bodyHtml = CommonUtils.FormatEmailTemplate(
                    template,
                   new KeyValuePair<string, string>("{#LINK-URL}", urlVerify),
                    new KeyValuePair<string, string>("{#LINK}", "Xác thực email"));

            var html = Build(iconType, title, bodyHtml);
            GmailSvc svc = new GmailSvc(EmailSendType.System_NoReply);
            svc.SendMail(title, html, new MailAddress(_emailTo.Email, _emailTo.FullName), _replyMail);
        }
        public void SendResetPassword(string urlReset)
        {
            string template = Punnel.Core.Entities.Resources.Email.RESET_PASS;
            string title = "Tạo lại mật khẩu mới";
            string iconType = GetIconUrl("forgetpass-icon.png");
            var bodyHtml = CommonUtils.FormatEmailTemplate(
                    template,
                   new KeyValuePair<string, string>("{#LINK-URL}", urlReset),
                    new KeyValuePair<string, string>("{#LINK}", urlReset));

            var html = Build(iconType, title, bodyHtml);
            GmailSvc svc = new GmailSvc(EmailSendType.System_NoReply);
            svc.SendMail(title, html, new MailAddress(_emailTo.Email, _emailTo.FullName), _replyMail);
        }

        public void SendNotify_AutoReplyError(string content)
        {
            string template = Punnel.Core.Entities.Resources.Email.NOTIFY_INTEGRATIONAPP_ERROR;
            string title = "Tài khoản tích hợp Auto Responder không hoạt động trên Punnel";
            string iconType = GetIconUrl("verify-icon.png");
            var bodyHtml = CommonUtils.FormatEmailTemplate(
                    template,
                   new KeyValuePair<string, string>("{#CONTENT}", content));

            var html = Build(iconType, title, bodyHtml);
            GmailSvc svc = new GmailSvc(EmailSendType.System_NoReply);
            svc.SendMail(title, html, new MailAddress(_emailTo.Email, _emailTo.FullName), _replyMail);
        }
        #endregion

        #region Notify to user
        /// <summary>
        /// Thông báo tài khoản Punnel của bạn sắp hết hạn trải nghiệm
        /// </summary>
        /// <param name="expiredDate"></param>
        public void SendUpgradeAccount(DateTime expiredDate)
        {
            if (expiredDate < DateTime.Now || expiredDate> DateTime.Now.AddDays(30)) return;
            string template = Punnel.Core.Entities.Resources.Email.NOTIFY_FREEMEMBER_EXPIRED;
            string title = "Thông báo tài khoản Punnel của bạn sắp hết hạn trải nghiệm";
            string iconType = GetIconUrl("alert.png");
            var bodyHtml = CommonUtils.FormatEmailTemplate(
                    template,
                   new KeyValuePair<string, string>("{#FULLNAME}", _emailTo.FullName),
                   new KeyValuePair<string, string>("{#DATE}", expiredDate.ToString("dd/MM/yyyy"))
                   );

            var html = Build(iconType, title, bodyHtml);
            GmailSvc svc = new GmailSvc(EmailSendType.System_NoReply);
            svc.SendMail(title, html, new MailAddress(_emailTo.Email, _emailTo.FullName), _replyMail);
        }

        /// <summary>
        /// Thông báo thời hạn sử dụng dịch vụ Punnel sắp hết
        /// </summary>
        /// <param name="expiredDate"></param>
        public void SendExpiredAccount(DateTime expiredDate)
        {
            if (expiredDate < DateTime.Now || expiredDate > DateTime.Now.AddDays(30)) return;
            string template = Punnel.Core.Entities.Resources.Email.NOTIFY_EXPIRED;
            string title = "Thông báo thời hạn sử dụng dịch vụ Punnel sắp hết";
            string iconType = GetIconUrl("alert.png");
            var bodyHtml = CommonUtils.FormatEmailTemplate(
                    template,
                   new KeyValuePair<string, string>("{#FULLNAME}", _emailTo.FullName),
                   new KeyValuePair<string, string>("{#DATE}", expiredDate.ToString("dd/MM/yyyy"))
                   );

            var html = Build(iconType, title, bodyHtml);
            GmailSvc svc = new GmailSvc(EmailSendType.System_NoReply);
            svc.SendMail(title, html, new MailAddress(_emailTo.Email, _emailTo.FullName), _replyMail);
        }

        public void SendUpgradeSuccess(string ServiceName, int month, DateTime expiredDate)
        {
            if (expiredDate <= DateTime.Now) return;
            string template = Punnel.Core.Entities.Resources.Email.NOTIFY_PAYMENT_SUCCESS;
            string title = "Gia hạn sử dụng dịch vụ Punnel thành công";
            string iconType = GetIconUrl("alert.png");
            var bodyHtml = CommonUtils.FormatEmailTemplate(
                    template,
                   new KeyValuePair<string, string>("{#FULLNAME}", _emailTo.FullName),
                   new KeyValuePair<string, string>("{#SERVICE}", ServiceName),
                   new KeyValuePair<string, string>("{#MONTH}", month.ToString()),
                   new KeyValuePair<string, string>("{#EXPIRED_DATE}", expiredDate.ToString("dd/MM/yyyy"))
                   );

            var html = Build(iconType, title, bodyHtml);
            GmailSvc svc = new GmailSvc(EmailSendType.System_NoReply);
            svc.SendMail(title, html, new MailAddress(_emailTo.Email, _emailTo.FullName), _replyMail);
        }
        #endregion

        #region Email AutoReply
        public ApiResponse SendLeadAutoReply(LeadToSendAutoEmailModel data, UserProfile user, string apiKey="", string tokenJson="")
        {
            data.MergeVariants();
            //hệ thống
            if (data.SendFromType == 0)
            {
                _replyMail = new MailAddress(data.ReplyTo, data.SendName);
                GmailSvc svc = new GmailSvc(EmailSendType.Lead_AutoReply, _replyMail.DisplayName);
                var res = svc.SendMail(data.Title, data.BodyHtml, new MailAddress(data.Email, data.FullName), _replyMail);
                return res;
            }
            else // cá nhân
            {
                data.ToIntegrationEmail();
               
                Random rnd = new Random();
                int idx = data.FromEmailList.Count>0? rnd.Next(0, data.FromEmailList.Count-1):0;
                var u = data.FromEmailList[idx];
                var from = new MailAddress(u.Email,u.Name);
                
                GmailPersonalSvc svc = new GmailPersonalSvc(apiKey, tokenJson);
                var res=svc.SendMail(data.Title, data.BodyHtml, new MailAddress(data.Email, data.FullName), from);
                if(res.Code!= System.Net.HttpStatusCode.OK)
                {
                    string content = $"Kiểm tra lại tích hợp gmail của email {u.Email} trên punnel của bạn còn hiệu lực gửi email không";
                   new EmailUtils(new EmailToModel()
                   {
                       Email= user.Email,
                       FullName= user.FullName,
                       AvatarUrl= user.Avatar
                   }).SendNotify_AutoReplyError(content);
                }
                return res;
            }
        }
        #endregion

        #region Notify new lead
        /// <summary>
        /// Gửi thông báo khách mới cho user
        /// </summary>
        /// <param name="linkPage"></param>
        /// <param name="htmlInfo"></param>
        public void SendAlertNewLead(string linkPage, string htmlInfo)
        {
            string template = Punnel.Core.Entities.Resources.Email.NOTIFY_NEW_LEAD;
            string title = CommonUtils.FormatEmailTemplate("Bạn có khách đăng kí mới trên trang {#LINK}",
                   new KeyValuePair<string, string>("{#LINK}", linkPage));
            string iconType = GetIconUrl("alert.png");
            var bodyHtml = CommonUtils.FormatEmailTemplate(
                    template,
                   new KeyValuePair<string, string>("{#NAME}", _emailTo.FullName),
                   new KeyValuePair<string, string>("{#LINK}", linkPage),
                   new KeyValuePair<string, string>("{#CUSTOMER_INFO}", htmlInfo));

            var html = Build(iconType, title, bodyHtml);
            GmailSvc svc = new GmailSvc(EmailSendType.Lead_AutoReply,"Punnel");
            svc.SendMail(title, html, new MailAddress(_emailTo.Email, _emailTo.FullName), _replyMail);
        }
        #endregion
    }
}
