using Punnel.App.Controllers;
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
using System.Threading.Tasks;
using log4net;
using Punnel.Core.Entities.Integration.Gmail;
using Punnel.Core.Entities.Model;

namespace Punnel.App.Controllers
{
    [Authorize]
    [RoutePrefix("api/campain")]
    public class MarketingController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("MarketingController");
        public MarketingController(IUow uow) : base(uow) { }

        [Route("sendmail")]
        public IHttpActionResult SendMail(SendMailByTemplateModel model)
        {
            try
            {
                var ids = model.LeadIds.Split(new char[1] { ',' });
                foreach (var item in ids)
                {
                    _uow.MailToSend.IU(new MailToSend()
                    {
                        LeadId = int.Parse(item),
                        TemplateId = model.TemplateId,
                        UserId = this.CurrentUserId
                    });
                }
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }
    }
}
