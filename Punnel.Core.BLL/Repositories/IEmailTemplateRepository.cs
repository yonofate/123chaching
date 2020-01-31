using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IEmailTemplateRepository: IBaseRepository<EmailTemplate>
    {
        Task<List<EmailTemplateListViewModel>> GetByUser(string userId);
        Task<List<EmailTemplateListViewModel>> GetNotUseOnPage(Guid pageId, string userId);
        void IU(EmailTemplate obj);
        bool Exists(int id);
        void Delete(int id, string userId = "");
    }
}