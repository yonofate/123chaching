using Punnel.Api.Controllers;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Punnel.Core.BLL;
using Punnel.Core.Entities.RequestModel;
using System.Threading.Tasks;
using log4net;

namespace Punnel.Api.Controllers
{
    [RoutePrefix("api/page")]
    [CompressContent]
    public class LandingPageController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("LandingPageController");
        public LandingPageController(IUow uow) : base(uow) { }

        [Route("getbykey")]
        public async Task<IHttpActionResult> Get(string punnel_key)
        {
            try
            {
                _log.InfoFormat("PunnelKey: {0}", punnel_key);
                var k = punnel_key.Split('_');
                if (k.Length != 2) return Ok(new { status = false, msg = "Dữ liệu không hợp lệ" });
                var id = Guid.Parse(k[0]);
                var apikey = k[1];
                var lp = await _uow.LandingPage.GetByApiKey(id, apikey);
                var html = "";
                using (WebClient client = new WebClient())
                {
                    html = client.DownloadString("http://" + lp.Domain);
                }
                var data = new Punnel.Api.Models.WpPublishModel()
                {
                    title = lp.Name,
                    url= lp.UrlCode,
                    html = html
                };
                return Ok(new {code=200, data=data});
            }
            catch (BusinessException ex)
            {
                _log.Error(ex);
                return Ok(new { code = 400, msg = ex.Message });
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(new { status = 400, msg = this.General_Err });
            }
        }
    }
}
