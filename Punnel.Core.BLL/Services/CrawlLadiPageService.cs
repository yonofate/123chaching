using Punnel.Core.BLL.Repositories;
using Punnel.Core.Utils;
using Punnel.Core.Entities;
using Punnel.CrawlData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Proxy
{
    public class CrawlLadiPageService
    {
        private static readonly string ApiStatic = ConfigSettings.Get("ApiStatic", "http://hstatic.punnel.com");

        LadiPageCrawl svc;
        private IUow _uow = null;
        private IUow uow
        {
            get { return _uow ?? (_uow = ObjectFactory.GetInstance<Uow>()); }
        }
        public CrawlLadiPageService()
        {
            svc = new LadiPageCrawl();
            svc.ApiGetResponse();
        }

        public void Execute()
        {
            //20: Section
            //10: Page
            //30: Popup
            //GetAllCate(10);
            //GetAllCate(20);
            //GetAllCate(30);
            //GetTemplates(10);
            //GetTemplates(20);
            GetTemplates(10);

        }

        void GetAllCate(int type)
        {
            var res= svc.GetTemplateCate(type);
            foreach(var item in res)
            {
                try
                {
                    uow.TemplateCategory.IU_FromSrc(new Entities.Model.TemplateCategory()
                    {
                        Id = Guid.NewGuid(),
                        Name = item.name,
                        Type = type,
                        ReferId = item.id
                    });
                }catch(Exception ex)
                {

                }
            }
        }

        async Task GetTemplates(int type)
        {
            try { 
            var cates = await uow.TemplateCategory.GetByType(type);
            foreach(var cate in cates)
            {
                var res = svc.GetTemplates(new TemplateCateRequest()
                {
                    cid= cate.ReferId,
                    is_publish=1,
                    limit=100,
                    page=1,
                    type=type
                });

                foreach(var item in res)
                {
                        try
                        {
                            var obj = svc.GetTemplate(item.id, type);
                            obj.TemplateCateId = cate.Id;
                            obj.Publish = true;
                            obj.UpdatedDate = DateTime.Now;
                            obj.UpdatedBy = "auto";
                            //if (!string.IsNullOrEmpty(item.thumbnail))
                            //{
                            //    var resImg = uow.FileService.UploadFileFromUrl(obj.Thumbnail, "template_thumb");
                            //    if(resImg.Data!=null) obj.Thumbnail = ApiStatic +"/img" + resImg.Data.path;
                            //}
                            
                            uow.Template.IU_FromSrc(obj);
                        }catch(Exception ex)
                        {

                        }
                }
            }
            }
            catch (Exception ex)
            {

            }
        }

    }
}
