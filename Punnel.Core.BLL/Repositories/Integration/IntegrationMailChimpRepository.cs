using IntegrationServices.MailChimp;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.MailChimp;
using Punnel.Core.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public partial class IntegrationRepository
    {
        #region MailChimp
        public Integration MailChimp_Auth(string apiKey, string userId)
        {
            Integration result = new Integration();
            MailChimpTask task = new MailChimpTask(apiKey);
            var res = task.Auth();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var resultAuth = (AccountResponse)res.Data;
                //save info
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.MailChimp,
                    AccId = resultAuth.account_id,
                    Email = resultAuth.email,
                    Phone = resultAuth.phone,
                    ApiKey = apiKey,
                    UserId = userId,
                    LastConnectedDate = DateTime.Now
                };
                IU(info, userId);
                result= info;
            }
            else
            {
                throw new BusinessException(res.Message);
            }
            return result;
        }

        public List<CampainResponseItem> MailChimp_GetCampains(string userId, string accId)
        {
            List<CampainResponseItem> result = new List<CampainResponseItem>();

            var apiSite = _dbSet.AsNoTracking().FirstOrDefault(x => x.UserId == userId && x.AccId == accId);
            if (apiSite == null)
            {
                return result;
            }
            string apiKey = apiSite.ApiKey;

            MailChimpTask task = new MailChimpTask(apiKey);
            var res = task.GetCampaigns();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                result = ((CampainResponse)res.Data).lists;
            }
            else
            {
                throw new BusinessException(res.Message);
            }
            return result;
        }
        #endregion
    }
}
