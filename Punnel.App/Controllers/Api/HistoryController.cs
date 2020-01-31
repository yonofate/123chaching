using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using log4net;
using Newtonsoft.Json;
using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class HistoryController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("HistoryController");
        public HistoryController(IUow uow) : base(uow) { }

        [CompressContent]
        public async Task<IHttpActionResult> Get(Guid page_id)
        {
            try
            {
                var objs = await _uow.HistoryPage.GetByLandingPage(page_id);
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

        [CompressContent]
        public async Task<IHttpActionResult> Get(long id, Guid page_id)
        {
            try
            {
                var obj = _uow.HistoryPage.Get(id,page_id);
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

        public async Task<IHttpActionResult> Delete(long id, Guid page_id)
        {
            try
            {
                _uow.HistoryPage.Delete(id,page_id);
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
