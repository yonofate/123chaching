using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using log4net;

namespace Punnel.Core.Utils
{
    public static class StringUtils
    {
        private static readonly ILog _log = LogManager.GetLogger("StringUtils");

        public static string GenerateCode()
        {
            return DateTime.Now.GetHashCode().ToString("x");
        }
        public static string StreamToString(Stream stream)
        {
            stream.Position = 0;
            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }

        public static Stream StringToStream(string src)
        {
            byte[] byteArray = Encoding.UTF8.GetBytes(src);
            return new MemoryStream(byteArray);
        }

        public static string ToFriendlyUrl(string value)
        {
            return Regex.Replace(value, @"[^A-Za-z0-9_\.~]+", "-");
        }

        public static string GetRequestIP()
        {
            HttpRequest request = HttpContext.Current.Request;
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

        //public static string GetRequestIP()
        //{
        //    HttpRequest request = HttpContext.Current.Request;

        //    string ip = "";
        //    if (string.IsNullOrWhiteSpace(ip))
        //    {
        //        ip = request.ServerVariables["HTTP_X_FORWARDED_FOR"];
        //    }
        //    if (string.IsNullOrWhiteSpace(ip))
        //    {
        //        ip = request.ServerVariables["X-Forwarded-For"];
        //    }
        //    if (string.IsNullOrWhiteSpace(ip))
        //    {
        //        ip = request.ServerVariables["REMOTE_ADDR"];
        //    }

        //    if (string.IsNullOrWhiteSpace(ip))
        //    {
        //        return request.UserHostAddress;
        //    }

        //    string s = "";
        //    if (ip.Contains(",") == true)
        //    {
        //        var xx = request.Headers.GetValues("Referer");
        //        var referer = xx == null ? "" : string.Join(", ", xx);
        //        var list_ip = ip.Split(new char[1] { ',' });
        //        _log.Info(list_ip);
        //        //if (referer.Contains("punnel.co"))
        //        //{
        //        //    s = list_ip.FirstOrDefault();
        //        //}
        //        //else
        //        s = list_ip.LastOrDefault();
        //    }
        //    else
        //    {
        //        s = ip;
        //    }
        //    return s;
        //}

        public static bool ValidateIpByDomain(string domain, string serverIp)
        {
            try
            {
                IPHostEntry host;
                host = Dns.GetHostEntry(domain);
                var l = host.AddressList.ToList();
                var sip = IPAddress.Parse(serverIp).Address;
                return l.Any(x => x.Address.Equals(sip));
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static string Encode(string s)
        {
            return HttpUtility.HtmlEncode(s);
        }
    }
}
