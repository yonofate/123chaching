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
using Punnel.Core.Entities.Model;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class TicketController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("TicketController");
        public TicketController(IUow uow) : base(uow) { }
        // GET: api/Ticket

        [CompressContent]
        public async Task<IHttpActionResult> Get(string keyword, int limit, int page, int? status = null)
        {
            try
            {
                var res = await _uow.Ticket.Search(new TicketSearchRequest()
                {
                    Keyword= keyword,
                    Limit= limit,
                    Page = page,
                    Status = status,
                    //UserId = this.CurrentUserId
                });                
                return Ok(new {data= res.Item1, total = res.Item2 });
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

        // POST: api/Ticket
        public IHttpActionResult Post([FromBody]Ticket data)
        {
            try
            {
                data.UserId = this.CurrentUserId;
                _uow.Ticket.IU(data);
                return Ok(data);                
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

        // PUT: api/Ticket/5
        public IHttpActionResult Put([FromBody]Ticket data)
        {
            try
            {
                //data.UserId = this.CurrentUserId;
                _uow.Ticket.IU(data);
                return Ok(data);
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

        // DELETE: api/Ticket/5
        public IHttpActionResult Delete(int id)
        {
            try
            {
                _uow.Ticket.Delete(id,this.CurrentUserId);
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
