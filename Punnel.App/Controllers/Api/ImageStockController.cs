using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using log4net;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class ImageStockController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("ImageStockController");
        public ImageStockController(IUow uow) : base(uow) { }
        // GET: api/File

        [CompressContent]
        public async Task<IHttpActionResult> Post([FromBody]FileRequestModel value)
        {
            try
            {
                value.UserId = CurrentUserId;
                var objs = await _uow.ImageStock.SearchAsync(value);
                return Ok(new { data = objs.Item1, total = objs.Item2 });
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
        [Authorize(Roles = "admin,editor")]
        public async Task<IHttpActionResult> Put([FromBody]FileCollectionRequestModel value)
        {
            try
            {
                _uow.ImageStock.UpdateCate(value);
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
        [Authorize(Roles ="admin,editor")]
        public IHttpActionResult Delete(string ids)
        {
            try
            {
                var idl = ids.Split(new char[1] { ',' }).Select(Guid.Parse).ToList();
                _uow.ImageStock.Delete(idl);
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
