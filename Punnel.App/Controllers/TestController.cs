using Punnel.Core.BLL.Repositories;
using Punnel.Core.Utils;
using Punnel.EmailServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Punnel.App.Controllers
{
    [System.Web.Http.Authorize]
    [RoutePrefix("api/test")]
    public class TestController : BaseApiController
    {
        public TestController(IUow uow) : base(uow) { }
        // GET: Test
        [Route("change-source-base64")]
        public async Task<IHttpActionResult> ChangeBase64(int type)
        {
            if (type == 1)
            {
                var res = await _uow.LandingPage.SearchAsync(new Core.Entities.RequestModel.LandingPageRequestModel()
                {
                    Limit = 1000,
                    Page = 0
                });
                foreach (var item in res.Item1)
                {
                    var l = await _uow.LandingPage.FrontEnd_GetLandingPage(item.Id, "p");
                    await _uow.LandingPage.IU(new Core.Entities.Model.LandingPage()
                    {
                        Id = l.Id,
                        UserId = l.UserId,
                        Source = Core.BLL.Utils.CommonUtils.Base64Decode(l.Source),
                    }, "source");
                }
                return Ok();
            }
            else if(type==2)
            {
                var res = await _uow.Template.SearchAsync(new Core.Entities.RequestModel.TemplateRequestModel()
                { 
                    Limit = 1000,
                    Page = 0
                });
                foreach (var item in res.Item1)
                {
                    var l = await _uow.LandingPage.FrontEnd_GetLandingPage(item.Id, "t");
                    if (!string.IsNullOrEmpty(l.Source))
                    {
                        await _uow.Template.IU(new Core.Entities.Model.Template()
                        {
                            Id = l.Id,
                            UserId = l.UserId,
                            Source = Core.BLL.Utils.CommonUtils.Base64Decode(l.Source),
                        }, "Source");
                    }
                }
                return Ok();
            }
            return BadRequest("type not valid");
        }

        [Route("auto-reply")]
        [AllowAnonymous]
        public IHttpActionResult SendMailAutoReply()
        {
            try
            {
                new Core.BLL.Utils.EmailUtils(new Core.Entities.Integration.Gmail.EmailToModel()
                {
                    Email = "z@gmail.com",
                    FullName = "Huy Nguyen",
                    AvatarUrl = "/7a5d2d39-0d39-452c-9e6b-d7bc6010341e/img_28002ca6.jpg"
                }).SendWelcome();

                //var list = _uow.Lead.GetLeadsToSendAutoEmail();
                // if (list.Count > 0)
                // {
                //     _uow.Lead.SendAutoReplyEmail(list.FirstOrDefault());
                // }
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}