using log4net;
using Punnel.Core.BLL.FileServices;
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
    public class PublishPageRepository : BaseRepository<PublishPage>, IPublishPageRepository
    {
        public PublishPageRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(PublishPageRepository));
        public List<PublishPage> GetForSysTracking()
        {
            //var res = (_dbContext as Model.PunnelContext).msp_PublishPage_GetForSysTracking();
            var res = _dbSet.Where(x => x.HasTracking == false).ToList();
            return res;
        }

        public void IU(PublishPage obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.Id== obj.Id);
            if (m == null)
            {
                obj.CreatedDate = DateTime.Now;
                this.Add(obj);
            }
            else
            {
                m.HasTracking = obj.HasTracking;
                m.UpdatedDate = obj.UpdatedDate;
            }
            this.Commit();
        }

        public void AddSysTracking(PublishPage obj)
        {
            if (obj.HasTracking == false)
            {
                new FileBuilder().CreateDefaultSystemFile(obj.UrlPath, obj.Id.ToString());
                obj.HasTracking = true;
                IU(obj);
            }
        }

        public async Task TestSSL()
        {
            try
            {
                await new IIS.IISServerManager().GenerateSSL("");
            }catch(Exception ex)
            {
                _log.Error(ex);
            }
        }
    }
}
