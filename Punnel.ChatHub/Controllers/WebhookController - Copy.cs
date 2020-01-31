using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using log4net;
using MBN.Utils;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Punnel.ChatHub.Controllers
{
    public class WebhookController : ApiController
    {
        static readonly ILog _log = LogManager.GetLogger("WebhookController");

        string pageToken = WebUtils.AppSettings("PAGE_TOKEN", "");
        string appSecret = WebUtils.AppSettings("APP_SECRET", "");
        static int _count_reply = 0;

        public HttpResponseMessage Get()
        {
            var querystrings = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
            _log.Info(querystrings);
            var user_say = querystrings["hub.verify_token"];
            _log.Info(user_say);
            if (string.IsNullOrEmpty(user_say)) return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            user_say = user_say.ToLower();
            if (user_say == "hello" || user_say == "hi" || user_say.StartsWith("chao") || user_say.StartsWith("chào"))
            {
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent(querystrings["hub.challenge"], Encoding.UTF8, "text/plain")
                };
            }
            return new HttpResponseMessage(HttpStatusCode.Unauthorized);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> Post()
        {
            var signature = Request.Headers.GetValues("X-Hub-Signature").FirstOrDefault().Replace("sha1=", "");
            var body = await Request.Content.ReadAsStringAsync();
            if (!VerifySignature(signature, body))
                return new HttpResponseMessage(HttpStatusCode.BadRequest);

            var value = JsonConvert.DeserializeObject<WebhookModel>(body);
            if (value._object != "page")
                return new HttpResponseMessage(HttpStatusCode.OK);

            if (value.entry[0].messaging != null)
            {
                foreach (var item in value.entry[0].messaging)
                {
                    if (item.message == null && item.postback == null)
                        continue;
                    else
                    {
                        await SendMessage(GetMessageTemplate(item.message.text, item.sender.id));
                        //_log.Info(item.message.text);
                        //var msg = ;
                        //_log.Info(msg);
                        //if (msg != null) 
                    }
                }
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        private bool VerifySignature(string signature, string body)
        {
            var hashString = new StringBuilder();
            using (var crypto = new HMACSHA1(Encoding.UTF8.GetBytes(appSecret)))
            {
                var hash = crypto.ComputeHash(Encoding.UTF8.GetBytes(body));
                foreach (var item in hash)
                    hashString.Append(item.ToString("X2"));
            }

            return hashString.ToString().ToLower() == signature.ToLower();
        }

        /// <summary>
        /// get text message template
        /// </summary>
        /// <param name="text">text</param>
        /// <param name="sender">sender id</param>
        /// <returns>json</returns>
        private JObject GetMessageTemplate(string text, string sender)
        {
            string txt = text;
            switch (_count_reply)
            {
                case 0:
                    txt = "Chào bạn! Tôi có thể giúp được gì?";
                    break;
                case 1:
                    txt = text.Length>30? "Vâng! Yêu cầu của bạn đã được tiếp nhận và chuyển đến bộ phận chăm sóc khách hàng để hỗ trợ":"Vâng! Cần tư vấn hỗ trợ gì bạn cứ nói hết ra nhé";
                    break;
                case 2:
                    txt = "Yêu cầu của bạn đã được tiếp nhận và chuyển đến bộ phận chăm sóc khách hàng để hỗ trợ, bạn vui lòng chờ chút!";
                    break;
                case 3:
                    txt = "Vâng! Xin lỗi bạn chờ hơi lâu, nếu gấp xin hãy để lại email hoặc số điện thoại chúng tôi sẽ liên hệ lại";
                    break;
                case 4:
                    txt = txt.Contains("@") || txt.Contains("0")? "Cảm ơn bạn, chúng tôi sẽ liên hệ lại sớm!" :"Vâng! Yêu cầu của bạn đang được xử lý, tôi sẽ liên hệ lại sớm nhất";
                    break;
                default:
                    txt = "";
                    break;
            }
            return JObject.FromObject(new
            {
                recipient = new { id = sender },
                message = new { text = txt }
            });
        }

        private string GetMessageTemplate1(string text, string sender)
        {
            string user_say = text.ToLower();
            ToMsg msg = new ToMsg();
            _log.Info("user_say:" + user_say);
            if (user_say == "hello" || user_say == "hi" || user_say.StartsWith("chao") || user_say.StartsWith("chào"))
            {
                msg.message = new Msg()
                {
                    attachment = new Attachment()
                    {
                        payload = new Payload()
                        {
                            template_type = "button",
                            text = "Chào bạn! Tôi có thể giúp được gì?",
                            buttons = new List<Button>()
                        },
                        type = "template"
                    }
                };
                msg.message.attachment.payload.buttons.Add(new Button()
                {
                    type = "postback",
                    title = "Xem hướng dẫn sử dụng",
                    url = "https://support.punnel.com"
                });
                msg.message.attachment.payload.buttons.Add(new Button()
                {
                    type = "postback",
                    title = "Hỗ trợ",
                    payload = "support"
                });
                msg.recipient = new Recipient();
                msg.recipient.id = sender;
                _log.Info(JsonConvert.SerializeObject(msg));

                //return JsonConvert.SerializeObject(msg);
                return JObject.FromObject(new
                {
                    recipient = new { id = sender },
                    message = new { text = "Chào bạn! Tôi có thể giúp được gì?" }
                }).ToString();
            }
            else if (user_say == "support")
            {
                return JObject.FromObject(new
                {
                    recipient = new { id = sender },
                    message = new { text = "Vâng! Bạn cần hỗ trợ gì?" }
                }).ToString();
            }
            return null;
        }

        /// <summary>
        /// send message
        /// </summary>
        /// <param name="json">json</param>
        private async Task SendMessage(JObject json)
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage res = await client.PostAsync($"https://graph.facebook.com/v2.6/me/messages?access_token={pageToken}", new StringContent(json.ToString(), Encoding.UTF8, "application/json"));
                _count_reply++;
                _log.Info(pageToken);
                _log.Info(json);
                _log.Info(_count_reply);
            }
        }
    }
}

