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
using Punnel.Core.Entities.Model;

namespace Punnel.App.Controllers.Api
{
    [Authorize]
    public class AutomationController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("AutomationController");
        public AutomationController(IUow uow) : base(uow) { }

        [CompressContent]
        public async Task<IHttpActionResult> Get(Guid pageId)
        {
            try
            {
                var objs = await _uow.Automation.GetByPage(pageId);
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

        public IHttpActionResult Post(Automation model)
        {
            try
            {
                model.Id = Guid.NewGuid();
                model.UserId = this.CurrentUserId;
                _uow.Automation.IU(model);
                return Ok(model.Id);
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

        public IHttpActionResult Put(Automation model)
        {
            try
            {
                _uow.Automation.IU(model); 
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

        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                _uow.Automation.Delete(id, this.CurrentUserId);
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