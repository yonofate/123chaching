using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.FileServiceProxy
{
   public class Configs
    {
       public static readonly string TransferService_File = ConfigurationManager.AppSettings["TransferService_File"];
        public static readonly string TransferService_RemoveFile = ConfigurationManager.AppSettings["TransferService_RemoveFile"];
        public static readonly string TransferService_DeleteFile = ConfigurationManager.AppSettings["TransferService_DeleteFile"];
        public static readonly string TransferService_Url = ConfigurationManager.AppSettings["TransferService_Url"];
       public static readonly string TransferService_Salt = ConfigurationManager.AppSettings["TransferService_Salt"];
       public static readonly string TransferService_Domain = ConfigurationManager.AppSettings["TransferService_Domain"];
    }
}
