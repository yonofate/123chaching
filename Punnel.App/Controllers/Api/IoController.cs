using Punnel.Core.BLL;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Utils;
using Punnel.Core.Entities;
using Punnel.Core.Entities.RequestModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Punnel.App.Controllers
{
    // [Authorize]
    public class IoController : BaseApiController
    {
        public IoController(IUow uow) : base(uow) { }

        [CompressContent]
        public IHttpActionResult Get(Guid id, string token)
        {
            string fileName = _uow.LandingPage.GetExportFileName(id);
            var dataBytes = _uow.LandingPage.Export(id);
            var dataStream = new System.IO.MemoryStream(dataBytes);
            return new exportFileResult(dataStream, Request, fileName);
        }

        [Authorize]
        [HttpPost]
        public async System.Threading.Tasks.Task<IHttpActionResult> Import()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            try
            {
                var files = await Request.Content.ReadAsMultipartAsync();
                foreach (var stream in files.Contents)
                {
                    var fileBytes = await stream.ReadAsByteArrayAsync();
                    if (fileBytes.Length > 0)
                    {
                        _uow.LandingPage.Import(fileBytes,CurrentUserId);
                    }
                }
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

    internal class exportFileResult : IHttpActionResult
    {
        System.IO.MemoryStream bookStuff;
        string PdfFileName;
        HttpRequestMessage httpRequestMessage;
        HttpResponseMessage httpResponseMessage;
        public exportFileResult(System.IO.MemoryStream data, HttpRequestMessage request, string filename)
        {
            bookStuff = data;
            httpRequestMessage = request;
            PdfFileName = filename;
        }
        public System.Threading.Tasks.Task<HttpResponseMessage> ExecuteAsync(System.Threading.CancellationToken cancellationToken)
        {
            httpResponseMessage = httpRequestMessage.CreateResponse(HttpStatusCode.OK);
            httpResponseMessage.Content = new StreamContent(bookStuff);
            //httpResponseMessage.Content = new ByteArrayContent(bookStuff.ToArray());  
            httpResponseMessage.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            httpResponseMessage.Content.Headers.ContentDisposition.FileName = PdfFileName;
            httpResponseMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");

            return System.Threading.Tasks.Task.FromResult(httpResponseMessage);
        }
    }
}

   
