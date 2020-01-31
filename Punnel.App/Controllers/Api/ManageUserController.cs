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
    [Authorize(Roles ="admin,editor")]
    [RoutePrefix("api/member")]
    public class ManageUserController : BaseApiController
    {
        internal AuthRepository _repoUser = null;
        private static readonly ILog _log = LogManager.GetLogger("ManageUserController");
        public ManageUserController(IUow uow) : base(uow) { _repoUser = new AuthRepository(); }

        [CompressContent]
        [Route("list")]
        [HttpPost]
        public async Task<IHttpActionResult> List(Core.Entities.RequestModel.UserProfileQuery model)
        {
            try
            {
                if(User.IsInRole("editor") && !User.IsInRole("admin"))
                {
                    model.StaffId = this.CurrentUserId;
                }
                var res = await _uow.UserProfile.UserProfile_Search(model);
                return Ok(new { data= res.Item1, total = res.Item2 });
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

        [Route("update")]
        [HttpPost]
        public async Task<IHttpActionResult> Update(UserProfileListViewModel model)
        {
            try
            {
                var p = _uow.UserProfile.Get(model.Id);
                if (p == null)
                {
                    throw new BusinessException("Không tìm thấy thông tin thành viên này");
                }
                bool isChangeRole = (p.Role != model.Role);
                p.Id = model.Id;
                p.FullName = model.FullName;
                p.Email = model.Email;
                p.Mobile = model.Mobile;
                p.Level = model.Level;
                p.Role = model.Role;
                p.ExpiredDate = model.ExpiredDate;
                p.IsVerifyEmail = model.IsVerifyEmail;
                p.IsVerifyMobile = model.IsVerifyMobile;
                //p.IsOffAlert = model.IsOffAlert;
                await _uow.UserProfile.UpdateProfile(p);
                if (isChangeRole)
                {
                   await  _uow.UserProfile.ChangeRole(p.Id, model.Role);
                }
                await _repoUser.UpdateClaimAsync(model.Id, new System.Security.Claims.Claim("Level", model.Level.ToString()));
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

        [Route("update-status")]
        [HttpPost]
        public async Task<IHttpActionResult> UpdateStatus(UserProfileSystemNoteViewModel model)
        {
            try
            {
                var p = _uow.UserProfile.Get(model.Id);
                if (p == null)
                {
                    throw new BusinessException("Không tìm thấy thông tin thành viên này");
                }
                p.Id = model.Id;
                p.SystemNote = model.SystemNote;
                p.SystemStatus = model.SystemStatus;

                await _uow.UserProfile.UpdateSystemNote(p);
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

        [Route("staff-support")]
        [HttpGet]
        public async Task<IHttpActionResult> StaffSupport(string id)
        {
            try
            {
                var staff = await _uow.StaffSupport.GetStaffByCustomer(id);
                return Ok(staff);
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


        [Route("staff-support")]
        [HttpPost]
        public async Task<IHttpActionResult> UpdateStaffSupport(StaffSupportRequest model)
        {
            try
            {
                _uow.StaffSupport.UpdateStaffSupport(model);
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

        [Route("pages")]
        [CompressContent]
        public async Task<IHttpActionResult> Get(string userid)
        {
            try
            {
                var result = await _uow.LandingPage.Admin_LandingPageByUser(userid);
                return Ok(new {list=result.Item1, total = result.Item2 });
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
