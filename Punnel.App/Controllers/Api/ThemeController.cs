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
using Punnel.Core.BLL;
using log4net;

namespace Punnel.App.Controllers
{
    public class ThemeController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("ThemeController");
        public ThemeController(IUow uow) : base(uow) { }

        /// <summary>
        /// Tạo trang html
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>

        [Authorize]
        public IHttpActionResult Post([FromBody]ThemeHtmlRequestModel value)
        {
            try { 
                var res= new Core.BLL.FileServices.FileTemplateBuilder(value.Id.ToString(), value.Html).Create();
                return Ok(res);
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
