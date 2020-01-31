using log4net;
using Microsoft.AspNet.SignalR;
using Punnel.Api.Hubs;
using Punnel.Api.Infrastructure;
using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Punnel.Core.BLL.Utils;
using Punnel.Api.Models;
using System.Net.Http;
using System.Text;

namespace Punnel.Api.Controllers
{
    [AllowCrossSiteJsonAttribute]
    public class SubcribleController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("SubcribleController");
        public SubcribleController(Uow uow) : base(uow) { }

        public async Task<IHttpActionResult> Post(Core.Entities.RequestModel.FormDataRequest data)
        {
            try
            {
                data.IpAddress = this.ClientIP;
                data.IsMobile = this.Request.IsMobileBrowser();
                var lead = await _uow.Lead.Add(data);
                var domain = MBN.Utils.WebUtils.AppSettings("BUIlDER_DOMAIN", "app.punnel.com");
                if (lead.Link.Contains(domain))
                {
                    return Ok();
                }

                //_uow.Lead.GetMoreInfo(lead.Id);
                new Core.BLL.Queue.LeadSubcribleQueue(lead.Id).Execute();

                var aModel = new AutomationRequestModel() { LeadId = lead.Id, PageId = lead.LandingPageId, UserId = lead.UserId };
                var stringContent = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(aModel), UnicodeEncoding.UTF8, "application/json");
                var client = new HttpClient();
                client.PostAsync("https://api.punnel.com/api/automation/add", stringContent);

                client.PostAsync("https://api.punnel.com/api/automation/send-lead", stringContent);

                LeadNotifyResponse res = new LeadNotifyResponse()
                {
                    FullName = lead.FullName,
                    Email = lead.Email,
                    Phone = lead.Phone,
                    Link = lead.Link,
                    IpAddress = lead.IpAddress,
                    Region = ""//lead.RegionName
                };

                var r = _uow.Notification.IU_Alert(new Core.Entities.Notification.Alert()
                {
                    ReferId = lead.Id.ToString(),
                    UserId = lead.UserId,
                    Title = res.Title,
                    Content = res.Content,
                    Type = (int)NotificationType.Subcrible,
                    IsBroadCast = false,
                    Link = res.Link
                });

                try
                {
                    var context = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
                    context.Clients.User(lead.UserId).subcrible_receive(Newtonsoft.Json.JsonConvert.SerializeObject(r));
                }
                catch (Exception ex)
                {
                    _log.ErrorFormat("Lỗi signalR hub: {0}", ex);
                }

                //pushmobile
                try
                {
                    _uow.Notification.PushNotification(lead.UserId, r);
                }catch(Exception ex)
                {
                    _log.ErrorFormat("push mobile err",ex);
                }
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                
                _log.Error(Newtonsoft.Json.JsonConvert.SerializeObject(data));
                _log.Error(ex);
                return BadRequest(ex.Message);
            }
        }

        //public async Task<IHttpActionResult> Get()
        //{
        //    var data = Newtonsoft.Json.JsonConvert.DeserializeObject<Core.Entities.RequestModel.FormDataRequest>("{'dataForm':[{'top':5348.76563,'name':'name','value':'Nguyên'},{'top':5416.797,'name':'phone','value':'0909082535'},{'top':5545.96875,'name':'street','value':'hcm'},{'top':5481.25,'name':'email','value':'nguyenthibinhnguyen87@gmail.com'},{'top':null,'name':'auto_rep','value':'1012'},{'top':null,'name':'url_page','value':'https://collagenvh.com/'},{'top':null,'name':'utm_source','value':null},{'top':null,'name':'utm_medium','value':null},{'top':null,'name':'utm_campaign','value':null},{'top':null,'name':'utm_term','value':null},{'top':null,'name':'utm_content','value':null}],'id':'a23044a0-d713-494c-b670-717f3985a206','IpAddress':'2001:ee0:4fcf:cb0:3cfe:2fc8:97b2:2b9b','IsMobile':false}");
        //    var lead = await _uow.Lead.Add(data);
        //    return Ok();
        //}

        //public async Task<IHttpActionResult> Get()
        //{
        //    try
        //    {
        //        System.Collections.Generic.List<Core.Entities.RequestModel.FormData> dataForm;
        //        dataForm = new System.Collections.Generic.List<Core.Entities.RequestModel.FormData>();

        //        dataForm.Add(new Core.Entities.RequestModel.FormData()
        //        {
        //            name = "url_page",
        //            value = "https://punnel.co/khoa-hoc/"
        //        });
        //        dataForm.Add(new Core.Entities.RequestModel.FormData()
        //        {
        //            name = "name",
        //            value = "Lam Nguyen 1"
        //        });
        //        dataForm.Add(new Core.Entities.RequestModel.FormData()
        //        {
        //            name = "email",
        //            value = "yonofate122@gmail.com"
        //        });
        //        dataForm.Add(new Core.Entities.RequestModel.FormData()
        //        {
        //            name = "phone",
        //            value = "0909999998"
        //        });

        //        Core.Entities.RequestModel.FormDataRequest data = new Core.Entities.RequestModel.FormDataRequest();
        //        data.dataForm = dataForm;
        //        data.id = Guid.Parse("9d731411-b4f5-4b74-b11d-ae02d325330c");
        //        data.IpAddress = "116.118.106.25";
        //        data.IsMobile = this.Request.IsMobileBrowser();
        //        var lead = await _uow.Lead.Add(data);
        //        var domain = MBN.Utils.WebUtils.AppSettings("BUIlDER_DOMAIN", "app.punnel.com");
        //        if (lead.Link.Contains(domain))
        //        {
        //            return Ok();
        //        }

        //        _uow.Lead.GetMoreInfo(lead.Id);
        //        new Core.BLL.Queue.LeadSubcribleQueue(lead.Id).Execute();

        //        LeadNotifyResponse res = new LeadNotifyResponse()
        //        {
        //            FullName = lead.FullName,
        //            Email = lead.Email,
        //            Phone = lead.Phone,
        //            Link = lead.Link,
        //            IpAddress = lead.IpAddress,
        //            Region = lead.RegionName
        //        };

        //        var r = _uow.Notification.IU_Alert(new Core.Entities.Notification.Alert()
        //        {
        //            ReferId = lead.Id.ToString(),
        //            UserId = lead.UserId,
        //            Title = res.Title,
        //            Content = res.Content,
        //            Type = (int)NotificationType.Subcrible,
        //            IsBroadCast = false,
        //            Link = res.Link
        //        });

        //        try
        //        {
        //            var context = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
        //            context.Clients.User(lead.UserId).subcrible_receive(Newtonsoft.Json.JsonConvert.SerializeObject(r));
        //        }
        //        catch (Exception ex)
        //        {
        //            _log.ErrorFormat("Lỗi signalR hub: {0}", ex);
        //        }

        //        return Ok();
        //    }
        //    catch (BusinessException ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        _log.Error(ex.Message, ex);
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
