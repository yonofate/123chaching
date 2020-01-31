using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.RequestModel
{
    public class LandingPageRequestModel
    {
        //int limit ,int page , int pageladi, int type , int? is_publish =0, string name =""
        public string UserId { get; set; }
        public int Limit { get; set; }
        public int Page { get; set; }
        public Guid? CollectionId { get; set; }
        public int? Type { get; set; }
        public int? Publish { get; set; }
        public string Keyword { get; set; }
    }

    public class CollectionRequestModel
    {
        public int Type { get; set; }
        public string Name { get; set; }
    }

    public class CollectionEditRequestModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }

    public class LandingPageEditRequestModel
    {
        public Guid Id { get; set; }
        [JsonProperty(PropertyName = "coid")]
        public Guid? CollectionId { get; set; }
        public string Name { get; set; }
        public string Source { get; set; }
        public string Thumbnail { get; set; }
        public long? FBPageId { get; set; }
        public bool Publish { get; set; }
        public int Position { get; set; }
        public string opt { get; set; }
        
    }

    public class LandingPageNewModel
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "code")]
        public string Code { get; set; }
        [JsonProperty(PropertyName = "type")]
        public int Type { get; set; }
        [JsonProperty(PropertyName = "coid")]
        public Guid? CollectionId { get; set; }
        [JsonProperty(PropertyName = "cid")]
        public Guid? CateId { get; set; }
        [JsonProperty(PropertyName = "templateid")]
        public Guid? TemplateId { get; set; }
        [JsonProperty(PropertyName = "gid")]
        public int? GroupId { get; set; }
    }

    public class LandingPageCodeNewModel
    {
        [JsonProperty(PropertyName = "code")]
        public string Code { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }

    #region Templale Editor
    public class TemplateNewRequestModel
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "type")]
        public int Type { get; set; }

        [JsonProperty(PropertyName = "cid")]
        public Guid TemplateCateId { get; set; }

        [JsonProperty(PropertyName = "origin_template")]
        public Guid? OriginTemplateId { get; set; }

        [JsonProperty(PropertyName = "coid")]
        public Guid? Coid { get; set; }
    }
    public class TemplateEditRequestModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Source { get; set; }
        public string Thumbnail { get; set; }
        public int Status { get; set; }
        public string Opt { get; set; }
        public string Note { get; set; }
        public byte? Gid { get; set; }
        public Guid? TemplateCateId { get; set; }
        public Guid? TemplateCollectionId { get; set; }
        public bool IsStore { get; set; }
        public decimal Price { get; set; }
    }

    public class TemplateRequestFromPageModel
    {
        public Guid? PageId { get; set; }
        public Guid? FromTemplateId { get; set; }
        public Guid? TemplateCollectionId { get; set; }
        public Guid TemplateCateId { get; set; }
        [JsonProperty(PropertyName ="gid")]
        public byte? Groupid { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Source { get; set; }
        public string Thumbnail { get; set; }
        public int Type { get; set; }
    }
        #endregion
    }
