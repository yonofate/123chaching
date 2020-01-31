using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using System;
using System.Web.Http;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.BLL;
using System.Threading.Tasks;
using log4net;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class TemplateController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("TemplateController");
        public TemplateController(IUow uow) : base(uow) { }
        // GET: api/Template
        [CompressContent]
        public async Task<IHttpActionResult> Get(int limit, int type, int? gid=null,bool?is_store=null, bool? is_section = null, bool? is_popup = null, int? status=null, int? page=0, Guid? cid=null, bool? me=false, bool? is_free=false, bool? is_community= false)
        {
            try
            {
                if (!me.HasValue) me = false;
                var objs = await _uow.Template.SearchAsync(new TemplateRequestModel()
                {
                    TemplateCateId = cid,
                    GroupId= gid,
                    Type = type,
                    Limit = limit,
                    Page= page.HasValue?page.Value:0,
                    Status = status,
                    IsStore= is_store,
                    IsComunity= is_community,
                    IsFree= is_free,
                    UserId = me.Value? CurrentUserId : null
                });
                return Ok(new { data = objs.Item1, total = objs.Item2 });
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
        public async Task<IHttpActionResult> Get(Guid id)
        {
            try
            {
                var template = await _uow.Template.FrontEnd_GetById(id);
                return Ok(template);
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

        public async Task<IHttpActionResult> Post([FromBody]TemplateRequestFromPageModel value)
        {
            try
            {
                if(isEditor()==false)
                {
                    var isOver = _uow.Template.IsOverQuota(this.CurrentUserId);
                    if(isOver) return BadRequest("Tài khoản Nâng cấp tài khoản để tạo thêm mẫu mới");
                }
                value.Code = DateTime.Now.GetHashCode().ToString("x");
                if (value.PageId != null)
                {
                    value.Thumbnail = MBN.Utils.WebUtils.AppSettings("ApiStatic", "https://hstatic.punnel.com") + "/img" + value.Thumbnail;
                    var res = await _uow.Template.AddFromPageAsync(value);
                    if (res > 0) return Ok();
                    else return BadRequest(this.General_Err);
                }
                else {
                    if (value.FromTemplateId.HasValue)
                    {
                        var fromTpl = _uow.Template.Get(value.FromTemplateId.Value);
                        value.Source = fromTpl.Source;
                    }

                    Guid id = Guid.NewGuid();
                   await _uow.Template.IU(new Core.Entities.Model.Template()
                    {
                        Id= id,
                        Name = value.Name,
                        TemplateCateId = value.TemplateCateId,
                        Groupid= value.Groupid,
                        Source= value.Source,
                        Code = value.Code,
                        UserId = this.CurrentUserId,
                        Thumbnail= value.Thumbnail,
                        Type = value.Type
                    }, "");
                    return Ok(id);
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
        
        public async Task<IHttpActionResult> Put([FromBody]TemplateEditRequestModel value)
        {
            try
            {
                bool isUpThumbnail = false;
                if (value.Opt == "Thumb") isUpThumbnail = true;
                await _uow.Template.IU(new Core.Entities.Model.Template()
                {
                    Id = value.Id,
                    UserId = this.isEditor()?Conts.Cpanel_user: CurrentUserId,
                    Name = value.Name,
                    Source = value.Source,
                    Thumbnail = value.Thumbnail,
                    IsUpThumbnail= isUpThumbnail,
                    Status = value.Status,
                    RejectMsg= value.Note,
                    Groupid=value.Gid,
                    TemplateCateId= value.TemplateCateId,
                    Price= value.Price,
                    IsStore= value.IsStore
                }, value.Opt);
                return Ok(new { id = value.Id, Name = value.Name });
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
                var item = _uow.Template.Get(id);
                if(item == null)
                {
                    return NotFound();
                }
                if (Can_UI(item.UserId) == false)
                {
                    return BadRequest(this.CanNotDelete_Err);
                }
                _uow.Template.Delete(id);
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
