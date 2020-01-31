using log4net;
using Punnel.Core.BLL.Utils;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using Punnel.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class ExternalPublishRepository : BaseRepository<ExternalPublish>, IExternalPublishRepository
    {
        public ExternalPublishRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(ExternalPublishRepository));
        public async Task<List<ExternalPublishViewModel>> GetByUser(string userId)
        {
            var res = await (_dbContext as Model.PunnelContext).msp_ExternalPublish_GetByUser(userId,1);
            return res;
        }

        public async Task<ExternalPublishViewModel> GetByPage(Guid pageId, string userId)
        {
            var res = await (_dbContext as Model.PunnelContext).msp_ExternalPublish_GetByPage(pageId, userId, 1);
            return res;
        }

        public void IU(ExternalPublish obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.LandingPageId== obj.LandingPageId && x.UserId==obj.UserId);
            if (m == null)
            {
                var isExist = _dbSet.Any(x => x.Domain == obj.Domain && x.PathUrl==obj.PathUrl && x.IsChecked);
                if (isExist) throw new BusinessException("Trang này đã được sử dụng!");
                obj.IsChecked = true;
                obj.LastCheckedDate = DateTime.Now;
                obj.VendorId = (int)PublishType.Wordpress;
                this.Add(obj);
            }
            else
            {
                if (IsOwnerOrAdmin(m.UserId, obj.UserId) == false) return;
                m.Domain = obj.Domain;
                m.PathUrl = obj.PathUrl;
                m.Token = obj.Token;
                m.LastCheckedDate = obj.LastCheckedDate;
            }
            this.Commit();
        }

        bool CanCreate(ExternalPublish obj)
        {
            if (obj.Id > 0) return false;
            if(string.IsNullOrEmpty(obj.Token) ||  string.IsNullOrEmpty(obj.PathUrl))
            {
                throw new BusinessException("Vui lòng nhập đầy đủ thông tin hợp lệ!");
            }
            var isExist = _dbSet.Any(x => x.Domain == obj.Domain && x.PathUrl == obj.PathUrl && x.IsChecked);
            if (isExist) throw new BusinessException("Trang này đã được sử dụng!");
            return true;
        }

        bool CanUpdate(ExternalPublish obj)
        {
            if (string.IsNullOrEmpty(obj.Token) || string.IsNullOrEmpty(obj.PathUrl))
            {
                throw new BusinessException("Vui lòng nhập đầy đủ thông tin hợp lệ!");
            }
            var isExist = _dbSet.Any(x => x.UserId==obj.UserId && x.LandingPageId==obj.LandingPageId);
            if (!isExist) throw new BusinessException("Cấu hình WP không tồn tại, không thể cập nhật!");
            return true;
        }

        bool Exist(string domain, string path)
        {
            var isExist = _dbSet.Any(x=>x.Domain == domain && x.PathUrl == path);
            return isExist;
        }

        async Task UpdateLandingPage(ExternalPublish obj,object data)
        {
            var domain = data.ToString().Replace("https://", "").Replace("http://", "");
            await uow.LandingPage.IU(new LandingPage()
            {
                Id = obj.LandingPageId,
                UserId = obj.UserId,
                Domain = domain,
                BaseDomain = obj.Domain.Replace("https://", "").Replace("http://", ""),
                PublishType = (int)PublishType.Wordpress
            }, "publish");
        }

        public async Task<string> CreatePage(ExternalPublish obj,string title, string html)
        {
            if (CanCreate(obj))
            {
                var res = new WordpressUtils(obj.Domain, obj.PathUrl, obj.Token).CreatePage("create", title, html, "page");
                if (res.Code == System.Net.HttpStatusCode.OK)
                {
                    IU(obj);
                    var domain = res.Data.ToString().Replace("https://", "").Replace("http://", "");
                    await UpdateLandingPage(obj, domain);
                    return domain;
                }
                else throw new BusinessException(res.Message);
            }
            throw new BusinessException("Lỗi! Vui lòng kiểm tra thông tin cấu hình hợp lệ, hoặc liên hệ để được hỗ trợ");
        }

        public async Task<string> UpdatePage(ExternalPublish obj, string title, string html)
        {
            if (CanUpdate(obj))
            {
                var res = new WordpressUtils(obj.Domain, obj.PathUrl, obj.Token).CreatePage("update", title, html, "page");
                if (res.Code == System.Net.HttpStatusCode.OK)
                {
                    IU(obj);
                    var domain = res.Data.ToString().Replace("https://", "").Replace("http://", "");
                    await UpdateLandingPage(obj, domain);
                    return domain;
                }
                else throw new BusinessException(res.Message);
            }
            throw new BusinessException("Lỗi! Vui lòng kiểm tra thông tin cấu hình hợp lệ, hoặc liên hệ để được hỗ trợ");
        }

        public async Task<string> UpdatePage(Guid landingpageId,string title, string html)
        {
            var obj = _dbSet.FirstOrDefault(x => x.LandingPageId == landingpageId);
            if (obj == null)
            {
                throw new BusinessException("Lỗi! Cấu hình kết nối Wordpress đã bị hủy");
            }
            if (CanUpdate(obj))
            {
                var res = new WordpressUtils(obj.Domain, obj.PathUrl, obj.Token).CreatePage("update", title, html, "page");
                if (res.Code == System.Net.HttpStatusCode.OK)
                {
                    IU(obj);
                    var domain = res.Data.ToString().Replace("https://", "").Replace("http://", "");
                    await UpdateLandingPage(obj, domain);
                    return domain;
                }
                else throw new BusinessException(res.Message);
            }
            throw new BusinessException("Lỗi! Vui lòng kiểm tra thông tin cấu hình hợp lệ, hoặc liên hệ để được hỗ trợ");
        }

        public async Task<string> IUPage(Entities.RequestModel.PublishWpRequestModel model, string userId)
        {
            var page = await uow.LandingPage.GetById(model.PageId);
            if (page == null)
            {
                throw new BusinessException("Lỗi! Không tim thấy landing page");
            }
            if (string.IsNullOrEmpty(model.PathUrl) || string.IsNullOrEmpty(model.Token))
            {
                throw new BusinessException("Lỗi! Vui lòng nhập Sub Url và Token");
            }

            model.PathUrl = Utils.CommonUtils.ToFriendllyUrl(model.PathUrl);
            if (Exist(model.Domain, model.PathUrl))
            {
                return await UpdatePage(new ExternalPublish()
                {
                    Token= model.Token,
                    Domain=model.Domain,
                    PathUrl= model.PathUrl,
                    LandingPageId= model.PageId,
                    UserId= userId
                },page.Name,model.Html);
            }
            else
            {
                return await CreatePage(new ExternalPublish()
                {
                    Token = model.Token,
                    Domain= model.Domain,
                    PathUrl = model.PathUrl,
                    LandingPageId = model.PageId,
                    UserId = userId
                }, page.Name, model.Html);
            }
        }

        public bool WP_Auth(Entities.RequestModel.PublishWpRequestModel obj)
        {
            var res = new WordpressUtils(obj.Domain, obj.PathUrl, obj.Token).Auth();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                return (bool)res.Data;
            }
            else throw new BusinessException(res.Message);
        }

        public bool WP_IsExist(Entities.RequestModel.PublishWpRequestModel obj)
        {
            var res = new WordpressUtils(obj.Domain, obj.PathUrl, obj.Token).IsExits();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                return (bool)res.Data;
            }
            else throw new BusinessException(res.Message);
        }

        public void Delete(Guid id , string userId)
        {
            var col = _dbSet.FirstOrDefault(x => x.LandingPageId == id);
            if (col != null)
            {
                if (IsOwnerOrAdmin(col.UserId, userId) == false) return;
                
                var res = new WordpressUtils(col.Domain, col.PathUrl, col.Token).CreatePage("delete", "", "", "page");
                if(res.Code== System.Net.HttpStatusCode.OK)
                {
                    uow.LandingPage.UnPublish(col.LandingPageId, userId);
                    _dbSet.Remove(col);
                    this.Commit();
                }               
            }
        }

    }
}
