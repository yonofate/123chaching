using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Punnel.Core.Utils;

namespace Punnel.Core.BLL.FileServices
{
    public class FileTemplateBuilder
    {
        string _folder = "";
        string _contentHtml = "";

        private static readonly string demo_Folder_Root = ConfigSettings.Get("THEMES_TEMP_FOLDER_ROOT", @"C:\Punnel\Themes\Temp");
        private static readonly string demo_Domain = ConfigSettings.Get("THEMES_DOMAIN", @"templates.punnel.com");
        private static readonly string htmlFileName = "index.html";
        public FileTemplateBuilder(string folder, string contentHtml)
        {
            _folder = folder;
            _contentHtml = contentHtml;
        }

        public string Create()
        {

            string sfolder = System.IO.Path.Combine(demo_Folder_Root, _folder);

            //Tao Folder 
            if (System.IO.Directory.Exists(sfolder) == false)
                System.IO.Directory.CreateDirectory(sfolder);

            var pathString = System.IO.Path.Combine(sfolder, htmlFileName);

            System.IO.File.WriteAllText(pathString, _contentHtml, Encoding.UTF8);
            return string.Format("{0}/{1}", demo_Domain, _folder);
        }

        public void Remove()
        {
            string sfolder = System.IO.Path.Combine(demo_Folder_Root, _folder);
            if (System.IO.Directory.Exists(sfolder))
                System.IO.Directory.Delete(sfolder, true);
        }
    }
}
