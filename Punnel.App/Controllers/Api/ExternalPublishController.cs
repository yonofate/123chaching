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
using Punnel.Core.Entities.ViewModel;
using log4net;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class ExternalPublishController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("ExternalPublishController");
        public ExternalPublishController(IUow uow) : base(uow) { }

        [CompressContent]
        public async Task<IHttpActionResult> Get(Guid pageid)
        {
            try
            {
                var obj = await _uow.ExternalPublish.GetByPage(pageid, this.CurrentUserId);
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

        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                _uow.ExternalPublish.Delete(id, this.CurrentUserId);
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
