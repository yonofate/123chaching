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
using Punnel.Core.Entities.RequestModel;
using System.Threading.Tasks;
using log4net;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class AffilateController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("AffilateController");
        public AffilateController(IUow uow) : base(uow) { }

        [CompressContent]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
               var res= _uow.AffilateMonthlySummary.Get(this.GetUserId());
                var res1 = await _uow.AffilateAction.GetByOwner(this.GetUserId(), "NEW");
                var res2 = await _uow.AffilateMonthlySummary.GetSummary(this.GetUserId());
                //await Task.WhenAll(res1, res2);
                return Ok(new { monthlyIncome = res, members= res1, summary= res2 });
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
        public IHttpActionResult Post(AffilateSubcribleModel data)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var userId = this.GetUserId();
                _uow.UserProfile.UpdateAffilateAgent(new Core.Entities.Model.UserProfile()
                {
                    Id= userId,
                    BankAccount= data.BankAccount,
                    BankCode= data.BankCode,
                    ReferralCode = DateTime.Now.GetHashCode().ToString("x").ToUpper(),
                    IsAffilateAgent = true,
                    AffilateAgentDate = DateTime.Now
                });

                _uow.AffilateMonthlySummary.IU(new Core.Entities.Model.AffilateMonthlySummary()
                {
                    UserId= userId,
                    MonthId= int.Parse(DateTime.Today.ToString("yyyyMM")),
                    SubcriblePercent= (int)CommissionPercent.Level1,
                    RenewalPercent = ((int)CommissionPercent.Level1)/2,
                    Level = (int)AffilateAgentLevel.Level1
                });

                return Ok(true);
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
