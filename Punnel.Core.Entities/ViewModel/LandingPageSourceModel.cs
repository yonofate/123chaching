using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    [Serializable]
    public class Desktop
    {
        public string width { get; set; }
        public string height { get; set; }
        public string color { get; set; }
        [JsonProperty(PropertyName = "background-color")]
        public string background_color { get; set; }
        [JsonProperty(PropertyName = "background-image")]
        public string background_image { get; set; }
        public string typeBgImage { get; set; }
        [JsonProperty(PropertyName = "font-size")]
        public string font_size { get; set; }
        [JsonProperty(PropertyName = "text-align")]
        public string text_align { get; set; }
        public string padding { get; set; }
        public string top { get; set; }
        public string left { get; set; }
        [JsonProperty(PropertyName = "border-top-left-radius")]
        public string border_top_left_radius { get; set; }
        [JsonProperty(PropertyName = "border-top-right-radius")]
        public string border_top_right_radius { get; set; }
        [JsonProperty(PropertyName = "border-bottom-left-radius")]
        public string border_bottom_left_radius { get; set; }
        [JsonProperty(PropertyName = "border-bottom-right-radius")]
        public string border_bottom_right_radius { get; set; }
        [JsonProperty(PropertyName = "border-style")]
        public string border_style { get; set; }
        [JsonProperty(PropertyName = "border-top")]
        public string border_top { get; set; }
        [JsonProperty(PropertyName = "border-left")]
        public string border_left { get; set; }
        [JsonProperty(PropertyName = "border-right")]
        public string border_right { get; set; }
        [JsonProperty(PropertyName = "border-bottom")]
        public string border_bottom { get; set; }
        [JsonProperty(PropertyName = "border-color")]
        public string border_color { get; set; }
}

    public class Mobile
    {
        public string width { get; set; }
        public string height { get; set; }
        [JsonProperty(PropertyName = "background-color")]
        public string background_color { get; set; }
        [JsonProperty(PropertyName = "background-image")]
        public string background_image { get; set; }
        [JsonProperty(PropertyName = "font-size")]
        public string font_size { get; set; }
        [JsonProperty(PropertyName = "text-align")]
        public string text_align { get; set; }
        public string color { get; set; }
        public string top { get; set; }
        public string left { get; set; }
        public string padding { get; set; }
        [JsonProperty(PropertyName = "border-top-left-radius")]
        public string border_top_left_radius { get; set; }
        [JsonProperty(PropertyName = "border-top-right-radius")]
        public string border_top_right_radius { get; set; }
        [JsonProperty(PropertyName = "border-bottom-left-radius")]
        public string border_bottom_left_radius { get; set; }
        [JsonProperty(PropertyName = "border-bottom-right-radius")]
        public string border_bottom_right_radius { get; set; }
        public string line_spacing { get; set; }
        [JsonProperty(PropertyName = "border-style")]
        public string border_style { get; set; }
        [JsonProperty(PropertyName = "border-top")]
        public string border_top { get; set; }
        [JsonProperty(PropertyName = "border-left")]
        public string border_left { get; set; }
        [JsonProperty(PropertyName = "border-right")]
        public string border_right { get; set; }
        [JsonProperty(PropertyName = "border-bottom")]
        public string border_bottom { get; set; }
        [JsonProperty(PropertyName = "border-color")]
        public string border_color { get; set; }
}

public class Media
{
    public Desktop desktop { get; set; }
    public Mobile mobile { get; set; }
    public string overlay_color { get; set; }
    public string typeBgImage { get; set; }
    public string typePosBgImg { get; set; }
    public int? font_weight { get; set; }
    public string display { get; set; }
    public string font_family { get; set; }
    public string classFont { get; set; }
    public string font_name { get; set; }
    public string heightArea { get; set; }
    public string background_input_color { get; set; }
    public string placeholderColor { get; set; }
    public string color_value { get; set; }
}

public class ItemForm
{
    public string type { get; set; }
    public string name { get; set; }
    public string lable { get; set; }
    public string placeholder { get; set; }
    public string required { get; set; }
    public string @using { get; set; }
}

public class CustomChild
{
    public string background { get; set; }
    public string color { get; set; }
}

public class SettingsForm
{
}

public class ApiElement
{
    public int mobile { get; set; }
    public string id { get; set; }
    public string lang { get; set; }
    public string lp_type { get; set; }
    public string type_plugin { get; set; }
    public string parent { get; set; }
    public Media media { get; set; }
    public string action { get; set; }
    public string target { get; set; }
    public string link_popup { get; set; }
    public string tracking { get; set; }
    public string typeFixed { get; set; }
    public string bg_type { get; set; }
    public int sortmobile { get; set; }
    public string stickyPos { get; set; }
    public string repeatBg { get; set; }
    public int sortMobile { get; set; }
    public string text { get; set; }
    public string node { get; set; }
    public string line_spacing { get; set; }
    public string objectfit { get; set; }
    public int? skewx { get; set; }
    public int? rotate { get; set; }
    public int? skewy { get; set; }
    public string idGroup { get; set; }
    public string id_parent { get; set; }
    public string style { get; set; }
    public List<ItemForm> item_form { get; set; }
    public List<object> itemText { get; set; }
    public CustomChild custom_child { get; set; }
    public string type_form { get; set; }
    public string message_form_post { get; set; }
    public string url_form_google { get; set; }
    public SettingsForm settingsForm { get; set; }
    public string required_form { get; set; }
    public string placeholder_form { get; set; }
    public string name_form { get; set; }
    public string label_form { get; set; }
}

public class Desktop2
{
    public string width { get; set; }
    public string height { get; set; }
}

public class Mobile2
{
    public string width { get; set; }
    public string height { get; set; }
}

public class Media2
{
    public Desktop2 desktop { get; set; }
    public Mobile2 mobile { get; set; }
}

public class Conversion
{
    public int mobile { get; set; }
    public string id { get; set; }
    public string lang { get; set; }
    public string lp_type { get; set; }
    public string type_plugin { get; set; }
    public string parent { get; set; }
    public Media2 media { get; set; }
}

public class ArrRule
{
    public List<object> rulerVer { get; set; }
    public List<object> rulerHor { get; set; }
    public string status { get; set; }
}

public class LPSourceModel
{
    public List<ApiElement> apiElement { get; set; }
    public List<Conversion> conversion { get; set; }
    public int numLayerMain { get; set; }
    public int numLayerConversion { get; set; }
    public string title { get; set; }
    public string head { get; set; }
    public string body { get; set; }
    public int saveMobileMain { get; set; }
    public string imagePage { get; set; }
    public string headConvertion { get; set; }
    public string bodyConvertion { get; set; }
    public string domain { get; set; }
    public string typePublish { get; set; }
    public ArrRule arrRule { get; set; }
}

}