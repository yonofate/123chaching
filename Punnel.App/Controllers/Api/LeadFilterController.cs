using Punnel.Core.BLL.Repositories;
using System;
using System.Web.Http;
using Punnel.Core.BLL;
using log4net;
using Punnel.Core.Entities.Model;
using System.Threading.Tasks;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class LeadFilterController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("LeadFilterController");
        public LeadFilterController(IUow uow) : base(uow) { }

        [CompressContent]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var objs = await _uow.LeadFilter.GetByUser(this.CurrentUserId);
                return Ok(objs);
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

        public IHttpActionResult Post(LeadFilter model)
        {
            try
            {
                model.UserId = this.CurrentUserId;
                var res = _uow.LeadFilter.IU(model);
                return Ok(res);
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

        public IHttpActionResult Delete(int id)
        {
            try
            {
                _uow.LeadFilter.Delete(id, this.CurrentUserId);
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
