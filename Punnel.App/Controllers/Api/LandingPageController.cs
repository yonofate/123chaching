using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.ViewModel;
using Punnel.Core.Entities.RequestModel;
using System.Threading.Tasks;
using Punnel.Core.BLL;
using log4net;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class LandingPageController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("LandingPageController"); 
        public LandingPageController(IUow uow) : base(uow) { }

        [CompressContent]
        public async Task<IHttpActionResult> Get(Guid id, string type="p", long? time=null)
        {
           
            try
            {
                if (time.HasValue)
                {
                    var obj = await _uow.HistoryPage.GetById(time.Value, id);
                    if (obj == null)
                    {
                        return NotFound();
                    }
                    return Ok(new LandingPageItemModel()
                    {
                        Id= obj.LandingPageId,
                        Source= obj.Source
                    });
                }
                else
                {
                    var landingPage = await _uow.LandingPage.FrontEnd_GetLandingPage(id, type);
                    if (landingPage != null)
                    {
                        if (!this.isEditor() && landingPage.UserId != CurrentUserId)
                        {
                            return NotFound();
                        }
                        return Ok(landingPage);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
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

        [CompressContent]
        public async Task<IHttpActionResult> Get(int limit, int page, int type, int? is_publish = null, string keyword = "")
        {
            try
            {
                var result = await _uow.LandingPage.SearchAsync(new Core.Entities.RequestModel.LandingPageRequestModel()
                {
                    UserId = CurrentUserId,
                    Limit = limit,
                    Page = page,
                    Type = type,
                    Publish = is_publish,
                    Keyword = keyword
                });

                return Ok(new { data= result.Item1 , total = result.Item2 });
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
        public async Task<IHttpActionResult> Post([FromBody]LandingPageNewModel value)
        {
            try
            {
                var id = Guid.NewGuid();
                var code = Core.Utils.StringUtils.GenerateCode();
                string source = "";
                Core.Entities.Model.LandingPage page = new Core.Entities.Model.LandingPage()
                {
                    Id = id,
                    Code = code,
                    UserId = CurrentUserId,
                    CollectionId = value.CollectionId,
                    TemplateId = value.TemplateId,
                    Type = value.Type,
                    Name = value.Name,
                    Source = source
                };

                if (value.TemplateId.HasValue)
                {
                    var tpl = await _uow.Template.GetAsync(value.TemplateId.Value);
                    if (tpl != null)
                    {
                        page.Source = tpl.Source;
                        page.Type = tpl.Type;
                    }
                }
                else if (!string.IsNullOrEmpty(value.Code))
                {
                    var tpl = _uow.LandingPage.GetByCode(value.Code);
                    if (tpl != null)
                    {
                        page.Source = tpl.Source;
                        page.Type = tpl.Type;
                    }
                    //res.data = new { id = id, code = code, name = value.Name, is_publish= 0, createdAt = DateTime.Now.ToString("dd/MM/yyy HH:mm") };
                    
                }

                await _uow.LandingPage.IU(page, "");
                return Ok(new LandingPageSearchResult()
                {
                    Id = page.Id,                    
                    Name = page.Name,
                    Domain = page.Domain,
                    Publish = page.Publish,
                    Code = page.Code,
                    CollectionId = page.CollectionId,
                    CreatedDate = page.CreatedDate,
                    Https = page.Https,
                    PublishDate = page.PublishDate,
                    Type = page.Type
                });
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

        public async Task<IHttpActionResult> Put([FromBody]LandingPageEditRequestModel value)
        {
            try
            {
                if (value.opt == "unpublish")
                {
                    await _uow.LandingPage.UnPublish(value.Id, this.CurrentUserId);
                    return Ok();
                }
                else if (value.opt == "fbchat")
                {
                    var landingPage = await _uow.LandingPage.GetAsync(value.Id);
                    landingPage.UserId = this.CurrentUserId;
                    var page = _uow.FBPage.Get(value.FBPageId);
                    var obj = JsonConvert.DeserializeObject<Core.Entities.ViewModel.LPSourceModel>(landingPage.Source);
                    obj.body = "<div id='fb-root'></div> <script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js#xfbml=1&version=v5.0&autoLogAppEvents=1'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));</script>";

                    string param = $"<div class='fb-customerchat' attribution='setup_tool' page_id='{page.Id}' theme_color='{page.ThemeColor}' logged_in_greeting='{page.GreetingIn}' logged_out_greeting='{page.GreetingOut}'> </div>";
                    obj.body += param;

                    landingPage.Source = JsonConvert.SerializeObject(obj);
                    await _uow.LandingPage.IU(landingPage, value.opt);
                    return Ok();
                }
                else if (value.opt == "template")
                {
                    await _uow.Template.IU(new Core.Entities.Model.Template()
                    {
                        Id = value.Id,
                        UserId = this.isEditor() ? Conts.Cpanel_user : CurrentUserId,
                        Name = value.Name,
                        Source = value.Source,
                        Thumbnail = value.Thumbnail,
                        Status = (int)TemplateStatus.Submited
                    }, "Source");
                    return Ok(new { id = value.Id, Name = value.Name });
                }
                else
                {
                    var newLdp = new Core.Entities.Model.LandingPage()
                    {
                        Id = value.Id,
                        UserId = this.isEditor() ? Conts.Cpanel_user : CurrentUserId,
                        Name = value.Name,
                        Source = value.Source,
                        Thumnail = value.Thumbnail,
                        CollectionId = value.CollectionId,
                        Publish = value.Publish,
                        Position= value.Position
                    };
                    if (string.IsNullOrEmpty(value.Source) == false)
                    {
                        var obj = JsonConvert.DeserializeObject<Core.Entities.ViewModel.LPSourceModel>(value.Source);
                        if (obj.apiElement.Count > 0)
                        {
                            var frm = obj.apiElement.Where(x => x.lang == "ITEM_FORM").ToList();
                            if (frm.Count() > 0)
                            {
                                newLdp.HasEmailFrm = frm.Any(x => x.type_form == "email");
                                newLdp.HasPhoneFrm = frm.Any(x => x.type_form == "phone");
                            }
                        }
                    }
                    await _uow.LandingPage.IU(newLdp, value.opt);
                    return Ok(new { id = value.Id, Name = value.Name });
                }
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

        // DELETE: api/Collection/5
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                _uow.LandingPage.Delete(id, this.CurrentUserId);
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
