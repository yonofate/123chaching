using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Integration
{
    public class AuthRequest
    {
        public string ApiKey { get; set; }
        public string ApiUrl { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class SmsAuthRequest
    {
        public string Name { get; set; }
        public string Sim1 { get; set; }
        public string Sim2 { get; set; }
        public string Pin { get; set; }
    }
    public class HaravanAuthRequest
    {
        public string code { get; set; }
        public string id_token { get; set; }
        public string scope { get; set; }
        public string session_state { get; set; }
    }
    public class CampainRequest
    {
        public string AccId { get; set; }
        public string Data { get; set; }
        public string Action { get; set; }
        public Guid? PageId { get; set; }
    }

    [Serializable]
    public class SetCampainRequest
    {
        [JsonProperty(PropertyName="pageid")]
        public Guid LandingPageId { get; set; }
        [JsonProperty(PropertyName = "integrationid")]
        public Guid IntegrationId { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
    }

    [Serializable]
    public class FormConfigRequest
    {
        [JsonProperty(PropertyName = "pageid")]
        public Guid LandingPageId { get; set; }
        [JsonProperty(PropertyName = "integrationid")]
        public Guid IntegrationId { get; set; }
    }

    [Serializable]
    public class IntegrationDisconnectRequest
    {
        [JsonProperty(PropertyName = "id")]
        public Guid IntegrationId { get; set; }
    }

    [Serializable]
    public class FormConfigData_GetResponse
    {
        public string campaignId { get; set; }
        public string name { get; set; }
    }
    [Serializable]
    public class FormConfigData_MailChimp
    {
        public string id { get; set; }
        public string name { get; set; }
    }


}
