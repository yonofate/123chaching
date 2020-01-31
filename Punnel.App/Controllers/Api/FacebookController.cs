using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;

namespace Punnel.App.Controllers
{
    [RoutePrefix("api/facebook")]
    public class FacebookController : BaseApiController
    {
        public FacebookController(IUow uow) : base(uow) { }

        [Route("fbpages")]
        public IHttpActionResult GetPages()
        {
            try
            {
                var pages = _uow.FBPage.GetByUser(CurrentUserId);
                return Ok(pages);
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

        [Route("pages")]
        public IHttpActionResult GetPages(long id)
        {
            try
            {
                var pages = _uow.FBPage.GetByFbId(id);
                return Ok(pages);
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

        [Route("page")]
        [HttpPost]
        public IHttpActionResult AddPage(Core.Entities.Model.FBPage data)
        {
            try
            {
                data.ThemeColor = "#0084ff";
                data.UserId = CurrentUserId;
                _uow.FBPage.IU(data,"token");
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

        [Route("config")]
        [HttpPost]
        public IHttpActionResult UpdatePage(Core.Entities.Model.FBPage data)
        {
            try
            {
                data.UserId = CurrentUserId;
                _uow.FBPage.IU(data,"config");
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

        [Route("widget")]
        public async Task<IHttpActionResult> GetMessengerEmbedCode(Guid id, long? pid)
        {
            try
            {
                string res = "";
                await _uow.LandingPage.IU(new Core.Entities.Model.LandingPage()
                {
                    Id = id,
                    UserId= CurrentUserId,
                    FanPageId = pid
                }, "fbpage");
                if (pid != null)
                {
                    var page = _uow.FBPage.Get(pid);
                    res = "<div id='fb-root'></div> <script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js#xfbml=1&version=v5.0&autoLogAppEvents=1'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));</script>";
                    res += $"<div class='fb-customerchat' attribution='setup_tool' page_id='{page.Id}' theme_color='{page.ThemeColor}' logged_in_greeting='{page.GreetingIn}' logged_out_greeting='{page.GreetingOut}'> </div>";
                }
                return Ok(res);
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
