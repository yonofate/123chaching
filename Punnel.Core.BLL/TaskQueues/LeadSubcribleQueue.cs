using log4net;
using MBN.Utils;
using MBN.Utils.Tasks;
using MBN.Utils.TaskScheduler;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.ViewModel;
using System;

namespace Punnel.Core.BLL.Queue
{
    public class LeadSubcribleQueue : BackgroundQueueBase, IBackgroundQueue
    {
        private static readonly ILog _log = LogManager.GetLogger("LeadSubcribleQueue");
        private IUow _uow = null;
        private IUow uow
        {
            get { return _uow ?? (_uow = ObjectFactory.GetInstance<Uow>()); }
        }

        int _leadId;
        public LeadSubcribleQueue(int leadId)
        {
            _leadId = leadId;
        }

        public override void Execute()
        {
            //if (this.IsWaiting(true)) return;


            try
            {
                //uow.Lead.GetMoreInfo(_leadId);
                //uow.Lead.GetRefererInfo(_leadId);
                uow.Lead.IntegrationInfo(_leadId);
                uow.Lead.SendNotifyEmail(_leadId);             
                return; // success
            }
            catch (Exception ex)
            {
                _log.Error(ex);
            }

            if (this.TryEnQueue(30) == false)
            {
                _log.Error("Retry queue error");
            }
        }
    }
}
