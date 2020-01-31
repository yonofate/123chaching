using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IExternalPublishRepository: IBaseRepository<ExternalPublish>
    {
        void Delete(Guid id, string userId);
        Task<List<ExternalPublishViewModel>> GetByUser(string userId);
        Task<ExternalPublishViewModel> GetByPage(Guid pageId, string userId);
        void IU(ExternalPublish obj);
        Task<string> CreatePage(ExternalPublish obj, string title, string html);
        Task<string> UpdatePage(ExternalPublish obj, string title, string html);
        Task<string> UpdatePage(Guid landingpageId, string title, string html);
        Task<string> IUPage(Entities.RequestModel.PublishWpRequestModel model, string userId);
        bool WP_IsExist(Entities.RequestModel.PublishWpRequestModel obj);
    }
}