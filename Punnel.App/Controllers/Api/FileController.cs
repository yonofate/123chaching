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
    public class FileController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("FileController");
        public FileController(IUow uow) : base(uow) { }
        // GET: api/File
        [CompressContent]
        public async Task<IHttpActionResult> Post([FromBody]FileRequestModel value)
        {
            try
            {
                value.UserId = CurrentUserId;
                var objs = await _uow.File.SearchAsync(value);
                return Ok(new { data = objs.Item1, total = objs.Item2 - 1});
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

        public async Task<IHttpActionResult> Put([FromBody]FileCollectionRequestModel value)
        {
            try
            {
                _uow.File.UpdateCollection(value,this.CurrentUserId);
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

        //public IHttpActionResult Delete(Guid id)
        //{
        //    try
        //    {
        //        _uow.File.Delete(id, this.CurrentUserId);
        //        return Ok();
        //    }
        //    catch (BusinessException ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        _log.Error(ex);
        //        return BadRequest(this.General_Err);
        //    }
        //}

        public IHttpActionResult Delete(string ids)
        {
            try
            {
                var idl = ids.Split(new char[1] { ',' }).Select(Guid.Parse).ToList();
                _uow.File.Delete(idl, this.CurrentUserId);
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
