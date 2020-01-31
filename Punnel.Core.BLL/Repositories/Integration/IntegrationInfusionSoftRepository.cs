using IntegrationServices.ActiveCampain;
using IntegrationServices.InfusionSoft;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.ActiveCampain;
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
        public Integration InfusionSoft_Auth(string code, string userId)
        {
            Integration result = new Integration();
            var res = new InfusionSoftTask().Auth(code);
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var resultAuth = (InfusionSoftTokenRes)res.Data;
                //save info
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.InfusionSoft,
                    AccId = resultAuth.scope,
                    Email = resultAuth.scope.Replace("|",""),
                    ApiKey = resultAuth.access_token,
                    Password= resultAuth.refresh_token,
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

        public List<InfusionSoftTag> InfusionSoft_Auth_GetCampains(string userId, string accId)
        {
            List<InfusionSoftTag> result = new List<InfusionSoftTag>();

            var apiSite = _dbSet.AsNoTracking().FirstOrDefault(x => x.UserId == userId && x.AccId == accId);
            if (apiSite == null)
            {
                return result;
            }
            string apiKey = apiSite.ApiKey;

            InfusionSoftTask task = new InfusionSoftTask(apiKey);
            var res = task.GetCampaigns();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                result = (List<InfusionSoftTag>)res.Data;
            }
            else if (res.Code == System.Net.HttpStatusCode.Unauthorized)
            {
                var newToken = new InfusionSoftTask(apiKey, apiSite.Password).Refresh();
                if (newToken != null && !string.IsNullOrEmpty(newToken.access_token))
                {
                    apiSite.ApiKey = newToken.access_token;
                    this.Commit();
                    InfusionSoft_Auth_GetCampains(userId, accId);
                }
            }
            else
            {
                throw new BusinessException(res.Message);
            }
            return result;
        }

        public void AddContact()
        {
            var emailadd = new List<Entities.Integration.InfusionSoft.EmailAddress>();
            emailadd.Add(new Entities.Integration.InfusionSoft.EmailAddress() { email = "nam@punnel.com", field = "EMAIL1" });
            var phoneadd = new List<Entities.Integration.InfusionSoft.PhoneNumber>();
            phoneadd.Add(new Entities.Integration.InfusionSoft.PhoneNumber() { number = "0909890910", field = "PHONE1" });
            var res2 = new IntegrationServices.InfusionSoft.InfusionSoftTask("4ecdp3rfushp6gqj8zfp3zr7").AddContact(new Entities.Integration.InfusionSoft.ContactRequest()
            {
                email_addresses = emailadd,
                phone_numbers = phoneadd,
                family_name = "Xuân" + " " + "nam"
            }, "1");
        }
    }
}
