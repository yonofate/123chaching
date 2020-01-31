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
    public class PromotionController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("PromotionController");
        public PromotionController(IUow uow) : base(uow) { }
        [CompressContent]
        public async Task<IHttpActionResult> Get(int serviceId, string code)
        {
            try
            {
                var obj = await _uow.PromotionCode.UseByCode(serviceId,code);
                if(obj==null) return BadRequest("Mã giảm giá cho dịch vụ này không hợp lệ hoặc đã hết hạn!");
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

        [CompressContent]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> Get([FromUri] PromotionQuery data)
        {
            try
            {
                var res = await _uow.Promotion.Search(data);
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
        public async Task<IHttpActionResult> Post(Promotion data)
        {
            try
            {
                _uow.Promotion.IU(data);
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
