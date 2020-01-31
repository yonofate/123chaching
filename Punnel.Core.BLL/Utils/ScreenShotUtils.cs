using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Punnel.Core.Entities.ViewModel;
using RestSharp;

namespace Punnel.Core.BLL.Utils
{
    public class ScreenShotUtils
    {
        public ScreenShotUtils()
        {
        }

        public string GetScreenImgBase64(string url)
        { 
            var client = new RestClient($"https://www.googleapis.com/pagespeedonline/v1/runPagespeed?url={url}&screenshot=true");
            var request = new RestRequest(Method.GET);
            request.AddHeader("cache-control", "no-cache");
            IRestResponse response = client.Execute(request);
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return JsonConvert.DeserializeObject<ScreenShotModel>(response.Content).screenshot.data;
            }
            return null;
        }
    }
}
