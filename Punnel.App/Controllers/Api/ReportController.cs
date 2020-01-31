using log4net;
using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.Tracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Punnel.App.Controllers.Api
{
    [Authorize]
    [CompressContent]
    [RoutePrefix("api/report")]
    public class ReportController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("ReportController");
        public ReportController(IUow uow) : base(uow) { }

        [Route("affilate-action")]
        public async Task<IHttpActionResult> GetAffilateAction()
        {
            try
            {
                var res = await _uow.AffilateAction.GetAffilateChart_Action(this.CurrentUserId, "");
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("lead-daily")]
        public async Task<IHttpActionResult> GetLeadDaily()
        {
            try
            {
                var res = await _uow.Lead.GetChartSubcrible(this.CurrentUserId, "");
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("lead-summary")]
        public async Task<IHttpActionResult> GetLeadSummary()
        {
            try
            {
                var res = await _uow.Lead.GetChartSummary(this.CurrentUserId, "");
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("summary")]
        public async Task<IHttpActionResult> GetDashboardSummary()
        {
            try
            {
                var res = await _uow.Lead.GetDashboardSummary(this.CurrentUserId);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("publish-pages")]
        public async Task<IHttpActionResult> GetPublishPage()
        {
            try
            {
                var res = await _uow.PunnelTracking.GetPublishPage(this.CurrentUserId);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("page-summary")]
        [HttpPost]
        public async Task<IHttpActionResult> GetPageReportSummary(PageReportQuery query)
        {
            try
            {
                var res = await _uow.PunnelTracking.GetPageReportSummary(query);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("page-daily")]
        [HttpPost]
        public async Task<IHttpActionResult> GetPageReportDaily(PageReportQuery query)
        {
            try
            {
                var res = await _uow.PunnelTracking.GetPageReportDaily(query);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("page-region")]
        [HttpPost]
        public async Task<IHttpActionResult> GetPageReportRegion(PageReportQuery query)
        {
            try
            {
                var res = await _uow.PunnelTracking.GetPageReportRegion(query);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("page-referer")]
        [HttpPost]
        public async Task<IHttpActionResult> GetPageReportReferer(PageReportQuery query)
        {
            try
            {
                var res = await _uow.PunnelTracking.GetPageReportReferer(query);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("page-traffic-channel")]
        [HttpPost]
        public async Task<IHttpActionResult> GetPageReportTrafficChannel(PageReportQuery query)
        {
            try
            {
                var res = await _uow.PunnelTracking.GetPageReportChannel(query);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }
        
        [Route("lead-source")]
        [HttpGet]
        public async Task<IHttpActionResult> GetLeadTrafficSource(int id)
        {
            try
            {
                var res = await _uow.PunnelTracking.Lead_GetTrafficSource(id);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("lead-region")]
        [HttpGet]
        public async Task<IHttpActionResult> GetLeadRegion()
        {
            try
            {
                var res = await _uow.PunnelTracking.Lead_GetRegion(this.CurrentUserId);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("lead-history")]
        [HttpPost]
        public async Task<IHttpActionResult> GetLeadHistory(LeadHistoryQuery data)
        {
            try
            {
                var res = await _uow.Lead.GetHistoryByPhoneOrEmail(this.CurrentUserId,data.Email,data.Phone);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }

        }

        [Route("promotion-options")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPromotionOptions()
        {
            try
            {
                var res = await _uow.Promotion.Options();
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }

        }
    }
}