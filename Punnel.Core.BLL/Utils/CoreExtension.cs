using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Utils
{
    public static class CoreExtension
    {
        private static readonly DateTime unixStartTime = new DateTime(1970, 1, 1, 0, 0, 0);
        /// <summary>
        /// Chuyển ngày sang UnixTime
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static long ToUnixTimeSeconds(this DateTime date)
        {
            return (long)(date.ToLocalTime() - unixStartTime).TotalSeconds;
        }
        public static DateTime FromUnixTimeSeconds(this long unixTime)
        {
            // var epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            //return unixStartTime.AddSeconds(unixTime).ToLocalTime();
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddMilliseconds(unixTime).ToLocalTime();
            return dtDateTime;
        }

        public static DateTime UTCFromUnixTimeSeconds(this long unixTime)
        {
            // var epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            //return unixStartTime.AddSeconds(unixTime).ToLocalTime();
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddMilliseconds(unixTime).ToLocalTime();
            return dtDateTime.ToUniversalTime().AddMinutes(-3);
        }

        public static long ToUnixTimeMiliseconds(this DateTime date)
        {
            return (long)(date.ToLocalTime() - unixStartTime).TotalMilliseconds;
        }
        public static DateTime FromUnixTimeMiliseconds(this long unixTime)
        {
            return unixStartTime.AddMilliseconds(unixTime).ToLocalTime();
        }

        public static bool HasBit(this int v, int bit)
        {
            return ((v & bit) == bit);
        }

        public static int AddOrRemoveBit(this int v, bool add, int bit)
        {
            if (add == true)
            {
                return (v | bit); // add
            }
            return ((v | bit) ^ bit); // remove
        }

        public static bool HasBit(this long v, long bit)
        {
            return ((v & bit) == bit);
        }

        public static long AddOrRemoveBit(this long v, bool add, long bit)
        {
            if (add == true)
            {
                return (v | bit); // add
            }
            return ((v | bit) ^ bit); // remove
        }
    }
}
