using log4net;
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
    private static readonly ILog _log = LogManager.GetLogger("ImageModule");
    public void Init(HttpApplication app)
    {
        // register for events created by the pipeline 
        app.BeginRequest += new EventHandler(this.OnBeginRequest);
        //app.EndRequest += Application_EndRequest;
    }

    public void Dispose() { }
    public void OnBeginRequest(object o, EventArgs args)
    {
        HttpApplication app = (HttpApplication)o;
        var context = app.Context;
        var ext = Path.GetExtension(app.Context.Request.Path.ToLower());

        if ((ext.EndsWith(".jpg") || ext.EndsWith(".png") || ext.EndsWith(".bmp")) && app.Context.Request.Path.StartsWith("/img/s"))
        {
            context.Response.Cache.SetCacheability(HttpCacheability.Public);
            //var pp = app.Context.Server.MapPath(app.Context.Request.Path);
            context.Response.Cache.SetMaxAge(new TimeSpan(365,0, 0, 0));

           // if (!System.IO.File.Exists(pp)) return;
           //var lastDate = System.IO.File.GetLastWriteTime(pp);
            
           // string rawIfModifiedSince = context.Request.Headers.Get("If-Modified-Since");
           // if (string.IsNullOrEmpty(rawIfModifiedSince))
           // {
           //     // Set Last Modified time
           //     context.Response.Cache.SetLastModified(lastDate);
           // }
           // else
           // {
           //     DateTime ifModifiedSince = DateTime.Parse(rawIfModifiedSince);

           //     // HTTP does not provide milliseconds, so remove it from the comparison
           //     if (lastDate == ifModifiedSince)
           //     {
           //         // The requested file has not changed
           //         context.Response.StatusCode = 304;
           //         return;
           //     }
           // }

            Regex pattern = new Regex(@"/img/s(?<imageWidth>\d+)x(?<imageHeight>\d+)/(?<userid>\w+)/img_(?<filename>\w+).(?<ext>\w..+)$");
            Image newImg;
            try
            {
                var path = app.Context.Request.Path;
                string localpath = app.Context.Server.MapPath(path);
                _log.Warn(path);
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
                    context.Response.Cache.SetLastModified(DateTime.Now);
                    app.Context.Response.End();
                }
                else
                {
                    if (File.Exists(localpath))
                    {
                        //context.Response.StatusCode = 304;
                        //app.Context.Response.Flush();
                        //context.Response.Cache.SetLastModified(System.IO.File.GetLastWriteTime(localpath));
                        //app.Context.Response.End();
                        return;
                    }
                    else
                    {
                        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        context.Response.Cache.SetMaxAge(new TimeSpan(0, 0, 0));
                        return;
                    }
                }

            }
            catch (Exception ex)
            {
                context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                context.Response.Cache.SetMaxAge(new TimeSpan(0, 0, 0));
                _log.Error(ex);
                return;
            }
            
        }
    }

}
