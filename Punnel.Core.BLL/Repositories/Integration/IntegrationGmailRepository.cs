using IntegrationServices.ActiveCampain;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.ActiveCampain;
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
        public Integration Gmail_Auth(string userId,string email="",string accId="")
        {
            Integration result = new Integration();
            GmailPersonalSvc task = new GmailPersonalSvc(accId);
            var res = task.Auth();
            if (res.Code==System.Net.HttpStatusCode.OK)
            {
                var token_json = res.Data.ToString();
                //save info
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.Gmail,
                    AccId = email,
                    Email = email,
                    ApiKey = accId,
                    UserId = userId,                   
                    LastConnectedDate = DateTime.Now,
                    TokenJson= token_json
                };
                IU(info, userId);
                result = info;
            }
            else
            {
                throw new BusinessException("Không thể kết nối Gmail");
            }
            return result;
        }

        public void Gmail_SendMail(string userId, string accId)
        {
            var apiSite = _dbSet.AsNoTracking().FirstOrDefault(x => x.UserId == userId && x.AccId == accId);
            if (apiSite == null)
            {
                return;
            }

            GmailPersonalSvc task = new GmailPersonalSvc(apiSite.ApiKey, apiSite.TokenJson);
            //var res = task.SendMail("test email gmail api", "chao lam, test thu xem sao nhe",new System.Net.Mail.MailAddress("lamktvn@gmail.com","Lam Nguyen"), new System.Net.Mail.MailAddress(apiSite.Email, "Hung Lam"));
            //if(res.Code!= System.Net.HttpStatusCode.OK)
            //{
            //    throw new BusinessException(res.Message);
            //}
        }
    }
}
