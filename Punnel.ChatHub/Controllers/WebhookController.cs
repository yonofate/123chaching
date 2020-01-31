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
using Bot.Messenger.Models;
using log4net;
using MBN.Utils;
using Newtonsoft.Json;

namespace Punnel.ChatHub.Controllers
{
    public class WebhookController : ApiController
    {
        static readonly ILog _log = LogManager.GetLogger("WebhookController");

        string pageToken = WebUtils.AppSettings("PAGE_TOKEN", "EAAFQibWPIygBAFJSqbPLvzAFuwsI5kbR6ZCKtxQaZCa6h4q0GSLYEpJPqfSTNHvr4BCGNL7usCZAxe3ZBAQgeHcepVYvIq4tlwJDLPbDF0vt8Lu77YMZAb0uFX8YKKCKOm9wlntLR1IJwwlKZAIVjarJgoCip3BfWHA45jwEwGY0y6pNB1dn7umZBT2YdxUZB1UZD");
        string appSecret = WebUtils.AppSettings("APP_SECRET", "");

        

        #region New Version
        // HTTP Get endpoint to verify Webhook using the Verify Token
        public HttpResponseMessage Get()
        {
            var querystrings = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
            _log.Info(querystrings);
            Bot.Messenger.MessengerPlatform bot = Bot.Messenger.MessengerPlatform.CreateInstance(
                    Bot.Messenger.MessengerPlatform.CreateCredentials(appSecret, pageToken, "punnel"));

            if (bot.Authenticator.VerifyToken(querystrings["hub.verify_token"]))
            {
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent(querystrings["hub.challenge"], Encoding.UTF8, "text/plain")
                };
            }

            return new HttpResponseMessage(HttpStatusCode.Unauthorized);

        }

        // HTTP Post endpoint to receive Webhook callbacks from Facebook Messenger
        [HttpPost]
        public async Task<HttpResponseMessage> Post()
        {
            var body = await Request.Content.ReadAsStringAsync();

            Bot.Messenger.MessengerPlatform bot = Bot.Messenger.MessengerPlatform.CreateInstance(
                    Bot.Messenger.MessengerPlatform.CreateCredentials(appSecret, pageToken, "punnel"));

            if (!bot.Authenticator.VerifySignature(Request.Headers.GetValues("X-Hub-Signature").FirstOrDefault(), body))
                return new HttpResponseMessage(HttpStatusCode.BadRequest);

            Bot.Messenger.Models.WebhookModel webhookModel = bot.ProcessWebhookRequest(body);

            foreach (var entry in webhookModel.Entries)
            {
                foreach (var evt in entry.Events)
                {
                    if (evt.EventType == Bot.Messenger.Models.WebhookEventType.MessageReceivedCallback)
                    {
                        _log.InfoFormat("Id: {0} , Name: {1}", evt.Sender.ID, evt.Sender.Name);
                        _log.InfoFormat("Id: {0} , Name: {1}", evt.Recipient.ID, evt.Recipient.Name);
                        await bot.SendApi.SendActionAsync(evt.Sender.ID, Bot.Messenger.Models.SenderAction.typing_on);

                        Bot.Messenger.Models.UserProfileApiResponse userProfileRsp = await bot.UserProfileApi.GetUserProfileAsync(evt.Sender.ID);
                        _log.Info(JsonConvert.SerializeObject(evt.Message));

                        if (evt.Message.Attachments == null)
                        {
                            _log.Info(userProfileRsp?.FirstName);
                            _log.InfoFormat("txt: {0}",evt.Message.Text);

                            if (evt.Message.IsQuickReplyPostBack)
                            {
                                var c = evt.Message.QuickReplyPostback;
                                if(c.Payload == "MS_YES")
                                {
                                    await bot.SendApi.SendTextAsync(evt.Sender.ID, $"Chúc mừng, cho mình xem ảnh người yêu với {userProfileRsp?.FirstName} :)");
                                }
                                else if (c.Payload == "MS_NO")
                                {
                                    await bot.SendApi.SendTextAsync(evt.Sender.ID, $"Haha :D, mình được không?");
                                }
                                else
                                {
                                    //await bot.SendApi.SendActionAsync(evt.Sender.ID, SenderAction.typing_off);
                                    //await bot.SendApi.SendActionAsync(evt.Sender.ID, SenderAction.mark_seen);
                                }
                            }
                            else if (evt.Message.Text == string.Empty || evt.Message.Text.ToLower() == "hi" || evt.Message.Text.ToLower() == "chao" || evt.Message.Text.ToLower() == "hi")
                            {
                                //await bot.SendApi.SendTextAsync(evt.Sender.ID, $"Xin chào {userProfileRsp?.FirstName} :)");
                                var t = GenericTemplateTest();
                                _log.InfoFormat("send template: {0}", JsonConvert.SerializeObject(t));
                                var r =  await bot.SendApi.SendTemplateAsync<GenericTemplate>(evt.Sender.ID, t);
                                //var r = await bot.SendApi.SendTemplateAsync<GenericTemplate>(evt.Sender.ID, t);
                                //_log.Error(r.Exception.Message);
                                //_log.Error(r.Exception);
                                //    await bot.SendApi.SendTextAsync(evt.Sender.ID, "Bạn có người yêu chưa?", new List<QuickReply>
                                //{
                                //        new QuickReply
                                //        {
                                //            ContentType = QuickReplyContentType.text,
                                //            Title = "Có rồi",
                                //            Payload = "MS_YES"
                                //        },
                                //        new QuickReply
                                //        {
                                //            ContentType = QuickReplyContentType.text,
                                //            Title = "Đang kiếm",
                                //            Payload = "MS_NO"
                                //        }
                                //});
                            }
                            else
                            {
                                await bot.SendApi.SendActionAsync(evt.Sender.ID, SenderAction.typing_off);
                                await bot.SendApi.SendActionAsync(evt.Sender.ID, SenderAction.mark_seen);
                            }                           
                        }
                        else // if the user sent an image, file, sticker etc., we send it back to them
                        {
                            foreach (var attachment in evt.Message.Attachments)
                            {
                                if (attachment.Type != Bot.Messenger.Models.AttachmentType.fallback
                                    && attachment.Type != Bot.Messenger.Models.AttachmentType.location)
                                {
                                    _log.Info("gui lai");
                                    _log.Info(JsonConvert.SerializeObject(attachment));
                                    await bot.SendApi.SendTextAsync(evt.Sender.ID, $"Chào {userProfileRsp?.FirstName}, cảm ơn bạn đã gửi cái này và tôi nghĩ nó sẽ rất tuyệt, gửi lại bạn nè :)");
                                    
                                    //await bot.SendApi.SendAttachmentAsync(evt.Sender.ID, attachment);

                                    await bot.SendApi.SendAttachmentAsync(evt.Sender.ID, new Attachment<Models.MessageItem>()
                                    {
                                        Type = AttachmentType.image,
                                        Payload = new Models.MessageItem()
                                        {
                                            url = "https://static.becungshop.vn/images/500x500/set-ao-so-mi-va-ao-tay-dai-ride-cho-be-gai-tu-5-10-tuoi-p24121705c7295-500x500.jpg"
                                        }
                                    });

                                    var t = ButtonTest();
                                    var r = await bot.SendApi.SendTemplateAsync(evt.Sender.ID, t);
                                }
                            }
                        }
                    }
                }
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        #endregion


        #region Test

        [NonAction]
        GenericTemplate GenericTemplateTest()
        {
            var buttons = new List<Button>();

            buttons.Add(new UrlButton()
            {
                Type = ButtonType.web_url,
                Title = "Support document",
                URL = "https://support.punnel.com/collection/40-bat-au",
                FallbackUrl= "https://support.punnel.com",
            });

            //buttons.Add(new PostbackButton
            //{
            //    Title = "Support",
            //    Payload = "PL_YES",
            //    Type = ButtonType.postback
            //});

            var elements = new List<Element>();

            elements.Add(new Element()
            {
                Title="Ueh University",
                SubTitle ="Do you want support",
                ImageUrl= "https://static.becungshop.vn/images/500x500/set-ao-thun-co-tru-lv-va-quan-short-jean-cho-be-trai-p2444980a9ba22-500x500.jpg",
                Buttons = buttons,
                DefaultAction = new ElementDefaultAction()
                {
                    Type = ButtonType.web_url,
                    URL = "https://support.punnel.com/article/38-huong-dan-gan-facebook-messenger-chat-vao-landing-page",
                    HasMessengerExtensions = false,
                    WebviewHeightRatio = ContentSize.tall,
                    FallbackUrl = "https://support.punnel.com"
                },
            });

            var t = new GenericTemplate()
            {
                Elements = elements,
                TemplateType = TemplateType.generic
            };
            return t;
        }

        ButtonTemplate ButtonTest()
        {
            var buttons = new List<Button>();

            buttons.Add(new UrlButton()
            {
                Type = ButtonType.web_url,
                Title = "Support document",
                URL = "https://support.punnel.com/collection/40-bat-au"
                //FallbackUrl = "https://support.punnel.com",
            });

            var t = new ButtonTemplate()
            {
                Buttons = buttons,
                Text="bạn cần gì?",
                TemplateType = TemplateType.button
            };
            return t;
        }
        #endregion
    }
}

