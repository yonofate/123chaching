using Punnel.Utils;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

public class ImageModule : IHttpModule
{

    public void Init(HttpApplication app)
    {
        // register for events created by the pipeline 
        app.BeginRequest += new EventHandler(this.OnBeginRequest);

    }
    public void Dispose() { }
    public void OnBeginRequest(object o, EventArgs args)
    {
        HttpApplication app = (HttpApplication)o;
        var ext = Path.GetExtension(app.Context.Request.Path.ToLower());
        if (ext.EndsWith(".jpg") || ext.EndsWith(".png") || ext.EndsWith(".bmp"))
        {
            Regex pattern = new Regex(@"/img/s(?<imageWidth>\d+)x(?<imageHeight>\d+)/(?<userid>\w+)/img_(?<filename>\w+).(?<ext>\w..+)$");
            Image newImg;
            try
            {
                var path = app.Context.Request.Path;
                string localpath = app.Context.Server.MapPath(path);
                if (File.Exists(localpath)) return;

                if (path.StartsWith("/img/s"))
                {
                    Match match = pattern.Match(path.Replace("-",""));
                    string m = "/s" + match.Groups["imageWidth"].Value + "x" + match.Groups["imageHeight"].Value;
                    path = path.Replace(m, "");
                    localpath = app.Context.Server.MapPath(path);
                    var imgOrigin = Image.FromFile(localpath);

                    int w = int.Parse(match.Groups["imageWidth"].Value);
                    int h = int.Parse(match.Groups["imageHeight"].Value);
                    newImg = ImageHelper.Resize(imgOrigin, w, h, true);

                    MemoryStream mem = new MemoryStream();
                    if (ext == ".png") newImg.Save(mem, ImageFormat.Png);
                    else newImg.Save(mem, ImageFormat.Jpeg);

                    byte[] buffer = mem.ToArray();
                    app.Context.Response.ContentType = (ext == ".jpg") ? "image/jpg" : "image/png";
                    app.Context.Response.BinaryWrite(buffer);
                    app.Context.Response.Flush();
                    app.Context.Response.End();
                }

            }
            catch (Exception)
            {
                return;
            }
            
        }
    }

}
