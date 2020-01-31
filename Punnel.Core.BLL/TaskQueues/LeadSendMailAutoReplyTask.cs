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
    public class LeadSendMailAutoReplyTask : TaskBase, ITaskBase
    {
        private static readonly ILog _log = LogManager.GetLogger("LeadSendMailAutoReplyTask");
        private IUow _uow = null;
        private IUow uow
        {
            get { return _uow ?? (_uow = ObjectFactory.GetInstance<Uow>()); }
        }
        public LeadSendMailAutoReplyTask()
        {
            this.Intervals = WebUtils.AppSettings("LeadSendTask_Intervals", 60) * 1000;
        }

        public override void Execute()
        {
            try
            {
                var leads = uow.Lead.GetLeadsToSendAutomation();
                foreach (var item in leads)
                {
                    _log.Warn(leads.Count);
                    try
                    {
                        var res = uow.Lead.SendAutomation(item);
                        uow.MailToSend.IU(new Entities.Model.MailToSend
                        {
                            TimeId= item.TimeId,
                            LeadId = item.LeadId,
                            TemplateId = item.TemplateId,
                            ResponseMsg = res.Message,
                            Status = res.Code == System.Net.HttpStatusCode.OK ? (int)LeadSendStatus.Success : (int)LeadSendStatus.Failed,
                            SendDate = DateTime.Now
                        });
                    }
                    catch (Exception ex)
                    {
                        _log.Error(ex.Message);
                    }
                }
            }catch(Exception ex)
            {
                _log.Error(ex.Message);
            }
        }
    }
}
