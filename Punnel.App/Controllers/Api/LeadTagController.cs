using Punnel.Core.BLL.Repositories;
using System;
using System.Web.Http;
using Punnel.Core.BLL;
using log4net;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class LeadTagController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("LeadTagController");
        public LeadTagController(IUow uow) : base(uow) { }

        [CompressContent]
        public IHttpActionResult Get()
        {
            try
            {
                var objs = _uow.LeadTag.GetByUser(this.CurrentUserId);
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

        public async Task<IHttpActionResult> Post(LeadTagAddRequest model)
        {
            try
            {
                model.Tag.UserId = this.CurrentUserId;
                var res= await _uow.LeadTag.AddTag(model);
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

        public async Task<IHttpActionResult> Put(LeadTagDeleteRequest model)
        {
            try
            {
                await _uow.LeadTag.DeleteTag(model, this.CurrentUserId);
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

        public async Task<IHttpActionResult> Delete(int id)
        {
            try
            {
                await _uow.LeadTag.Delete(id, this.CurrentUserId);
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
