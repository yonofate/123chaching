using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IAutomationRepository
    {
        void Delete(Guid id, string userId);
        Task<List<AutomationViewModel>> GetByPage(Guid pageId);
        Task<List<AutomationViewModel>> GetByType(string userId);
        void IU(Automation obj);
        void DeleteByTemplateId(int templateId, string userId);
    }
}