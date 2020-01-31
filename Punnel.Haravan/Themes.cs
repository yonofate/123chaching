using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.HaravanService
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
        public long shop_id { get; set; }
        public string handle { get; set; }
        public string body_html { get; set; }
        public string author { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public DateTime published_at { get; set; }
        public object template_suffix { get; set; }
    }

    public class Asset
    {
        public string key { get; set; }
        public object public_url { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public string content_type { get; set; }
        public int size { get; set; }
        public int theme_id { get; set; }
    }

    public class ObjPost
    {
        public AssetPut asset { get; set; }
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
        public string body_html { get; set; }
        public bool published { get; set; }
        public string template_suffix { get; set; }
        public string handle { get; set; }
    }
}
