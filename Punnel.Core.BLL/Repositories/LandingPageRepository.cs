using Punnel.Core.Utils;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Punnel.Core.Entities.ViewModel;
using MBN.Utils;
using Punnel.Core.Entities;

namespace Punnel.Core.BLL.Repositories
{
    public class LandingPageRepository : BaseRepository<LandingPage>, ILandingPageRepository
    {
        private static readonly string Export_PrivateKey = WebUtils.AppSettings("EXP_PRIVATE_KEY", "Punnel-COM");
        private static readonly string Export_CheckKey = WebUtils.AppSettings("EXP_CHECK_KEY", "[Punnel]");
        private static readonly string Export_Extension = WebUtils.AppSettings("EXP_FILE_EXT", ".Punnel");
        private static readonly string Download_Extension = WebUtils.AppSettings("DW_FILE_EXT", ".zip");

        private static readonly string DNS_SERVER = WebUtils.AppSettings("DNS_SERVER", "103.92.28.60");
        private static readonly string PUBLISH_DOMAIN = WebUtils.AppSettings("PUBLISH_DOMAIN", @"punnel.co");
        private static readonly string ROOT_DOMAIN = WebUtils.AppSettings("ROOT_DOMAIN", @"punnel.com");

        private static readonly string Export_LandingPage_Name = "Trang mới - nguồn import";
        public LandingPageRepository(IUow uow) : base(uow) { }

        public int TotalPage(string userId)
        {
            return _dbSet.AsNoTracking().Count(x => x.UserId == userId);
        }

        public virtual LandingPage GetByCode(string code)
        {
            var p = _dbSet.FirstOrDefault(x => x.Code == code);
            if (p == null) throw new BusinessException(Punnel.Core.Entities.Resources.Messages.ShareCode_Invalid);
            return p;
        }

        public async Task IU(LandingPage obj, string type)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == obj.Id);
            
            if (m == null)
            {
                if (string.IsNullOrEmpty(obj.BaseDomain)) obj.BaseDomain = PUBLISH_DOMAIN;
                //obj.UrlCode = MakeUrlCode(obj.Name);
                if (!string.IsNullOrEmpty(obj.Source))
                {
                    obj.IsMailAutoResponse = false;
                    //string autoReplyEmail = "\"autoReply\":1";
                    //string newautoReplyEmail = "\"autoReply\":0";
                    //obj.Source = obj.Source.Replace(autoReplyEmail, newautoReplyEmail);
                }
                this.Add(obj);
            }
            else
            {
                m.UpdatedDate = DateTime.Now;
                //if (IsOwnerOrAdmin(m.UserId, obj.UserId) == false) return;

                if (type == "name") m.Name = obj.Name;
                else if (type == "pos")
                {
                    obj.Position = obj.Position - 1;
                    var pages = _dbSet.Where(x => x.CollectionId == m.CollectionId && x.UserId==m.UserId).OrderBy(x => x.Position).ToList();

                    int old_pos = pages.IndexOf(m);

                    var item_change = pages[obj.Position];
                    var itemChanged = _dbSet.FirstOrDefault(x => x.Id == item_change.Id);
                    itemChanged.Position = old_pos;
                    m.Position = obj.Position;
                }
                else if (type == "col") m.CollectionId = obj.CollectionId;
                else if (type == "source")
                {
                    m.Source = obj.Source;
                    //string autoReplyEmail = "\"autoReply\":1";
                    //m.IsMailAutoResponse = (m.Source.IndexOf(autoReplyEmail) > 0);
                    m.HasEmailFrm = obj.HasEmailFrm;
                    m.HasPhoneFrm = obj.HasPhoneFrm;

                  await Task.Factory.StartNew(() =>
                    {
                        uow.HistoryPage.Save(new HistoryPage()
                        {
                            LandingPageId = obj.Id,
                            UserId = obj.UserId,
                            Source = obj.Source,
                        });
                    });
                }
                else if (type == "thumb")
                {
                    m.Thumnail = obj.Thumnail;
                    if (!string.IsNullOrEmpty(obj.Source)) m.Source = obj.Source;
                }
                else if (type == "publish")
                {
                    m.Domain = obj.Domain;
                    m.Https = obj.Https;                   
                    m.Publish = true;
                    m.PublishType = obj.PublishType;
                    if (obj.PublishType >1)
                    {
                        m.PublishReferId = obj.PublishReferId;
                        m.PublishIntegrationId = obj.PublishIntegrationId;
                        m.UrlCode = obj.UrlCode;
                    }
                    m.PublishDate = DateTime.Now;
                }
                else if (type == "unpublish")
                {
                    m.Publish = false;
                    m.PublishDate = null;
                }
                else if (type == "fbchat")
                {
                    m.Source = obj.Source;
                }
                else if (type == "fbpage")
                {
                    m.FanPageId = obj.FanPageId;
                }
                else if (type == "form")
                {
                    m.HasEmailFrm = obj.HasEmailFrm;
                    m.HasPhoneFrm = obj.HasPhoneFrm;
                }
                else if (type == "un_autoreply")
                {
                    m.IsMailAutoResponse = false;
                    string autoReplyEmail = "\"autoReply\":1";
                    string newautoReplyEmail = "\"autoReply\":0";
                    m.Source= m.Source.Replace(autoReplyEmail, newautoReplyEmail);
                }
                this.RemoveCache(m.Id, "p");
            }
            await this.CommitAsync();
        }

        void UpdateDomain(Guid id,string userId, string domain,string source)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == id && x.UserId== userId);
            if(m == null)
            {
                throw new BusinessException(Punnel.Core.Entities.Resources.Messages.LandingPage_NotFound);
            }
           // m.Source = source;
            m.Domain = domain;
            m.Publish = true;
            m.PublishDate = DateTime.Now;
            m.UpdatedDate = DateTime.Now;
            this.Commit();

            //Tìm các landingpage khác
            var p = _dbSet.Where(x => x.Domain.ToLower() == domain.ToLower() && x.Id!=id && x.UserId== userId);
            foreach(var i in p)
            {
                i.Domain = string.Empty;
                i.Publish = false;
                i.PublishDate = null;
                i.PublishType = 0;
            }
            this.Commit();
            this.RemoveCache(m.Id, "p");
        }

        public async Task<LandingPageIdModel> GetByDomain(string domain)
        {
            return await (_dbContext as Model.PunnelContext).msp_LandingPage_GetIdByDomain(domain);
        }

        public async Task<List<LandingPageIdModel>> GetByBaseDomain(string domain)
        {
            return await (_dbContext as Model.PunnelContext).msp_LandingPage_GetByBaseDomain(domain);
        }

        public async Task<LandingPageItemModel> GetById(Guid id)
        {
            return await (_dbContext as Model.PunnelContext).msp_LandingPage_GetById(id);
        }

        public virtual async Task<LandingPageItemModel> FrontEnd_GetLandingPage(Guid id, string type)
        {
            return await (_dbContext as Model.PunnelContext).msp_FrontEnd_GetLandingPage(id,type);
        }

        public async Task<LandingPageForSubcribleModel> GetPageForSubcrible(Guid id)
        {
            return await (_dbContext as Model.PunnelContext).msp_LandingPage_GetPageForSubcrible(id);
        }

        public List<LandingPageSearchResult> Search(LandingPageRequestModel req, out int total)
        {
            total = 0;
            return (_dbContext as Model.PunnelContext).msp_LandingPage_Search(req, out total);
        }

        public async Task<Tuple<List<LandingPageSearchResult>, int>> SearchAsync(LandingPageRequestModel req)
        {
            return await (_dbContext as Model.PunnelContext).msp_LandingPage_SearchAsync(req);
        }

        public async Task<List<ListResult>> GetPublishPageAsync(string userId)
        {
            return await (_dbContext as Model.PunnelContext).msp_GetPublishPage(userId);
        }

        public async Task<int> CountPublishPageAsync(string userId)
        {
            return await (_dbContext as Model.PunnelContext).msp_LandingPage_TotalPublish(userId);
        }

        public bool Exists(Guid id)
        {
            return _dbSet.AsNoTracking().Any(x => x.Id == id);
        }
        public void Delete(Guid id,string userId="")
        {
            var landingPage = _dbSet.FirstOrDefault(x => x.Id == id);
            if (landingPage == null)
            {
                throw new BusinessException(Messages.LandingPage_NotFound);
            }
            if (IsOwnerOrAdmin(landingPage.UserId, userId) == false) return;

            RemoveIISAndHost(landingPage);

            landingPage.Deleted = true;
            landingPage.Publish = false;
            landingPage.PublishDate = null;
            landingPage.Domain = null;
            landingPage.PublishType = 0;
            landingPage.PublishIntegrationId = null;
            landingPage.PublishReferId = null;
           // _dbSet.Remove(landingPage);
            this.Commit();
            this.RemoveCache(landingPage.Id, "p");
        }

        public async Task UnPublish(Guid id,string userId)
        {
            var landingPage = _dbSet.FirstOrDefault(x => x.Id == id);
            if (landingPage == null)
            {
                throw new BusinessException(Messages.LandingPage_NotFound);
            }
            if (IsOwnerOrAdmin(landingPage.UserId, userId) == false) return;

            RemoveIISAndHost(landingPage);


            landingPage.Publish = false;
            landingPage.PublishDate = null;
            landingPage.PublishType = 0;
            landingPage.PublishIntegrationId = null;
            landingPage.PublishReferId = null;
            landingPage.Domain = null;
            landingPage.BaseDomain = null;
            await this.CommitAsync();
            this.RemoveCache(landingPage.Id, "p");
        }

        public async Task UnPublishByIntegration(Guid publishIntegrationId, string userId)
        {
            if (publishIntegrationId == null) return;
            var landingPages = _dbSet.Where(x => x.PublishIntegrationId == publishIntegrationId);
            foreach (var landingPage in landingPages)
            {
                if (IsOwnerOrAdmin(landingPage.UserId, userId) == false) return;

                RemoveIISAndHost(landingPage);

                landingPage.Publish = false;
                landingPage.PublishDate = null;
                landingPage.PublishType = 0;
                landingPage.PublishIntegrationId = null;
                landingPage.PublishReferId = null;
                landingPage.Domain = null;
                landingPage.BaseDomain = null;
                await this.CommitAsync();
                this.RemoveCache(landingPage.Id, "p");
            }
        }

        public void DeleteByGroup(Guid collectionId, string userId)
        {
            var landingPages = _dbSet.Where(x => x.CollectionId == collectionId && x.Deleted==false);
            foreach(var item in landingPages)
            {
                if (IsOwnerOrAdmin(item.UserId, userId) == false) return;
                //_dbSet.Remove(item);

                RemoveIISAndHost(item);

                item.CollectionId = null;
                item.Deleted = true;
                item.Publish = false;
                item.PublishType = 0;
                item.PublishIntegrationId = null;
                item.PublishReferId = null;
                item.PublishDate = null;
                item.Domain = null;
                item.BaseDomain = null;
                //_dbSet.Remove(item);
                this.RemoveCache(item.Id, "p");
            }
            this.Commit();           
        }

        void RemoveIISAndHost(LandingPage landingPage)
        {
            if (!string.IsNullOrEmpty(landingPage.Domain) && IsSystemPublishDomain(landingPage.BaseDomain) == false)
            {
                if (landingPage.Domain == landingPage.BaseDomain && string.IsNullOrEmpty(landingPage.UrlCode))
                {
                    var filesvc = new FileServices.FileBuilder();
                    if (filesvc.CanRemoveIIS(landingPage.BaseDomain))
                    {
                        new IIS.IISServerManager().RemoveWebsite(landingPage.BaseDomain);
                    }
                }
            }
            if (!string.IsNullOrEmpty(landingPage.UrlCode) && !string.IsNullOrEmpty(landingPage.BaseDomain))
            {
                new Core.BLL.FileServices.FileBuilder(landingPage.BaseDomain, landingPage.UrlCode, "").Remove();
            }
        }

        public bool IsCollectionUsed( Guid colId)
        {
            return _dbSet.Any(x => x.CollectionId == colId);
        }

        #region ExportFile
        public byte[] Export(Guid id)
        {
            var landingPage = _dbSet.Find(id);
            if (landingPage == null)
            {
                throw new BusinessException(Messages.LandingPage_NotFound);
            }
            string contentToExport = landingPage.Source + Export_CheckKey;
            string encriptContent = StringCipher.Encrypt(contentToExport, Export_PrivateKey);
            byte[] contents = System.Text.Encoding.UTF8.GetBytes(encriptContent);
            return contents;
        }

        public string GetExportFileName(Guid id)
        {
            var ld = this.Get(id);
            if (ld == null)
            {
                throw new BusinessException(Messages.LandingPage_NotFound);
            }
            return string.Format("{0}_{1}{2}", Core.Utils.StringUtils.ToFriendlyUrl(ld.Name),DateTime.Today.ToString("ddMMyyyy"), Export_Extension);
        }

        public string GetDownLoadFileName(Guid id)
        {
            var ld = this.Get(id);
            if (ld == null)
            {
                throw new BusinessException(Messages.LandingPage_NotFound);
            }
            return string.Format("{0}_{1}{2}", Core.Utils.StringUtils.ToFriendlyUrl(ld.Name), DateTime.Today.ToString("ddMMyyyy"), Download_Extension);
        }
        #endregion

        #region ImportFile

        public void Import(byte[] file, string userId)
        {
            string content = "";
            try
            {
                string result = System.Text.Encoding.UTF8.GetString(file);
                content = StringCipher.Decrypt(result, Export_PrivateKey);

            }catch(Exception)
            {
                throw new BusinessException(Messages.LandingPage_Export_FileNotAllowed);
            }
            if (!content.Contains(Export_CheckKey))
            {
                throw new BusinessException(Messages.LandingPage_Export_FileNotAllowed);
            }
            content = content.Replace(Export_CheckKey, "");

            LandingPage ld = new LandingPage()
            {
                Id= Guid.NewGuid(),
                UserId= userId,
                Name= Export_LandingPage_Name,
                Source = content
            };

            IU(ld, "");
        }

        #endregion

        #region Download

        #endregion

        #region Publish
        bool IsValidUrlCode(string url)
        {
            if (url.ToLower() == "bin") return false;
            var fullUrl = string.Format("https://{0}/{1}", PUBLISH_DOMAIN, url);
            return Uri.IsWellFormedUriString(fullUrl, UriKind.RelativeOrAbsolute);
        }
        string MakeUrlCode(string baseDomain,string name)
        {
            if (name == "bin") name = name + "page bin";
            var urlCode = Utils.CommonUtils.ToFriendllyUrl(name);
            var baseUrl = urlCode;
            int i = 1;
            while (_dbSet.AsNoTracking().Any(x => x.UrlCode == urlCode && x.BaseDomain== baseDomain))
            {
                urlCode = baseUrl + i.ToString();
                i++;
            }
            return urlCode;
        }
        bool IsSystemPublishDomain(string domain)
        {
            if (string.IsNullOrEmpty(domain)) return true;
            return domain.Trim().ToLower() == PUBLISH_DOMAIN.Trim().ToLower();
        }

        bool IsValidUri(string url)
        { 
            Uri uri = null;
            return Uri.TryCreate(url, UriKind.RelativeOrAbsolute, out uri);
        }
        public async Task<PublishPageResponseModel> PublishDns(PublishRequestModel model, string userId)
        {
            PublishPageResponseModel response = new PublishPageResponseModel();
            var m = _dbSet.FirstOrDefault(x => x.Id == model.id && x.UserId == userId);
            if (m==null)
            {
                throw new BusinessException(Messages.LandingPage_NotFound);
            }
            if (model.type>0) m.PublishType = model.type;

            if (m.PublishIntegrationId.HasValue && m.Publish==true)
            {
                var itg = uow.Integration.Get(m.PublishIntegrationId.Value);
                if (itg != null)
                {
                    //ftp
                    if (m.Publish && m.PublishType == (int)PublishType.Ftp)
                    {
                        if (m.PublishIntegrationId == null) throw new BusinessException("Vui lòng xem lại cấu hình kết nối Ftp");
                        PublishExternalRequestModel data = new PublishExternalRequestModel()
                        {
                            Html = model.html,
                            PageId = model.id,
                            PathUrl = m.UrlCode,
                            IntegrationId = m.PublishIntegrationId.Value
                        };
                        await uow.UserProfile.SetUserStatusNote(m.UserId, LeadStatus.Hot, "Xuất bản Ftp");
                        return await uow.Integration.Ftp_IU(data, userId);
                    }

                    //wordpress
                    if (m.Publish && m.PublishType == (int)PublishType.WP)
                    {
                        if (m.PublishIntegrationId == null) throw new BusinessException("Vui lòng xem lại cấu hình kết nối Wordpress");
                        PublishExternalRequestModel data = new PublishExternalRequestModel()
                        {
                            Html = model.html,
                            PageId = model.id,
                            PathUrl = m.UrlCode,
                            IntegrationId = m.PublishIntegrationId.Value
                        };
                        await uow.UserProfile.SetUserStatusNote(m.UserId, LeadStatus.Hot, "Xuất bản wordpress");
                        return await uow.Integration.WP_IU(data, userId);

                        //return await uow.Integration.WP_IU(model.id, m.Name, model.html);
                    }

                    //shopify
                    if (m.Publish && m.PublishType == (int)PublishType.Shopify)
                    {
                        if (m.PublishIntegrationId == null) throw new BusinessException("Vui lòng xem lại cấu hình kết nối Shopify");
                        PublishExternalRequestModel data = new PublishExternalRequestModel()
                        {
                            Html = model.html,
                            PageId = model.id,
                            PathUrl = m.UrlCode,
                            IntegrationId = m.PublishIntegrationId.Value
                        };
                        await uow.UserProfile.SetUserStatusNote(m.UserId, LeadStatus.Hot, "Xuất bản shopify");
                        return await uow.Integration.Shopify_IU(data, userId);
                    }

                    //haravan
                    if (m.Publish && m.PublishType == (int)PublishType.Haravan)
                    {
                        if (m.PublishIntegrationId == null) throw new BusinessException("Vui lòng xem lại cấu hình kết nối Haravan");
                        PublishExternalRequestModel data = new PublishExternalRequestModel()
                        {
                            Html = model.html,
                            PageId = model.id,
                            PathUrl = m.UrlCode,
                            IntegrationId = m.PublishIntegrationId.Value
                        };
                        await uow.UserProfile.SetUserStatusNote(m.UserId, LeadStatus.Hot, "Xuất bản haravan");
                        return await uow.Integration.Haravan_IU(data, userId);
                    }

                    //sapo
                    if (m.Publish && m.PublishType == (int)PublishType.Sapo)
                    {
                        if (m.PublishIntegrationId == null) throw new BusinessException("Vui lòng xem lại cấu hình kết nối Sapo");
                        PublishExternalRequestModel data = new PublishExternalRequestModel()
                        {
                            Html = model.html,
                            PageId = model.id,
                            PathUrl = m.UrlCode,
                            IntegrationId = m.PublishIntegrationId.Value
                        };
                        await uow.UserProfile.SetUserStatusNote(m.UserId, LeadStatus.Hot, "Xuất bản sapo");
                        return await uow.Integration.Sapo_IU(data, userId);
                    }
                }
                else 
                {
                    m.Publish = false;
                    m.Domain = null;
                    m.BaseDomain = PUBLISH_DOMAIN;
                    model.domain = null;
                }
            }

            bool isFirstPublish = (m.Publish == false || string.IsNullOrEmpty(model.domain));

            var hasBaseDomain = (string.IsNullOrEmpty(m.BaseDomain)==false);
            model.domain = string.IsNullOrEmpty(model.domain) ? PUBLISH_DOMAIN : model.domain;
            model.domain = model.domain.Replace("www.", "");
            if(IsValidUri("http://" + model.domain)==false)
            {
                throw new BusinessException("Tên miền không hợp lệ!");
            }

            Uri u = new Uri("http://" + model.domain);

            
            bool isHostChanged = (u.Host != m.BaseDomain);
            string old_domain = m.BaseDomain;
            string old_UrlCode = m.UrlCode;
            m.BaseDomain = u.Host;
            string path_name = u.LocalPath.Replace("/", "");

            if (string.IsNullOrEmpty(path_name) && IsSystemPublishDomain(m.BaseDomain))
            {
                if (string.IsNullOrEmpty(m.Name)==true) m.Name = "Tiêu đề trang";
                m.UrlCode = MakeUrlCode(m.BaseDomain, m.Name);
            }
            else
            {
                if (uow.Domain.IsNotOwner(m.BaseDomain, userId) == true && IsSystemPublishDomain(m.BaseDomain) == false)
                {
                    throw new BusinessException(string.Format("{0} đã được sử dụng!", m.BaseDomain));
                }

                var exists = _dbSet.AsNoTracking().Any(x => x.Deleted==false && x.BaseDomain == m.BaseDomain && x.UrlCode == path_name && x.UserId == userId && x.Id != model.id);
                if (exists)
                {                   
                    throw new BusinessException(string.Format("{0} đã được sử dụng cho landing page khác", model.domain));
                }
                m.UrlCode = path_name;
            }

            var res= new Core.BLL.FileServices.FileBuilder(m.BaseDomain, m.UrlCode, model.html).Create(m.Id.ToString());

            if (model.domain!=m.Domain && !string.IsNullOrEmpty(old_domain)) {
                new Core.BLL.FileServices.FileBuilder(old_domain, old_UrlCode, "").Remove();
            }

            string urlFolderPath = u.Host;
            
            //Nếu user cấu hình domain mới => kiểm tra IIS
            bool hasTracking = true;
            if (!string.IsNullOrEmpty(m.BaseDomain) && isHostChanged && IsSystemPublishDomain(m.BaseDomain) ==false)
            {
                if (isHostChanged)
                {
                    //Kiem tra domain da tro ve DNS server?
                    uow.Domain.Verify(m.BaseDomain, userId);
                    //Tracking với domain ngoài
                    hasTracking = false;
                }
                var pagesInDomain = await GetByBaseDomain(old_domain);
                var iisService = new Services.IISService();
                if (pagesInDomain.Count<=1 && IsSystemPublishDomain(old_domain) == false)
                {
                    var path = await iisService.ChangeWebsite(old_domain, m.BaseDomain);
                }
                else
                {
                    var path = await iisService.AddWebsite(m.BaseDomain);
                }
                // create Web on IIS
                //if (path != "") res = path;    
            }

            //var iisService1 = new Services.IISService();
            //iisService1.ChangeWebsite(m.BaseDomain);

            m.PublishType = (int)PublishType.Dns;//IsSystemPublishDomain(m.BaseDomain) ? (int)PublishType.Demo : (int)PublishType.Domain;
            m.Domain = res;
            if(!string.IsNullOrEmpty(model.source)) m.Source = model.source;
            m.Publish = true;
            m.PublishDate = DateTime.Now;
            m.UpdatedDate = DateTime.Now;
            await this.CommitAsync();
            this.RemoveCache(m.Id, "p");
            if (isFirstPublish || hasTracking == false)
            {
                try
                {
                    await uow.UserProfile.SetUserStatusNote(m.UserId, LeadStatus.Hot, "Đã xuất bản domain");
                    //uow.TaskQueue.AddTask(new TaskQueue()
                    //{
                    //    Data = m.Id.ToString(),
                    //    Type = (int)Entities.TaskQueueType.UpdatePageContent,
                    //    CreatedDate = DateTime.Now,
                    //    UpdatedDate=DateTime.Now
                    //});
                }catch(Exception ex)
                {
                }
            }
            else if (IsSystemPublishDomain(m.BaseDomain) && isHostChanged)
            {
                try
                {
                    await uow.UserProfile.SetUserStatusNote(m.UserId, LeadStatus.Warm, "Đã xuất bản trang");
                }
                catch (Exception ex)
                {
                }
            }

            

            if (hasTracking == false)
            {
                uow.PublishPage.IU(new PublishPage()
                {
                    Id = m.Id,
                    UrlPath = urlFolderPath,
                    HasTracking = hasTracking,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now
                });
            }

            response.FullUrl = res;
            response.PathUrl = m.UrlCode;
            response.BaseDomain = m.BaseDomain;
            response.Type = m.PublishType;
            response.PublishIntegrationId = m.PublishIntegrationId;
            return response;
        }

        public PublishPageResponseModel ChangePublishUrl(ChangePublishUrlModel model, string userId)
        {
            model.UrlCode = model.UrlCode.Replace("/", "").Replace(" ","");
            var m = _dbSet.FirstOrDefault(x => x.Id == model.Id && x.UserId == userId);
            if (m == null)
            {
                throw new BusinessException(Punnel.Core.Entities.Resources.Messages.LandingPage_NotFound);
            }

            var urlCode = model.UrlCode.Trim().ToLower();
            if (urlCode.Contains(" ")) urlCode = MakeUrlCode(m.BaseDomain, urlCode);
            if (IsValidUrlCode(urlCode) == false)
            {
                throw new BusinessException("Url không hợp lệ. Url chỉ gồm các kí tự a->z, 0->9 và dấu -");
            }
            if (IsSystemPublishDomain(m.BaseDomain) && string.IsNullOrEmpty(urlCode) == true)
            {
                if (string.IsNullOrEmpty(m.Name) == true) throw new BusinessException("Vui lòng nhập Url");
                else urlCode = MakeUrlCode(m.BaseDomain, m.Name);
            }
            if (_dbSet.AsNoTracking().Any(x => x.Deleted==false && x.UrlCode == urlCode && x.BaseDomain == m.BaseDomain && x.Id != model.Id))
            {
                throw new BusinessException("Url này đã được sử dụng cho Landing Page khác!");
            }

            //Change host folder
            var res = new Core.BLL.FileServices.FileBuilder().ChangeFolder(m.BaseDomain, m.UrlCode, urlCode, model.html, m.Id.ToString());

            m.UrlCode = urlCode.Replace("/", "");
            m.Domain = res;
            m.Publish = true;
            m.PublishDate = DateTime.Now;
            m.UpdatedDate = DateTime.Now;
            this.Commit();
            this.RemoveCache(m.Id, "p");
            return new PublishPageResponseModel()
            {
                FullUrl = res,
                PathUrl = m.UrlCode,
                BaseDomain = m.BaseDomain,
                Type = m.PublishType,
                PublishIntegrationId = m.PublishIntegrationId
        };
        }
        #endregion

        #region WP Publish
        public async Task<LandingPageItemModel> GetByApiKey(Guid id, string apikey)
        {
            var itr = uow.Integration.GetByApiKey(10, apikey);
            if (itr == null)
            {
                throw new BusinessException("Không thực hiện được. Vui lòng kiểm tra tích hợp WP với Punnel trước");
            }
            var lp = await GetById(id);
            if (lp == null)
            {
                throw new BusinessException("Landing page không tồn tại");
            }
            if (string.IsNullOrEmpty(lp.Domain) || string.IsNullOrEmpty(lp.UrlCode))
            {
                throw new BusinessException("Landing page chưa được xuất bản");
            }
            if (lp.UserId != itr.UserId)
            {
                throw new BusinessException("Không thực hiện được. Vui lòng kiểm tra tích hợp WP với Punnel trước");
            }
            return lp;
        }
        #endregion


        #region Quản lý user
        public async Task<Tuple<List<LandingPageAdminResult>, int>> Admin_LandingPageByUser(string userId)
        {
            return await (_dbContext as Model.PunnelContext).msp_Admin_LandingPageByUser(userId);
        }
        #endregion
        #region TaskQueue
        public void RemovePageCache(Guid pageId)

        {
            var m = _dbSet.SingleOrDefault(x => x.Id == pageId);
            if (m != null)
            {
                var fileSvc = new FileServices.FileBuilder(m.BaseDomain, m.UrlCode, "");
                fileSvc.changeIndexFileContent();
            }
        }
        #endregion
        #region cache
        public virtual void RemoveCache(Guid id, string type)
        {
        }
        #endregion
    }
}
