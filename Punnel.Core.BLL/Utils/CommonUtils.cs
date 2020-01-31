using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using log4net;
using MBN.Utils;
using Punnel.Core.Entities;

namespace Punnel.Core.BLL.Utils
{
    public static class CommonUtils
    {
        private static readonly ILog _log = LogManager.GetLogger("CommonUtils");
        private static readonly string[] VietnameseSigns = new string[]
        {

            "aAeEoOuUiIdDyY",
            "áàạảãâấầậẩẫăắằặẳẵ",
            "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
            "éèẹẻẽêếềệểễ",
            "ÉÈẸẺẼÊẾỀỆỂỄ",
            "óòọỏõôốồộổỗơớờợởỡ",
            "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
            "úùụủũưứừựửữ",
            "ÚÙỤỦŨƯỨỪỰỬỮ",
            "íìịỉĩ",
            "ÍÌỊỈĨ",
            "đ",
            "Đ",
            "ýỳỵỷỹ",
            "ÝỲỴỶỸ"
        };
        public static string ToFriendllyUrl(string s, int length = 200)
        {
            if (string.IsNullOrWhiteSpace(s))
            {
                return string.Empty;
            }
            s = s.Replace("–", "");
            s = WebUtils.RemoveAccents(s);
            s = Regex.Replace(s, @"[^a-zA-Z0-9\-]+", "-");
            s = Regex.Replace(s, @"\-{2,}", "-");
            if (s.Length > length) s = s.Substring(0, length);
            s = s.TrimEnd('-').TrimStart('-');
            return s.ToLower();
        }

        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public static string FormatEmailTemplate(string template, params KeyValuePair<string,string>[] p)
        {
            foreach(var item in p)
            {
                template = template.Replace(item.Key, item.Value);
            }
            return template;
        }

        //regex from http://detectmobilebrowsers.com/
        private static readonly Regex b = new Regex(@"(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino", RegexOptions.IgnoreCase | RegexOptions.Multiline);
        private static readonly Regex v = new Regex(@"1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-", RegexOptions.IgnoreCase | RegexOptions.Multiline);

        private static readonly ReadOnlyCollection<string> searchSources = new ReadOnlyCollection<string>(new string[] {"google.com","bing.com", "wolframalpha.com", "yahoo.com", "baidu.com", "yandex.com", "duckduckgo.com", "twurdy.com", "ask.com", "search.aol.com"});
        private static readonly ReadOnlyCollection<string> socialSources = new ReadOnlyCollection<string>(new string[] { "facebook.com", "zalo.me", "twitter.com", "linkedin.com", "pinterest.com", "plus.google.com", "me.zing.vn"});
        public static bool IsMobileBrowser(this System.Net.Http.HttpRequestMessage request)
        {
            var userAgent = request.UserAgent().ToLower();
           // _log.Info(userAgent);
            if ((b.IsMatch(userAgent) || v.IsMatch(userAgent.Substring(0, 4))))
            {
                
                //_log.Info("mobile");
                return true;
            }

            return false;
        }

        public static string UserAgent(this System.Net.Http.HttpRequestMessage request)
        {
            var xx= request.Headers.GetValues("User-Agent");
            return string.Join(", ", xx);
        }

        public static TrafficSource GetTrafficSource(this System.Net.Http.HttpRequestMessage request)
        {
            var url = request.RequestUri.AbsoluteUri;
            var referers = request.Headers.GetValues("Referal");
            var referer = string.Join(", ", referers);
            if (string.IsNullOrEmpty(referer) || referer == url) return TrafficSource.Direct;
            else if (searchSources.Any(s => referer.Contains(s))) return TrafficSource.Search;
            else if (socialSources.Any(s => referer.Contains(s))) return TrafficSource.Social;
            else return TrafficSource.Other;
        }

        public static bool ValidateIPv4(string ipString)
        {
            if (String.IsNullOrWhiteSpace(ipString))
            {
                return false;
            }

            string input = ipString;

            IPAddress address;
            if (IPAddress.TryParse(input, out address))
            {
                if (address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork || address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetworkV6) return true;
            }
            return false;
            //string[] splitValues = ipString.Split('.');
            //if (splitValues.Length != 4)
            //{
            //    return false;
            //}

            //byte tempForParsing;

            //return splitValues.All(r => byte.TryParse(r, out tempForParsing));
        }

        public static string GetSubDomain(string surl)
        {
            var url = new Uri(surl);
            if (url.HostNameType == UriHostNameType.Dns)
            {

                string host = url.Host;

                var nodes = host.Split('.');
                if (nodes[0] == "www") return nodes[1].ToString();
                else return nodes[0].ToString();

            }

            return null;
        }

        public static string GetLastWordOfString(string s)
        {
            if (s.IndexOf(" ") < 0) return s;
            var a = s.Split(new char[1] { ' ' });
            return a.LastOrDefault().Trim();
        }

        public static string GetDomainFromUrl(string url)
        {
            if (!(url.StartsWith("http://") || url.StartsWith("https://"))) url = "http://" + url;
            Uri myUri = new Uri(url);
            return myUri.Host;
        }
        public static string RemoveSign4VietnameseString(string str)
        {
            for (int i = 1; i < VietnameseSigns.Length; i++)
            {
                for (int j = 0; j < VietnameseSigns[i].Length; j++)
                    str = str.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
            }
            return str;
        }

    }
}
