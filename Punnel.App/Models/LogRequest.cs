using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Punnel.App.Models
{
    public class LogRequest
    {
        public string User { get; set; }
        public string Url { get; set; }
        public string Method { get; set; }
        public string Referer { get; set; }
    }

    public class ErrorModel
    {
        public int StatusCode { get; set; }
    }
}