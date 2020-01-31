using IntegrationServices.Autopilot;
using IntegrationServices.InfusionSoft;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.Autopilot;
using Punnel.Core.Entities.Integration.InfusionSoft;
using Punnel.Core.Entities.Model;
using Punnel.EmailServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public partial class IntegrationRepository
    {
        public Integration Autopilot_Auth(string apiKey, string userId)
        {
            Integration result = new Integration();
            AutopilotTask task = new AutopilotTask(apiKey);
            var res = task.Auth();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var resultAuth = (AccountResponse)res.Data;
                //save info
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.Autopilot,
                    AccId = resultAuth.businessName,
                    Email = resultAuth.email,
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

        public List<AutopilotCampainItemResponse> Autopilot_GetCampains(string userId, string accId)
        {
            List<AutopilotCampainItemResponse> result = new List<AutopilotCampainItemResponse>();

            var apiSite = _dbSet.AsNoTracking().FirstOrDefault(x => x.UserId == userId && x.AccId == accId);
            if (apiSite == null)
            {
                return result;
            }
            string apiKey = apiSite.ApiKey;

            AutopilotTask task = new AutopilotTask(apiKey);
            var res = task.GetCampaigns();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                result = (List<AutopilotCampainItemResponse>)res.Data;
            }
            else
            {
                throw new BusinessException(res.Message);
            }
            return result;
        }

        public void Autopilot_AddContact()
        {
            var res_at = new IntegrationServices.Autopilot.AutopilotTask("d3f0a324aba44613959f5937f6b0c935").AddContact(new Entities.Integration.Autopilot.ContactRequest
            {
                contact = new Entities.Integration.Autopilot.ContactModelRequest()
                {
                    Email = "hi@punnel.com",
                    FirstName = "Nguyen",
                    LastName = "Lam"
                }
            }, "1");
        }
    }
}
