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
    public class DomainController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("DomainController");
        public DomainController(IUow uow) : base(uow) { }

        [CompressContent]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var objs = await _uow.Domain.GetByUser(this.CurrentUserId);
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

        public IHttpActionResult Post(DomainViewModel model)
        {
            try
            {
                _uow.Domain.AddDomain(new Core.Entities.Model.Domain()
                {
                    Id= model.Id,
                    UserId= this.CurrentUserId
                });
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

        public IHttpActionResult Put(DomainViewModel model)
        {
            try
            {
                _uow.Domain.Verify(model.Id, this.CurrentUserId);
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

        public IHttpActionResult Delete(string id)
        {
            try
            {
                _uow.Domain.Delete(id, this.CurrentUserId);
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
