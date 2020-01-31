﻿using Bot.Messenger.Models;
using log4net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Bot.Messenger.Tools
{
    public class SendApi : ApiBase
    {
        static readonly ILog _log = LogManager.GetLogger("SendApi");
        private string _SendMessageEndpoint { get; set; }
        private string _UploadAttachmentEndpoint { get; set; }

        public SendApi() : base()
        {
        }

        public SendApi(MessengerCredentials credentials) : base(credentials)
        {
        }

        protected override void Initialize(MessengerCredentials credentials = null)
        {
            base.Initialize(credentials);

            _SendMessageEndpoint = $"{_MessengerApiUrl}/messages?access_token={_Credentials.PageToken}";
            _UploadAttachmentEndpoint = $"{_MessengerApiUrl}/message_attachments?access_token={_Credentials.PageToken}";
        }

        public async Task<SendApiResponse> SendTextAsync(string recipientID, string text, List<QuickReply> quickReplies = null)
        {
            return await SendMessageAsync(recipientID, new TextMessage
            {
                Text = text,
                QuickReplies = quickReplies
            });
        }

        public async Task<SendApiResponse> SendTemplateAsync<T>(string recipientID, T template, List<QuickReply> quickReplies = null)
            where T : TemplatePayload
        {
            return await SendMessageAsync(recipientID, new AttachmentMessage
            {
                Attachment = new Attachment<T>
                {
                    Type = AttachmentType.template,
                    Payload = template
                },
                QuickReplies = quickReplies
            });
        }

        public async Task<SendApiResponse> SendAttachmentAsync(string recipientID, Attachment attachment, List<QuickReply> quickReplies = null)
        {
            return await SendMessageAsync(recipientID, new AttachmentMessage
            {
                Attachment = attachment,
                QuickReplies = quickReplies
            });
        }

        public async Task<SendApiResponse> UploadAttachmentAsync(Attachment<UrlPayload> attachment)
        {
            attachment.Payload.IsReusable = true;

            return await SendAsync(JObject.FromObject(new UploadContainer
            {
                Message = new AttachmentMessage { Attachment = attachment }
            }, new JsonSerializer { NullValueHandling = NullValueHandling.Ignore }), _UploadAttachmentEndpoint);
        }

        public async Task<SendApiResponse> SendActionAsync(string recipientID, SenderAction action)
        {
            return await SendAsync(JObject.FromObject(new SenderActionContainer
            {
                Recipient = new Identifier { ID = recipientID },
                SenderAction = action
            }, new JsonSerializer { NullValueHandling = NullValueHandling.Ignore }));
        }

        private async Task<SendApiResponse> SendMessageAsync<T>(string recipientID, T message)
            where T : Message
        {
            return await SendAsync(JObject.FromObject(new MessageContainer<T>
            {
                Recipient = new Identifier { ID = recipientID },
                Message = message
            }, new JsonSerializer { NullValueHandling = NullValueHandling.Ignore }));
        }

        private async Task<SendApiResponse> SendAsync(JObject json, string endPoint = null)
        {
            endPoint = endPoint ?? _SendMessageEndpoint;
            _log.Error(json.ToString());
            _log.Error(endPoint);
            //JObject json1 = JObject.Parse("{'payload':{'url':'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/82178542_167566661221770_3646077323318394880_n.jpg?_nc_cat=111&_nc_oc=AQkiCp7729zFzOanXUiGLNCaTMVAG9vQ6EoA9ZV6aLOm8NQlmyVoSMPshln3a6BPrJs&_nc_ht=scontent.fsgn2-4.fna&oh=ac8175477b7afbaca998acee3897c030&oe=5E91E45F','is_reusable':null},'type':'image'}");
            return await RequestHandler.PostAsync<SendApiResponse>(json, $"{endPoint}");
        }
    }
}
