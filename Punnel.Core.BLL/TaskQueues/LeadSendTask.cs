using log4net;
using MBN.Utils;
using MBN.Utils.Tasks;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Queue
{
    public class LeadSendTask : TaskBase, ITaskBase
    {
        private static readonly ILog _log = LogManager.GetLogger("LeadSendTask");
        private IUow _uow = null;
        private IUow uow
        {
            get { return _uow ?? (_uow = ObjectFactory.GetInstance<Uow>()); }
        }
        public LeadSendTask()
        {
            this.Intervals = WebUtils.AppSettings("LeadSendTask_Intervals", 60) * 1000;
        }

        public override void Execute()
        {
            try
            {
                var leads = uow.Lead.GetLeadsToSendIntegration();
                foreach (var item in leads)
                {
                    try
                    {
                        var res = uow.Lead.SendViaApi(item);
                        if (res.Code == System.Net.HttpStatusCode.Unauthorized)
                        {
                            //uow.Integration.Delete(item.IntegrationId, Conts.Cpanel_user);
                        }
                        uow.IntegrationLeadSend.IU(new Entities.Model.IntegrationLeadSend()
                        {
                            LeadId = item.LeadId,
                            IntegrationId = item.IntegrationId,
                            ListId = item.ListId,
                            ResponseMsg = res.Message,
                            Status = res.Code == System.Net.HttpStatusCode.OK ? (int)LeadSendStatus.Success : (int)LeadSendStatus.Failed,
                            LastSendDate = DateTime.Now
                        });
                    }
                    catch (Exception ex)
                    {
                        _log.Error(ex);
                    }
                }
            }catch(Exception ex)
            {
                _log.Error(ex);
            }
        }
    }
}
