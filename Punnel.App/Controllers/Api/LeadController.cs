using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.RequestModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Punnel.Core.Entities.ViewModel;
using System.Threading.Tasks;
using Punnel.Core.BLL;
using log4net;

namespace Punnel.App.Controllers
{
    public class LeadController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("LeadController");
        public LeadController(IUow uow) : base(uow) { }

        [CompressContent]
        public async Task<IHttpActionResult> Get(string keyword, int limit, int page, int? status =null,int? contact=null, string region=null,bool? ismobile=null,int? tagid=null, Guid? landingpageid = null, DateTime? fromDate=null, DateTime? toDate=null)
        {
            try
            {
                var objs = await _uow.Lead.SearchAsync(new LeadSearchRequest()
                {
                    Keyword= keyword,
                    Limit = limit,
                    Page=page,
                    Status=status,
                    Contact=contact,
                    Region= region,
                    IsMobile= ismobile,
                    TagId= tagid,
                    LandingPageId = landingpageid,
                    FromDate= fromDate,
                    ToDate= toDate,
                    UserId= CurrentUserId
                });
                return Ok(new { Data = objs.Item1, Total = objs.Item2 });
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
        public async Task<IHttpActionResult> Get(int lid)
        {
            try
            {
                var obj = await _uow.Lead.GetById(lid, this.CurrentUserId);
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

        public async Task<IHttpActionResult> Post(Core.Entities.Model.Lead data)
        {
            try
            {
                data.UserId = this.CurrentUserId;
                await _uow.Lead.IU(data);
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
                _uow.Lead.Delete(id, this.CurrentUserId);
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

        public IHttpActionResult Delete(string ids)
        {
            try
            {
                var list_id = ids.Split(new char[1] { ',' }).ToList();
                _uow.Lead.DeleteList(list_id, this.CurrentUserId);
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
