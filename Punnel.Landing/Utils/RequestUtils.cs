using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace Punnel.Tracking
{
    public static class RequestUtils
    {
        private static readonly Regex b = new Regex(@"(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino", RegexOptions.IgnoreCase | RegexOptions.Multiline);
        private static readonly Regex v = new Regex(@"1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-", RegexOptions.IgnoreCase | RegexOptions.Multiline);

        private static readonly ReadOnlyCollection<string> searchSources = new ReadOnlyCollection<string>(new string[] { "google.com", "bing.com", "wolframalpha.com", "yahoo.com", "baidu.com", "yandex.com", "duckduckgo.com", "twurdy.com", "ask.com", "search.aol.com" });
        private static readonly ReadOnlyCollection<string> socialSources = new ReadOnlyCollection<string>(new string[] { "facebook.com", "zalo.me", "twitter.com", "linkedin.com", "pinterest.com", "plus.google.com", "me.zing.vn" });
        private static readonly List<string> botAgent = GetBotAgent();
        private static readonly List<string> botIp = GetBotIp();
        private static readonly ReadOnlyCollection<KeyValuePair<string,string>> websites = new ReadOnlyCollection<KeyValuePair<string, string>>(new KeyValuePair<string, string>[] { new KeyValuePair<string, string>("https://t.co/", "https://twitter.com/") });
        
        public static string GetRequestIP(this HttpRequest request)
        {           
            string ip = "";
            if (request.Url.AbsoluteUri.Contains("//punnel.com") || request.Url.AbsoluteUri.Contains(".punnel.com"))
            {
                if (string.IsNullOrWhiteSpace(ip))
                {
                    ip = request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                }
                if (string.IsNullOrWhiteSpace(ip))
                {
                    ip = request.ServerVariables["X-Forwarded-For"];
                }
            }
            
            if (string.IsNullOrWhiteSpace(ip))
            {
                ip = request.ServerVariables["REMOTE_ADDR"];
            }

            if (string.IsNullOrWhiteSpace(ip))
            {
                return request.UserHostAddress;
            }
            string s = "";
            if (ip.Contains(",") == true)
            {
                //var list_ip = ip.Split(new char[1] { ',' });
                //s = list_ip.LastOrDefault();

                var xx = request.Headers.GetValues("Referer");
                var referer = xx == null ? "" : string.Join(", ", xx);
                var list_ip = ip.Split(new char[1] { ',' });
                s = list_ip.LastOrDefault();
            }
            else
            {
                s = ip;
            }
            return s;
        }

        public static bool IsBot(this HttpRequest request)
        {
            var userAgent = request.UserAgent().ToLower();
            if (userAgent.Length <= 65) return true;
            if (userAgent.Contains("mozilla") == false || botAgent.Any(x => userAgent.Contains(x)) == true) return true;

            var ip = GetRequestIP(request);
            if(botIp.Any(x => ip.StartsWith(x)) == true) return true;
            return false;
        }
        public static bool IsMobileBrowser(this HttpRequest request)
        {
            var userAgent = request.UserAgent().ToLower();
            if ((b.IsMatch(userAgent) || v.IsMatch(userAgent.Substring(0, 4))))
            {

                return true;
            }

            return false;
        }

        public static string Host(this HttpRequest request)
        {
            return request.ServerVariables["SERVER_NAME"];
        }
        public static string UserAgent(this HttpRequest request)
        {
            var xx = request.Headers.GetValues("User-Agent");
            return xx == null ? "" : string.Join(", ", xx);
        }

        public static string Referer(this HttpRequest request)
        {
            var xx = request.Headers.GetValues("Referer");
            var r = xx == null ? "" : string.Join(", ", xx);
            if (string.IsNullOrEmpty(r)) return "";
            foreach (var item in websites)
            {
                r = r.Replace(item.Key, item.Value);
            }
            return r;
        }

        public static string HeaderValueByName(this HttpRequest request, string name)
        {
            var xx = request.Headers.GetValues(name);
            return xx == null ? "" : string.Join(", ", xx);
        }

        public static string Link(this HttpRequest request)
        {
            var link = request.Url.AbsoluteUri.Replace("/index.html", "").Replace("https://", "").Replace("http://", "").ToLower();
            if (request.Url.Query.Length > 0) link = link.Replace(request.Url.Query, "");
            return link;
        }

        public static int GetTrafficSource(this HttpRequest request)
        {
            var url = request.Url.AbsoluteUri.Replace("index.html", "");
            var referer = request.Referer();
            if (string.IsNullOrEmpty(referer) || referer == url) return 0;
            else if (searchSources.Any(s => referer.Contains(s)))
            {
                //if (request.IsFromGoogleAds() == true) return 4;
                return 1;
            }
            else if (socialSources.Any(s => referer.Contains(s)))
            {
                //if (request.IsFromFacebookAds() == true) return 5;
                return 2;
            }
            else return 3;
        }

        static bool IsFrom(this HttpRequest request, string domainName)
        {
            var referer = request.Referer();
            return referer.Contains(domainName.ToLower());
        }

        public static bool IsFromGoogleAds(this HttpRequest request)
        {
            return (request.IsFrom("google.com") && request.Url.Query.Contains("gclid"));
        }

        public static bool IsFromFacebookAds(this HttpRequest request)
        {
            return (request.IsFrom("facebook.com") && request.Url.Query.Contains("dclid"));
        }

        public static string GetParams(this HttpRequest request)
        {
            return request.Url.Query;
        }


        static List<string> GetBotAgent()
        {
            string[] lines = System.IO.File.ReadAllLines(@"C:\punnel\configs\trackingview\bot_agent.txt");
            return lines.ToList();
        }
        static List<string> GetBotIp()
        {
            string[] lines = System.IO.File.ReadAllLines(@"C:\punnel\configs\trackingview\bot_ip.txt");
            return lines.ToList();
        }
    }
}