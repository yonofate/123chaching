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
    public class LeadGetMoreInfoTask : TaskBase, ITaskBase
    {
        private static readonly ILog _log = LogManager.GetLogger("LeadGetMoreInfoTask");
        private IUow _uow = null;
        private IUow uow
        {
            get { return _uow ?? (_uow = ObjectFactory.GetInstance<Uow>()); }
        }
        public LeadGetMoreInfoTask()
        {
            this.Intervals = WebUtils.AppSettings("LeadSendTask_Intervals", 60) * 1000;
        }

        public override void Execute()
        {
            try
            {
                var leads = uow.Lead.LeadToGetMoreInfo();
                foreach (var item in leads)
                {
                    try
                    {
                        uow.Lead.GetMoreInfo(item.LeadId);
                        uow.Lead.GetRefererInfo(item.LeadId);
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
