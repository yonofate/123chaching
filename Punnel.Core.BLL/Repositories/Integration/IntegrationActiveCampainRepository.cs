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
        public Integration ActiveCampain_Auth(string url, string apiKey, string userId)
        {
            Integration result = new Integration();
            ActiveCampainTask task = new ActiveCampainTask(url, apiKey);
            var res = task.Auth();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var resultAuth = (AccountResponse)res.Data;
                //save info
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.ActiveCampain,
                    AccId = url,
                    Email = url.Replace("https://","").Replace("http://",""),
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

        public List<CampainItemResponse> ActiveCampain_GetCampains(string userId, string accId)
        {
            List<CampainItemResponse> result = new List<CampainItemResponse>();

            var apiSite = _dbSet.AsNoTracking().FirstOrDefault(x => x.UserId == userId && x.AccId == accId);
            if (apiSite == null)
            {
                return result;
            }
            string apiKey = apiSite.ApiKey;

            ActiveCampainTask task = new ActiveCampainTask(apiSite.AccId,apiKey);
            var res = task.GetCampaigns();
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                result = (List<CampainItemResponse>)res.Data;
            }
            else
            {
                throw new BusinessException(res.Message);
            }
            return result;
        }

        public void ActiveCampain_AddContact()
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

            var res_at = new IntegrationServices.ActiveCampain.ActiveCampainTask("https://yonofate.api-us1.com", "2c894518a67dc36c9227161a6fcc9ba062397ea29f7b2048705680372f03a2243d4df69b").AddContact(new Entities.Integration.ActiveCampain.ContactRequest
            {
                contact = new Entities.Integration.ActiveCampain.ContactModelRequest()
                {
                    email = "hi@punnel.com",
                    phone = "0989890987",
                    firstName = "Nguyen",
                    lastName = "Lam"
                }
            }, "1");
        }
    }
}
