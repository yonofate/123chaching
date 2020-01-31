using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    public class FileUrlUploadModel
    {
        public string Url { get; set; }
        public Guid? Coid { get; set; }
    }

    [Serializable]
    public class FileResponseModel
    {
        public int code { get; set; }
        public string file_name_s3 { get; set; }
        public long file_s3_size { get; set; }
        public string filename { get; set; }
        public Guid id { get; set; }
        public string message { get; set; }
        public string path { get; set; }
        public string Thumb
        {
            get
            {
                var r = "";
                if (!string.IsNullOrEmpty(this.path))
                {
                    if (ImageChecker.ImageCanResize(this.path)==true) r = string.Format("{0}{1}", Punnel.Core.Utils.ConfigSettings.Get("IMG_THUMB", ""), this.path);
                    else r = string.Format("{0}{1}", Punnel.Core.Utils.ConfigSettings.Get("IMG_ROOT", ""), this.path);
                }
                return r;
            }
            private set { }
        }
       // public string Thumb => string.IsNullOrEmpty(this.path) ? "" : string.Format("{0}{1}", Punnel.Core.Utils.ConfigSettings.Get("IMG_THUMB", ""), this.path);
    }

    public class FileResponseViewModel
    {
        [JsonProperty(PropertyName ="user")]
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public int Size { get; set; }
        public int Type { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public int optimalStatus { get; set; }
        public DateTime dateOptimal { get; set; }
        public string nameRaw { get; set; }
        public bool Collection { get; set; }
        public int Deleted { get; set; }
        public string id { get; set; }
    }

    public static class ImageChecker
    {
        public static bool ImageCanResize(string name)
        {
            name = name.ToLower();
            var res = -1 == name.IndexOf("hstatic.punnel.com") && -1 == name.IndexOf(".ico") && -1 == name.IndexOf(".svg") && -1 == name.IndexOf(".gif") ? true : false;
            return res;
        }
    }
}
