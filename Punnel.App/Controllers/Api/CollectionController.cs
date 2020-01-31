using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.ViewModel;
using Punnel.Core.Entities.RequestModel;
using System.Threading.Tasks;
using Punnel.Core.BLL;
using log4net;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class CollectionController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("CollectionController");
        public CollectionController(IUow uow) : base(uow) { }
        // GET: api/Collection

        [CompressContent]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var cols = await _uow.Collection.FrontEnd_GetCollection(CurrentUserId);                
                return Ok(cols);
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

        /// <summary>
        /// Lấy danh sách nhom bởi loại
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        [CompressContent]
        public virtual async Task<IHttpActionResult> Get(int tid)
        {
            try
            {
                var cols = await _uow.Collection.GetByType(tid,CurrentUserId);
                return Ok(cols);
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


        // POST: api/Collection
        public IHttpActionResult Post([FromBody]CollectionRequestModel value)
        {
            try
            {
                var id = Guid.NewGuid();
                var col = new Core.Entities.Model.Collection()
                {
                    Id = id,
                    UserId = CurrentUserId,
                    Type = value.Type,
                    Name = value.Name
                };
                _uow.Collection.IU(col);
                return Ok(col);                
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

        // PUT: api/Collection/5
        public IHttpActionResult Put([FromBody]CollectionEditRequestModel value)
        {
            try
            {
                var col = new Core.Entities.Model.Collection()
                {
                    Id = value.Id,
                    UserId = CurrentUserId,
                    Name = value.Name
                };
                _uow.Collection.IU(col);
                return Ok(col);
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

        // DELETE: api/Collection/5
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                _uow.Collection.Delete(id,this.CurrentUserId);
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
