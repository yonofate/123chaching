using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.RequestModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Punnel.Core.Entities.ViewModel;
using System.Threading.Tasks;
using Punnel.Core.BLL;
using Punnel.Api.Infrastructure;
using log4net;

namespace Punnel.Api.Controllers
{
    [AllowCrossSiteJsonAttribute]
    [Authorize]
    public class LeadController : BaseApiController
    {
        private static readonly log4net.ILog _log = LogManager.GetLogger("LeadController");
        public LeadController(IUow uow) : base(uow) { }

        [HttpGet]
        [CompressContent]
        public async Task<IHttpActionResult> Get(string keyword, int limit, int page, int? status = null, int? contact = null, string region = null, bool? ismobile = null, Guid? landingpageid = null)
        {
            try
            {
                var objs = await _uow.Lead.SearchAsync(new LeadSearchRequest()
                {
                    Keyword = keyword,
                    Limit = limit,
                    Page = page,
                    Status = status,
                    Contact = contact,
                    Region = region,
                    IsMobile = ismobile,
                    LandingPageId = landingpageid,
                    UserId = CurrentUserId
                });
                return Ok(new { Data = objs.Item1, Total = objs.Item2 });
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

        [HttpGet]
        [CompressContent]
        public async Task<IHttpActionResult> Get(int id)
        {
            try
            {
                var obj = await _uow.Lead.GetById(id, this.CurrentUserId);
                return Ok(obj);
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

        [HttpPost]
        public IHttpActionResult Post(Core.Entities.Model.Lead data)
        {
            try
            {
                data.UserId = this.CurrentUserId;
                _uow.Lead.UpdateStatus(data);
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

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                _uow.Lead.Delete(id,this.CurrentUserId);
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
