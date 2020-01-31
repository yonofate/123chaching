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
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.Model;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class PromotionCodeController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("PromotionCodeController");
        public PromotionCodeController(IUow uow) : base(uow) { }

        [CompressContent]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> Get([FromUri] PromotionCodeQuery data)
        {
            try
            {
                var res = await _uow.PromotionCode.Search(data);
                return Ok(new { data = res.Item1, total = res.Item2 });
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

        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> Post(PromotionCode data)
        {
            try
            {
                _uow.PromotionCode.IU(data);
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
