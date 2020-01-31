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
    public class CrawlLadiPageTask : TaskBase, ITaskBase
    {
        private static readonly ILog _log = LogManager.GetLogger("CrawlLadiPageTask");
        private IUow _uow = null;
        private IUow uow
        {
            get { return _uow ?? (_uow = ObjectFactory.GetInstance<Uow>()); }
        }
        public CrawlLadiPageTask()
        {
            this.Intervals = WebUtils.AppSettings("LeadSendTask_Intervals", 60) * 1000000;
        }

        public override void Execute()
        {
            try
            {
                new Core.BLL.Proxy.CrawlLadiPageService().Execute();
            }
            catch(Exception ex)
            {
                _log.Error(ex);
            }
        }
    }
}
