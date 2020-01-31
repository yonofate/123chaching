using System;
using System.IO;
using System.Threading;
using System.Net.Mail;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using MimeKit;
using MBN.Utils;
using Punnel.Core.Entities;
using System.Collections.ObjectModel;
using log4net;

namespace Punnel.EmailServices
{
    public class GmailSvc
    {
        private static readonly ILog _log = LogManager.GetLogger("GmailSvc");
        static string[] Scopes = { GmailService.Scope.GmailReadonly, GmailService.Scope.GmailSend };

        static string GSUIT_CLIENT_PRIVATEKEY = WebUtils.AppSettings("GSUIT_CLIENT_PRIVATEKEY", "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7NaepburzKcD/\ny0NDyNxZ+18viJOMy+y9A0V2Aib9fPmVOZaBOf4EJxaM4wBet50OxcUUbnx7xeZs\nGJ8ljZPOO/N9SRACt+M7a8uYp39Yp1gJLCxC5SXjTIixDupi72pT3MfEzj5hLc7o\nkj6hR6p0zfi+sj6MLIp++ZESEmf7bmnhnyIbyHssDVtAIS0VpFpwZsDp8sYGXtUD\n5GXgcQcCFnQXOrZeWp8UTZ9LBEa3BnIl6ZG4s1bbXlbZHMJicNAmcB0ufWIIzq5E\nk5wpMoWTmw5B0RNV0r70MHzxgh3CO6sq4TEFA5Ukr6h9Rm23W2mBo1CQ2jWLMiW+\na/Bgg2pbAgMBAAECggEAC3GjnSNI1rJ5UZzbfZV8VHFqusO7jIJoWo/y1NyCBUIS\nTU5aGYfLZyku7+luFVwq2RAhewOoaM+9+GLZuUVaGrCzGR6FQKIWQ7fUMbG56PGm\nqD2voV5tBLCiAa83iFkgUJ4RBcI7ZMKUs/mn1trdqNdw2p9kwwbaAU1z0jBj2nLy\nCRtOMW5IxW8AEHi9CgBdxO9K5Xjo6PY+MBUiGh8TulKRu+UIrS4kcptEk62a5F5D\nqDRhWLWEGcR5Hb12E3yHqA4pSKWE0hJjA7mMJe5hl9IiCvXJkZGk4Y0appWUECx/\nTQkCMvHg10XPaL4qauOA3p4Ml8A0eD1ufan+4ILosQKBgQDmvWNEuF+DGRFuNuJb\njFLaSqlKlZYKuRp3ckt3gLb1QrFZUW1f7lzRJrQgPZKbRt5zufLE/YKd/3/kXT83\njYLydy5846d8l8QivM5TZZs/timcEspreJszhml40OKbyG1De8+3DmVxq7k48jsg\no5Qgzltvw+CQOWIYqIYbwBZ+SQKBgQDPtE8HWYnt1Ga8iyFaY/lr3yAmHEuOYz08\nxEnmQUknN+frQ716saejecCn5sW20G6kIBKp5kSyaY1DGBRA1nmlhD/39sRr48gB\nf0Y0xVIcghhWpjMIeO4UtsQaJF2l+wxo47c1Lu9iFfbJ0AiBN4rf66wS/Q3tN9L4\nK8jjIBZzgwKBgGAhd0IiLmjIAOMSKqxJghtAD9frCl/dTpGFJLvc/FyiNJEpw4+8\nFx9sKI9mF7ZpiDRevC4mEE0TLY1O7A+Q/YVW8h9GGXlnIWf3kV5dbpjUo/FKQtsT\nnFWTIk4beM2+awc6hgeWD92T1c9L3CZ1ADnKv32I9f4gaiYrz/Ovy69BAoGAfn64\ndqhwWRi3bPJq4KrsV2bvJGatGU2VGPIOc52lGK5ynxSFTDjv+J6I13izRvBPwcMK\nutBTXDjuYENE6mv0b/pIHxL5cx+pSkgiELdvl48flX3orKtBi/n3Gli1dAWd/C9a\n/5fTEHCB+UyqMVALUu4rwPC+z47k/GFmGfUL11MCgYA0B039Fy/bmgXEfn2DzU+C\nYO/gg7uybNULoOKQMuTRgfAA359dKbuFw11av6/+iGMilFjAA63cDncbgZLw2hVO\n6TNoBsQRr7eYBL1zqzkz+XnS4uH5yvjYvYhSBbWF5Joln2hCXimJwVESbZlHEGDZ\nm4vb4fBLvzCtEu7XFz8KcA==\n-----END PRIVATE KEY-----\n");
        static string GSUIT_CLIENT_ACCOUNT = WebUtils.AppSettings("GSUIT_CLIENT_ACCOUNT", "punnelmail@funnel-test-201618.iam.gserviceaccount.com");
        static string GSUIT_FROM_EMAIL_SYSTEM = WebUtils.AppSettings("GSUIT_FROM_EMAIL_SYSTEM", "noreply@punnel.com");
        static readonly ReadOnlyCollection<string> SendFromMail = new ReadOnlyCollection<string>(
          new string[] {
            "hi@punnel.com",
            "noreply@punnel.net",
            "noreply@punnel.com",
            //"maild@punnel.net",
            //"maile@punnel.net",
            //"mailf@punnel.net",
            //"mailg@punnel.net",
            //"mailh@punnel.net",
            //"mailk@punnel.net",
          }
        );
        GmailService service;
        public string UserEmail { get; set; }
        public string FromName { get; set; }

        public GmailSvc(EmailSendType sendType, string sendFromName ="")
        {
            switch (sendType)
            {
                case EmailSendType.System_NoReply:
                    UserEmail = GSUIT_FROM_EMAIL_SYSTEM;
                    FromName = "Punnel";
                    break;
                case EmailSendType.Lead_AutoReply:
                    Random rnd = new Random();
                    int idx = rnd.Next(1, 2);
                    UserEmail = SendFromMail[idx];
                    FromName = sendFromName;
                    break;
            }
            Credential();
        }

        public void Credential()
        {
            var credential = new ServiceAccountCredential(
                new ServiceAccountCredential.Initializer(GSUIT_CLIENT_ACCOUNT)
                {
                    User = UserEmail,
                    Scopes = Scopes
                }.FromPrivateKey(GSUIT_CLIENT_PRIVATEKEY));

            if (credential.RequestAccessTokenAsync(CancellationToken.None).Result)
            {
                service = new GmailService(
                    new Google.Apis.Services.BaseClientService.Initializer()
                    {
                        ApplicationName = "Punnel",
                        HttpClientInitializer = credential
                    }
                );
            }
        }

        public ApiResponse SendMail(string subject , string htmlBody, MailAddress to, MailAddress replyTo)
        {
            ApiResponse res = new ApiResponse();
            try
            {
                var message = new MimeMessage();
                message.ReplyTo.Add(new MailboxAddress(replyTo.DisplayName, replyTo.Address));
                message.To.Add(new MailboxAddress(to.DisplayName, to.Address));
                message.Subject = subject;
                message.From.Add(new MailboxAddress(FromName, UserEmail));
                var builder = new BodyBuilder();
                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();

                Message gmail_msg = new Message();
                gmail_msg.Raw = Base64UrlEncode(message);
                var result = service.Users.Messages.Send(gmail_msg, "me").Execute();
                res.Code = System.Net.HttpStatusCode.OK;
            }
            catch(Exception ex) {
                res.Message = ex.Message;
                _log.Error(ex);
            }
            return res;
        }

        private static string Base64UrlEncode(MimeMessage message)
        {
            using (var stream = new MemoryStream())
            {
                message.WriteTo(stream);
                return Convert.ToBase64String(stream.GetBuffer(), 0, (int)stream.Length)
                    .Replace('+', '-')
                    .Replace('/', '_')
                    .Replace("=", "");
            }
        }

    }
}
