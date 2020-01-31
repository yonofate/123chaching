using System;
using Punnel.Core.Entities.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface ITemplateCategoryRepository: IBaseRepository<TemplateCategory>
    {
        void IU(TemplateCategory obj);
        Task<List<TemplateCategoryViewModel>> GetByType(int type);
        Task<TemplateCategoryViewModel> GetByCode(string code);
        void IU_FromSrc(TemplateCategory obj);
    }
}