using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.SapoService
{
    public class Themes
    {
        public List<Theme> themes { get; set; }
    }

    public class Theme
    {
        public long id { get; set; }
        public string name { get; set; }
        public string role { get; set; }
    }

    public class Page
    {
        public long id { get; set; }
        public string title { get; set; }
        public string alias { get; set; }
        public string content { get; set; }
        public string author { get; set; }
        public DateTime created_on { get; set; }
        public DateTime? modified_on { get; set; }
        public DateTime? published_on { get; set; }
        public string template_layout { get; set; }
    }

    public class Asset
    {
        public string key { get; set; }
        public object public_url { get; set; }
        public DateTime created_on { get; set; }
        public DateTime? modified_on { get; set; }
        public string content_type { get; set; }
        public int size { get; set; }
        public int theme_id { get; set; }
    }

    public class ObjAssetWrap
    {
        public AssetPut asset { get; set; }
    }

    public class ObjPageWrap
    {
        public PagePost page { get; set; }
    }
    public class ObjWrap
    {
        public Page page { get; set; }
    }
    public class AssetPut
    {
        public string key { get; set; }
        public string value { get; set; }
    }

    public class PagePost
    {
        public long id { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public bool published { get; set; }
        public DateTime published_on { get; set; }
        public string template_layout { get; set; }
        public string alias { get; set; }
    }
}
