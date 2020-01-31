using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web;
using Punnel.Tracking;
public class TrackingModule : IHttpModule
{
    public void Init(HttpApplication app)
    {
        app.BeginRequest += new EventHandler(this.OnBeginRequest);
    }
    public void Dispose() { }
    public void OnBeginRequest(object o, EventArgs args)
    {
        HttpApplication app = (HttpApplication)o;
        var ext = app.Context.Request.Path.ToLower();
        var log_enable = ConfigurationManager.AppSettings["log_enable"];
        if(!string.IsNullOrEmpty(log_enable)) LogRequest(app.Context.Request);
        if (ext.EndsWith(".html"))
        {
            try
            {
                if (app.Context.Request.IsBot()) return;
                var spageId = ConfigurationManager.AppSettings["page_id"];
                if (string.IsNullOrEmpty(spageId)) return;
                Guid pageId = Guid.Parse(spageId);
                
                var request = app.Context.Request;
                var data = new Punnel.Tracking.Model.TrackingModel()
                {
                    PageId = pageId,
                    IpAddress = request.GetRequestIP(),
                    IsMobile = request.IsMobileBrowser(),
                    SourceId = request.GetTrafficSource(),
                    Os = request.UserAgent(),
                    Referer = request.Referer(),
                    Link = request.Link(),
                    Params = request.GetParams(),
                    IsGoogleAds= request.IsFromGoogleAds(),
                    IsFacebookAds = request.IsFromFacebookAds()
                };
                new ApiUtils().Track(data);
                return;
            }
            catch (Exception ex)
            {
                System.IO.File.WriteAllText(@"C:\logs\page_tracking_err.txt", ex.Message);
                return;
            }   
        }
    }

    void LogRequest(HttpRequest request)
    {
        List<string> lines = new List<string>();
        foreach (var item in request.ServerVariables)
        {
            string xxx = string.Format("{0}: {1}", item.ToString(), request.ServerVariables[item.ToString()]);
            lines.Add(xxx);
        }
        string fileName = string.Format("page_tracking_request_{0}.txt", DateTime.Now.Ticks);
        var file = System.IO.Path.Combine(@"C:\logs\", fileName);
        System.IO.File.WriteAllLines(file, lines.ToArray());
    }

}
