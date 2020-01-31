using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class FormConfigRepository : BaseRepository<FormConfig>, IFormConfigRepository
    {
        public FormConfigRepository(IUow uow) : base(uow) { }

        public FormConfigViewModel GetDetail(Guid id)
        {
            FormConfigViewModel res = new FormConfigViewModel();

            return res;
        }
        public void IU(FormConfig obj)
        {
            obj.Enable = true;
            var page = uow.LandingPage.Get(obj.LandingPageId);
            if (page == null) throw new BusinessException(Punnel.Core.Entities.Resources.Messages.System_Err);
            var itg = uow.Integration.Get(obj.IntegrationId);
            if (itg == null) throw new BusinessException(Punnel.Core.Entities.Resources.Messages.System_Err);

            var m = _dbSet.FirstOrDefault(x=>x.LandingPageId== obj.LandingPageId && x.IntegrationId==obj.IntegrationId);
            if (m == null)
            {                
                this.Add(obj);
            }
            else
            {
                m.ListId = obj.ListId;
                m.ListName = obj.ListName;
            }
            this.Commit();
        }

        public void Delete(Guid landingPageId, Guid integrationId)
        {
            var m = _dbSet.FirstOrDefault(x => x.LandingPageId == landingPageId && x.IntegrationId == integrationId);
            _dbSet.Remove(m);
            this.Commit();
        }

        public void DeleteByIntegration(Guid integrationId)
        {
            var m = _dbSet.Where(x => x.IntegrationId == integrationId);
            foreach(var item in m)
            {
                _dbSet.Remove(item);
            }           
            this.Commit();
        }

    }
}
