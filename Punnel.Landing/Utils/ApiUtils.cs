
using System.Configuration;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Punnel.Tracking.Model;

namespace Punnel.Tracking
{
    public class ApiUtils
    {
        private static readonly string uri_trackPage = "https://api.punnel.com/api/track/page-view";
        public ApiUtils()
        {            
        }
        public void Track(TrackingModel model)
        {
            var json = JsonConvert.SerializeObject(model);
            var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
            var client = new HttpClient();
            client.PostAsync(uri_trackPage, stringContent);
        }
    }
}