using log4net;
using Punnel.Api.Infrastructure;
using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Punnel.Core.BLL.Utils;
using System.Web;
using System.ServiceModel.Channels;

namespace Punnel.Api.Controllers
{
    public class ValidateController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("ValidateController");
        public ValidateController(Uow uow) : base(uow) { }

        [CompressContent]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            try
            {
                var r = await _uow.UserProfile.IsDomainPageExpriredAsync(id);
                //return Ok(r ? 0 : 1);
                bool show = r.Item1 ==true? true : false;
                string referralCode = r.Item2 == null ? "" : r.Item2;
                return Ok(new { show = show, referralCode = referralCode });
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
