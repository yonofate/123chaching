using Punnel.Core.BLL.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Punnel.Core.Entities.ViewModel;
using Punnel.Core.Entities;
using System.Threading.Tasks;
using Punnel.Core.BLL;

namespace Punnel.Api.Controllers
{
    [Authorize]
    public class UserController : BaseApiController
    {
        public UserController(IUow uow) : base(uow) { }

        [CompressContent]
        public IHttpActionResult Get()
        {
            try
            {
                var profile = _uow.UserProfile.Get(CurrentUserId);
                if(profile==null) return Ok();
                profile.Count = _uow.LandingPage.TotalPage(CurrentUserId);
                return Ok(profile);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                return BadRequest(this.General_Err);
            }
        }

        public IHttpActionResult Post([FromBody] string value)
        {
            return Ok();
        }

        public async Task<IHttpActionResult> Put([FromBody]Core.Entities.Model.UserProfile model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                model.Id= GetUserId();
                await _uow.UserProfile.IU(model);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(this.General_Err);
            }
        }

    }
}
