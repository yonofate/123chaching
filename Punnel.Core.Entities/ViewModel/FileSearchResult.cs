using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    [Serializable]
    public class FileSearchResult
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }
        public double Size { get; set; }
        public string Path { get; set; }
        public string NameRaw { get; set; }
        public int OptimalStatus { get; set; }
        [JsonProperty(PropertyName = "dateOptimal")]
        public DateTime? OptimalDate { get; set; }
        [JsonProperty(PropertyName = "collection")]
        public Guid? CollectionId { get; set; }
        public string Thumb
        {
            get
            {
                var r = "";
                if (!string.IsNullOrEmpty(this.Path))
                {
                    if (ImageChecker.ImageCanResize(this.Path) == true) r = string.Format("{0}{1}", Punnel.Core.Utils.ConfigSettings.Get("IMG_THUMB", ""), this.Path);
                    else r = string.Format("{0}{1}", Punnel.Core.Utils.ConfigSettings.Get("IMG_ROOT", ""), this.Path);
                }
                return r;
            }
            private set { }
        }
        //public string Thumb=> string.IsNullOrEmpty(this.Path) ? "" : string.Format("{0}{1}", Punnel.Core.Utils.ConfigSettings.Get("IMG_ROOT", ""), this.Path);
    }

    [Serializable]
    public class ImageStockResult
    {
        public Guid Id { get; set; }
        public string Path { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        //public string Thumb
        //{
        //    get
        //    {
        //        return this.Path.Replace("https://hstatic.punnel.com/img/", "https://hstatic.punnel.com/img/s200x200/");
        //    }
        //    private set { }
        //}

        public string Thumb
        {
            get
            {
                var r = "";
                if (!string.IsNullOrEmpty(this.Path))
                {
                    if (ImageChecker.ImageCanResize(this.Path) == true) r = string.Format("{0}{1}", Punnel.Core.Utils.ConfigSettings.Get("IMG_THUMB", ""), this.Path);
                    else r = string.Format("{0}{1}", Punnel.Core.Utils.ConfigSettings.Get("IMG_ROOT", ""), this.Path);
                }
                return r;
            }
            private set { }
        }
    }
}


