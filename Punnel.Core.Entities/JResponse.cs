using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities
{
    //public class JResponse
    //{
    //    /// <summary>
    //    /// Dữ liệu trả về
    //    /// </summary>
    //    public object data { get; set; }

    //    /// <summary>
    //    /// Thông báo
    //    /// </summary>
    //    public object messager { get; set; }

    //    /// <summary>
    //    /// Mã status response
    //    /// </summary>
    //    public int code { get; set; }
    //}

    public class ApiResponse
    {
        /// <summary>
        /// Dữ liệu trả về
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// Thông báo
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Mã status response
        /// </summary>
        public System.Net.HttpStatusCode Code { get; set; }
    }
}
