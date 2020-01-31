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

namespace Punnel.App.Controllers
{
    [Authorize]
    public class CateController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("CateController");
        public CateController(IUow uow) : base(uow) { }

        [CompressContent]
        public async Task<IHttpActionResult> Get(int type)
        {
            try
            {
                var objs = await _uow.TemplateCategory.GetByType(type);
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
    }
}
