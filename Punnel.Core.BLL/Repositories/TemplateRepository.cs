using Punnel.Core.Entities;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using Punnel.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class TemplateRepository : BaseRepository<Template>, ITemplateRepository
    {
        private static readonly string ApiStatic = ConfigSettings.Get("ApiStatic", "http://hstatic.punnel.com");
        public TemplateRepository(IUow uow) : base(uow) { }
        public async Task IU(Template obj, string type)
        {
            var m = _dbSet.FirstOrDefault(x=>x.Id== obj.Id);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {
                if (IsOwnerOrAdmin(m.UserId, obj.UserId) == false) return;
                if (type == "Name") m.Name = obj.Name;
                else if (type == "Cate")
                {
                    m.Name = obj.Name;
                    m.TemplateCateId = obj.TemplateCateId;
                    m.Groupid = obj.Groupid;
                    m.Price = obj.Price;
                    m.IsStore = obj.IsStore;
                    if (obj.IsStore==true && (m.Status == (int)TemplateStatus.New || m.Status == (int)TemplateStatus.Cancelled)) m.Status = (int)TemplateStatus.Submited;
                }
                else if (type == "Source" || type == "Config")
                {
                    if (obj.IsStore == true && m.Status == (int)TemplateStatus.Approved) m.Status = (int)TemplateStatus.Submited;
                    if (!string.IsNullOrEmpty(obj.Source)) m.Source = obj.Source;
                }
                else if (type == "Thumb")
                {
                    m.Thumbnail = obj.Thumbnail;
                    if (m.IsUpThumbnail == false)
                    {
                        m.IsUpThumbnail = obj.IsUpThumbnail;
                    }
                }
                else if (type == "status")
                {
                    if (obj.Status == (int)TemplateStatus.Submited || obj.Status == (int)TemplateStatus.Approved) m.IsStore = true;
                    m.Status = obj.Status;
                    m.RejectMsg = obj.RejectMsg;
                }
            }
            await this.CommitAsync();
            //this.RemoveCache(obj.Id);
        }

        public async Task<TemplateViewModel> FrontEnd_GetById(Guid id)
        {
            return await (_dbContext as Model.PunnelContext).msp_FrontEnd_GetTemplate(id);
        }

        public async Task<TemplateViewModel> GetInfoById(Guid id)
        {
            return await (_dbContext as Model.PunnelContext).msp_Template_GetInfoById(id);
        }

        public virtual async Task<int> AddFromPageAsync(TemplateRequestFromPageModel req)
        {
            return await (_dbContext as Model.PunnelContext).msp_Template_AddFromPageAsync(req);
        }
        public async Task<Tuple<List<TemplateListViewModel>,int>> SearchAsync(TemplateRequestModel req)
        {
            return await (_dbContext as Model.PunnelContext).msp_Template_SearchAsync(req);
        }

        public void Delete(Guid id, string userId)
        {         
            var m = _dbSet.FirstOrDefault(x => x.Id == id);
            if (m != null)
            {
                if (IsOwnerOrAdmin(m.UserId, userId) == false) return;
                _dbSet.Remove(m);
                this.Commit();
            }
            //this.RemoveCache(id);
        }

        public bool IsUsedCate(Guid id)
        {
            return _dbSet.Any(x => x.TemplateCateId == id && x.Deleted==false);
        }

        public bool IsOverQuota(string userId)
        {
            var c = _dbSet.Count(x => x.UserId == userId);
            if (c > 20) return true;
            return false;
        }

        #region PULL Data
        public void IU_FromSrc(Template obj)
        {
            var m = _dbSet.FirstOrDefault(x => x.ReferId == obj.ReferId);
            if (m == null)
            {
                this.Add(obj);
                this.Commit();
            }
            else
            {
                m.Source = obj.Source;
                m.Thumbnail = obj.Thumbnail;
                this.Commit();
            }
        }

        public async Task<int> ReplaceTemplateSourceSource(string keyword, string replacement)
        {
            return await (_dbContext as Model.PunnelContext).msp_sys_ReplaceTemplateSource(keyword, replacement);
        }
        #endregion

        #region Update Image Template Source
        public List<string> ProcessImage(Template tmp)
        {
            var src = tmp.Source;

            List<string> images = new List<string>();
            if (string.IsNullOrEmpty(src)) return images;
            string pattern = @"(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)";

            Regex rgx = new Regex(pattern, RegexOptions.IgnoreCase);
            MatchCollection matches = rgx.Matches(src);

            for (int i = 0, l = matches.Count; i < l; i++)
            {
                if(images.Any(x=>x== matches[i].Value)==false) images.Add(matches[i].Value);
            }
            return images.Where(x => x.Contains("hstatic.punnel.com") == false).ToList();
        }

        public void ProcessTemplateImg()
        {
            var templates = this.GetAll().Where(x=>x.Type==30).ToList();
            foreach(var item in templates)
            {
                var imgs = ProcessImage(item);
                foreach(var img in imgs)
                {
                    try
                    {
                        uow.PunnelTracking.AddPageImgUrl(img, item.Id);
                    }catch(Exception ex) {
                    }
                }
            }
        }

        public void ChangeImage()
        {
            var imgs = uow.PunnelTracking.GetPageImg();
            foreach(var item in imgs)
            {
                if (string.IsNullOrEmpty(item.NewImgUrl))
                {
                    var resImg = uow.FileService.UploadFileFromUrl(item.ImgUrl, "template_imgs");
                    if (resImg.Data != null)
                    {
                        item.NewImgUrl= ApiStatic + "/img" + resImg.Data.path;
                    }
                    uow.PunnelTracking.AddPageImgUrl(item.ImgUrl, item.TemplateId.Value, resImg.IsError, item.NewImgUrl);
                }
            }
            
        }

        void ProcessChangeImage(Template tmp)
        {
            var src = tmp.Source;
            List<string> images = new List<string>();
            if (string.IsNullOrEmpty(src)) return;
            string pattern = @"(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)";

            Regex rgx = new Regex(pattern, RegexOptions.IgnoreCase);
            MatchCollection matches = rgx.Matches(src);

            for (int i = 0, l = matches.Count; i < l; i++)
            {
                if (images.Any(x => x == matches[i].Value) == false)
                {
                    var img = uow.PunnelTracking.Get_PageImage_ByImageUrl(matches[i].Value).FirstOrDefault();
                    if (img != null)
                    {
                        var temp = _dbSet.SingleOrDefault(x => x.Id == tmp.Id);
                        temp.Source = temp.Source.Replace(img.ImgUrl, img.NewImgUrl);
                        this.Commit();
                    }
                }
            }
        }

        public void ProcessChangeTemplateImg(int type)
        {
            var templates = this.GetAll().Where(x => x.Type == type).ToList();
            foreach (var item in templates)
            {
                try
                {
                    ProcessChangeImage(item);
                }catch(Exception ex)
                {

                }
            }
        }
        #endregion
    }
}
