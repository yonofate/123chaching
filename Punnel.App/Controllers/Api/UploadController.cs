using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.BLL;
using System.Web;
using Punnel.Core.Entities.ViewModel;
using log4net;

namespace Punnel.App.Controllers
{
    [Authorize]
    public class UploadController : BaseApiController
    {
        private static readonly ILog _log = LogManager.GetLogger("UploadController");
        public UploadController(IUow uow) : base(uow) { }
        [HttpPost]
        public async Task<FileResponseModel> File()
        {
            FileResponseModel res = new FileResponseModel();
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var type = int.Parse(httpRequest.Form["type"].ToString());
                var scoid = httpRequest.Form["coid"];
                Guid? coid = null;
                if (!string.IsNullOrEmpty(scoid)) coid = Guid.Parse(scoid.ToString());
                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);
                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 1000)
                    {
                        //await _uow.File.UploadImgToS3(postedFile.InputStream, postedFile.FileName, type, coid, CurrentUserId);
                        res = _uow.File.UploadImg(postedFile.InputStream, postedFile.FileName, type,coid, CurrentUserId);
                        res.message = "Upload thành công";
                        res.code = 200;
                        return res;
                    };
                }
                res.code = 0;
                res.message = "File upload không hợp lệ";
            }
            catch (BusinessException ex)
            {
                res.message = ex.Message;
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Maximum request length"))
                    res.message = "File ảnh của bản dung lượng vượt quá 5mb";
                else res.message = Core.Entities.Resources.Messages.System_Err;
                _log.Error(ex);
            }
            return res;
        }


        [HttpPut]
        public async Task<IHttpActionResult> FileUrl(FileUrlUploadModel data)
        {
            try
            {
                var res = _uow.File.UploadImgFromUrl(data.Url, data.Coid, CurrentUserId);
                return Ok(res);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(Core.Entities.Resources.Messages.System_Err);
            }
        }
        public class FileRequest
        {
            public HttpPostedFile file { get; set; }
            public int type { get; set; }
            public string coid { get; set; }
        }
    }
}

