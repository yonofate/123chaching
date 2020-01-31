using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;

public class ImageModule : IHttpModule
{
    private readonly static string bucketName = "static-bcs/products/";
    private readonly static string host = "https://cdn.becungshop.vn";

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
        if (ext.EndsWith("?be-cung-shop-vn")) ext.Replace("?be-cung-shop-vn", "");
        if (ext.EndsWith(".jpg") )
        {
            try
            {
                var path = app.Context.Request.Path;
                string localpath = app.Context.Server.MapPath(path);
                if (File.Exists(localpath)) return;
                else
                {
                    var rootUrl = HttpContext.Current.Server.MapPath("~");
                    var imgSave = path.Replace(host, "");
                    var orginImg = path.Replace("images/100x100/", bucketName).Replace("-100x100.jpg", ".jpg");
                    var t = host + orginImg + "?w=100&h=100";
                    var m = rootUrl + imgSave;
                    using (var wc = new WebClient())
                    {
                        wc.DownloadFile(t,m);
                    }
                    return;
                }
            }
            catch (Exception ex)
            {
                return;
            }
            
        }
    }

}
