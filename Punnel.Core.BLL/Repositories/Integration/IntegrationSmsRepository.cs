using IntegrationServices.Ftp;
using Punnel.Core.BLL.Services;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using Punnel.EmailServices;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Punnel.Core.BLL.Repositories
{
    public partial class IntegrationRepository
    {
        public Integration Sms_Auth(string name,string sim1,string sim2,string pin, string userId)
        {
            Integration result = new Integration();
            SmsService svc = new SmsService();
            var id = Guid.NewGuid();
            var res= svc.AddDevice(name,sim1,sim2,pin);
            if (res.Code == System.Net.HttpStatusCode.OK)
            {
                var info = new Integration()
                {
                    Id = id,
                    SiteId = (int)IntegrationType.Sms,
                    AccId = sim1,
                    Email = $"{res.Data.ToString()} : {name} ({sim1} {sim2})".Trim(),
                    ApiKey = sim2,
                    Password = pin,
                    Phone=res.Data.ToString(),
                    UserId = userId,
                    LastConnectedDate = DateTime.Now
                };
                IU(info, userId);
                result = info;
            }
            else
            {
                throw new BusinessException("Không thể kết nối Sms Cloud. Vui lòng thử lại sau!");
            }
            return result;
        }
    }
}
