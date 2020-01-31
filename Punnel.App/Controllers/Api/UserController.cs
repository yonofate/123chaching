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
using log4net;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class UserController : BaseApiController
    {
        internal AuthRepository _repoUser = null;
        private static readonly ILog _log = LogManager.GetLogger("UserController");
        public UserController(IUow uow) : base(uow) {
            _repoUser = new AuthRepository();
        }

        [CompressContent]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var profile = _uow.UserProfile.Get(CurrentUserId);
                if(profile==null) return Ok("");
                await _repoUser.UpdateClaimAsync(profile.Id, new System.Security.Claims.Claim("Level", profile.Level.ToString()));
                profile.Count = _uow.LandingPage.TotalPage(CurrentUserId);
                return Ok(profile);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [Authorize(Roles ="admin")]
        public async Task<IHttpActionResult> Delete(string username)
        {
            try { 
            var res= await _uow.UserProfile.Delete_User_Permement(username, "admin");
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

        [Authorize]
        public async Task<IHttpActionResult> Put([FromBody]Core.Entities.Model.UserProfile model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                model.Id= GetUserId();
                //if (model.Level > 0)
                //{
                //    await _repoUser.UpdateClaimAsync(model.Id, new System.Security.Claims.Claim("Level", model.Level.ToString()));
                //}
                _uow.UserProfile.ValidateUserBeforeUI(model.Mobile, model.Email, model.Id);
                var user = await _repoUser.FindByNameAsync(model.Email);
                if (user != null)
                {
                    await _uow.UserProfile.IU(model);
                    await _repoUser.SetPhoneNumberAsync(model.Id, model.Mobile);
                }
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
