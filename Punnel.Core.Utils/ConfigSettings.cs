using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Utils
{
    public static class ConfigSettings
    {
        public static string Get(string key, string defaultValue)
        {
            var value = System.Configuration.ConfigurationManager.AppSettings[key];
            if (value == null) return defaultValue;
            return value;
        }
    }
}
