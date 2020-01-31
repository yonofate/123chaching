using log4net;
using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Punnel.App.Controllers.Api
{
    [Authorize]
    public class ThumbController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("ThumbController");
        public ThumbController(IUow uow) : base(uow) { }
        public async Task<IHttpActionResult> Post([FromBody]ThumbRequestModel value)
        {
            try
            {
                var url = _uow.File.UploadThumFromBase64(value.Code, CurrentUserId);
                if (value.Type == "t")
                {
                    url = Core.Utils.ConfigSettings.Get("ApiStatic", "https://hstatic.punnel.com") + "/img" + url;
                    await _uow.Template.IU(new Core.Entities.Model.Template()
                    {
                        UserId= this.isEditor() ? Conts.Cpanel_user : CurrentUserId,
                        Id = value.FileName,
                        Thumbnail = url,
                        IsUpThumbnail=false,
                    }, "Thumb");
                    //new Core.BLL.FileServices.FileTemplateBuilder(value.FileName.ToString(), "").Remove();
                }
                else
                {
                    await _uow.LandingPage.IU(new Core.Entities.Model.LandingPage()
                    {                      
                        Id = value.FileName,
                        UserId= CurrentUserId,
                        Thumnail = url
                    }, "thumb");
                }
                return Ok(url);
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