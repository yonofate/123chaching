using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using ImageResizer.Util;
using log4net;

namespace Punnel.WebImage.Controllers
{
    public class TrackController : ApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("TrackController");
        // GET: OpenMail
        public HttpResponseMessage Mail(int l, int t, long d)
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