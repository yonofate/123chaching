using IntegrationServices.GetResponse;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.GetResponse;
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
        #region GetResponse
        public Integration GetResponse_Auth(string apiKey, string userId)
        {
            Integration result = new Integration();
            GetResponseTask task = new GetResponseTask(apiKey);
            var res = task.Auth();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var resultAuth = (AccountResponse)res.Data;
                //save info
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.GetResponse,
                    AccId = resultAuth.accountId,
                    Email = resultAuth.email,
                    Phone = resultAuth.phone,
                    ApiKey = apiKey,
                    UserId = userId,
                    LastConnectedDate = DateTime.Now
                };
                IU(info, userId);
                result = info;
            }
            else
            {
                throw new BusinessException(res.Message);
            }
            return result;
        }

        public List<CampainResponse> GetResponse_GetCampains(string userId, string accId)
        {
            List<CampainResponse> result = new List<CampainResponse>();

            var apiSite = _dbSet.AsNoTracking().FirstOrDefault(x => x.UserId == userId && x.AccId == accId);
            if (apiSite == null)
            {
                return result;
            }
            string apiKey = apiSite.ApiKey;

            GetResponseTask task = new GetResponseTask(apiKey);
            var res = task.GetCampaigns();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                result = (List<CampainResponse>)res.Data;
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
