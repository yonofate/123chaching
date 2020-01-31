using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Punnel.Static.Utils
{
    public class ApiUtils
    {
        private static readonly string ReadMailApi_Url = "https://api.punnel.com/api/track/mail-open";
        public ApiUtils()
        {            
        }
        public void ReadMail(int l, int t, long d)
        {
            HttpClient client = new HttpClient();
            client.GetAsync(string.Format("{0}?leadId={1}&templateId={2}&timeId={3}",ReadMailApi_Url,l,t,d));
        }
    }
}