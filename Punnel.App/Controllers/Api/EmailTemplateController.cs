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
    public class EmailTemplateController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("EmailTemplateController");
        public EmailTemplateController(IUow uow) : base(uow) { }

        [CompressContent]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var objs = await _uow.EmailTemplate.GetByUser(this.CurrentUserId);
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

        public async Task<IHttpActionResult> Get(Guid pageId)
        {
            try
            {
                var objs = await _uow.EmailTemplate.GetNotUseOnPage(pageId, this.CurrentUserId);
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

        public async Task<IHttpActionResult> Get(int id)
        {
            try
            {
                var obj = await _uow.EmailTemplate.GetAsync(id);
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

        public IHttpActionResult Post(Core.Entities.Model.EmailTemplate model)
        {
            try
            {
                model.UserId = this.CurrentUserId;
                _uow.EmailTemplate.IU(model);
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

        public IHttpActionResult Delete(int id)
        {
            try
            {
                _uow.EmailTemplate.Delete(id,this.CurrentUserId);
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
