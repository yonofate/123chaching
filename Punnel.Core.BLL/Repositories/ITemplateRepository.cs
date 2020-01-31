using System;
using System.Collections.Generic;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public interface ITemplateRepository: IBaseRepository<Template>
    {
        Task<TemplateViewModel> FrontEnd_GetById(Guid id);
        Task<TemplateViewModel> GetInfoById(Guid id);
        bool IsUsedCate(Guid colId);
        Task IU(Template obj, string type);
        Task<int> AddFromPageAsync(TemplateRequestFromPageModel req);
        Task<Tuple<List<TemplateListViewModel>, int>> SearchAsync(TemplateRequestModel req);
        void IU_FromSrc(Template obj);
        bool IsOverQuota(string userId);
        void Delete(Guid id, string userId);
        List<string> ProcessImage(Template tmp);
        void ProcessTemplateImg();
        void ChangeImage();
        void ProcessChangeTemplateImg(int type);
        Task<int> ReplaceTemplateSourceSource(string keyword, string replacement);
    }
}