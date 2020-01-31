using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using log4net;

namespace Punnel.Static.Controllers
{
    public class TrackController : Controller
    {
        private static readonly ILog _log = LogManager.GetLogger("TrackController");
        // GET: OpenMail
        public ActionResult Mail(int l, int t, long d)
        {
            try
            {
                new Utils.ApiUtils().ReadMail(l, t, d);
                var dir = Server.MapPath("/Content");
                var path = Path.Combine(dir, "none" + ".gif"); 
                if(!System.IO.File.Exists(path)) (new Bitmap(1, 1)).Save(dir + "/none.gif", ImageFormat.Gif);
                return base.File(path, "image/gif");
            }catch(Exception ex)
            {
                _log.Error(ex);
                return Content(string.Empty);
            }
        }
    }
}