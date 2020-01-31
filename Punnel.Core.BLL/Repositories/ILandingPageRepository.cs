using System.Collections.Generic;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using System;
using Punnel.Core.Entities.ViewModel;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public interface ILandingPageRepository: IBaseRepository<LandingPage>
    {
        int TotalPage(string userId);

        Task<LandingPageIdModel> GetByDomain(string domain);
        Task<List<LandingPageIdModel>> GetByBaseDomain(string domain);
        LandingPage GetByCode(string code);
        Task IU(LandingPage obj, string type);
        List<LandingPageSearchResult> Search(LandingPageRequestModel req, out int total);
        bool IsCollectionUsed(Guid colId);
        byte[] Export(Guid id);
        string GetExportFileName(Guid id);
        string GetDownLoadFileName(Guid id);
        void Import(byte[] file, string userId);
        Task<PublishPageResponseModel> PublishDns(PublishRequestModel model, string userId);
        PublishPageResponseModel ChangePublishUrl(ChangePublishUrlModel model, string userId);
        Task<LandingPageItemModel> FrontEnd_GetLandingPage(Guid id, string type);
        Task<LandingPageItemModel> GetById(Guid id);
        Task<LandingPageForSubcribleModel> GetPageForSubcrible(Guid id);
        Task<Tuple<List<LandingPageSearchResult>, int>> SearchAsync(LandingPageRequestModel req);
        void DeleteByGroup(Guid collectionId,string userId="");
        Task UnPublish(Guid id, string userId="");
        void Delete(Guid id, string userId = "");
        bool Exists(Guid id);
        Task<List<ListResult>> GetPublishPageAsync(string userId);
        Task<int> CountPublishPageAsync(string userId);
        void RemovePageCache(Guid pageId);

        Task<Tuple<List<LandingPageAdminResult>, int>> Admin_LandingPageByUser(string userId);
        Task UnPublishByIntegration(Guid publishIntegrationId, string userId);
        Task<LandingPageItemModel> GetByApiKey(Guid id, string apikey);
    }
}