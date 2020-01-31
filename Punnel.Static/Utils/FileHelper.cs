using System;
using System.IO;
using System.Web.Hosting;

namespace Punnel.Utils
{
    public class FileHelper
    {
        public static string WriteFile(string fileName, string path, byte[] arr)
        {
            path = CheckFilePath(path);

            var filePath = Path.Combine(path, Guid.NewGuid() + "@" + fileName);
            using (var file = new FileStream(filePath, FileMode.Create, FileAccess.ReadWrite))
            {
                file.Write(arr, 0, arr.Length);
            }

            return filePath;
        }

        public static string CheckFilePath(string path)
        {
            if (!Directory.Exists(path))
            {
                path = Path.Combine(HostingEnvironment.MapPath("~/App_Data"), "TempFileStorage");
                if (!Directory.Exists(path)) Directory.CreateDirectory(path);
            }
            return path;
        }

        /// <summary>
        /// Gets the content type of the file.
        /// </summary>
        /// <param name="fileName">Name of the file.</param>
        /// <returns></returns>
        public static string GetMimeType(string fileName)
        {
            string mime = "application/octetstream";
            string ext = Path.GetExtension(fileName).ToLower();

            Microsoft.Win32.RegistryKey rk = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext);

            if (rk != null && rk.GetValue("Content Type") != null)
                mime = rk.GetValue("Content Type").ToString();

            return mime;
        }

        public static string generateID()
        {
            return Guid.NewGuid().ToString("N");
        }
    }
}