using log4net;
using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.BLL.Utils;
using Punnel.Core.Entities;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.Tracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Punnel.Api.Controllers.Api
{
    [Authorize]
    [RoutePrefix("api/report")]
    [CompressContent]
    public class ReportController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("ReportController");
        public ReportController(IUow uow) : base(uow) { }

        [Route("affilate-action")]
        public async Task<IHttpActionResult> GetAffilateAction()
        {
            try
            {
                var res = await _uow.AffilateAction.GetAffilateChart_Action(this.CurrentUserId,"");
                return Ok(res);
            }
            catch (Exception ex)
            {
                return Ok(false);
            }
        }

        [Route("affilate-summary")]
        public async Task<IHttpActionResult> GetAffilateSummary()
        {
            try
            {
                var res = await _uow.AffilateMonthlySummary.GetSummaryForMobile(this.CurrentUserId, int.Parse(DateTime.Now.ToString("yyyyMM")));
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("page-view")]
        [HttpPost]
        public async Task<IHttpActionResult> GetPageReportSummary(PageReportQuery query)
        {
            try
            {
                if (query.Range == "today")
                {
                    query.FromDate = DateTime.Today;
                    query.ToDate = DateTime.Today;
                }else if(query.Range == "yesterday")
                {
                    query.FromDate = DateTime.Today.AddDays(-1);
                    query.ToDate = DateTime.Today.AddDays(-1);
                }
                else if (query.Range == "thisweek")
                {
                    var range = DateTimeUtils.ThisWeek(DateTime.Today);
                    query.FromDate = range.Start;
                    query.ToDate = range.End;
                }
                else if (query.Range == "thismonth")
                {
                    var range = DateTimeUtils.ThisMonth(DateTime.Today);
                    query.FromDate = range.Start;
                    query.ToDate = range.End;
                }
                else
                {
                    query.FromDate = DateTime.Today;
                    query.ToDate = DateTime.Today;
                }
                //get all mobile + desktop
                query.IsMobile = null;
                query.UserId = this.CurrentUserId;
                var res = await _uow.PunnelTracking.GetPageReportSummary(query);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }

        [Route("publish-page")]
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

        [Route("page-region")]
        [HttpPost]
        public async Task<IHttpActionResult> GetPageReportRegion(PageReportQuery query)
        {
            try
            {
                if (query.Range == "today")
                {
                    query.FromDate = DateTime.Today;
                    query.ToDate = DateTime.Today;
                }
                else if (query.Range == "yesterday")
                {
                    query.FromDate = DateTime.Today.AddDays(-1);
                    query.ToDate = DateTime.Today.AddDays(-1);
                }
                else if (query.Range == "thisweek")
                {
                    var range = DateTimeUtils.ThisWeek(DateTime.Today);
                    query.FromDate = range.Start;
                    query.ToDate = range.End;
                }
                else if (query.Range == "thismonth")
                {
                    var range = DateTimeUtils.ThisMonth(DateTime.Today);
                    query.FromDate = range.Start;
                    query.ToDate = range.End;
                }
                else
                {
                    query.FromDate = DateTime.Today;
                    query.ToDate = DateTime.Today;
                }
                query.IsMobile = null;
                var res = await _uow.PunnelTracking.GetPageReportRegion(query);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }


        [Route("lead-chart")]
        [HttpGet]
        public async Task<IHttpActionResult> GetLeadChart()
        {
            try
            {               
                var res = await _uow.PunnelTracking.GetLeadChart(this.CurrentUserId);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }


        [Route("affiliate-summary")]
        [HttpGet]
        public async Task<IHttpActionResult> AffiliateSummary()
        {
            try
            {
                var res = await _uow.PunnelTracking.GetAffiliateSummary(this.CurrentUserId);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return Ok(false);
            }
        }
    }
}