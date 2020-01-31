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
    public class CreateSysFileHostingTask : TaskBase, ITaskBase
    {
        private static readonly ILog _log = LogManager.GetLogger("CreateSysFileHostingTask");
        private IUow _uow = null;
        private IUow uow
        {
            get { return _uow ?? (_uow = ObjectFactory.GetInstance<Uow>()); }
        }
        public CreateSysFileHostingTask()
        {
            this.Intervals = WebUtils.AppSettings("CreateSysFileHostingTask_Intervals", 120) * 1000;
        }

        public override void Execute()
        {
            try
            {
                _log.Info("CreateSysFileHostingTask started");
                var pages = uow.PublishPage.GetForSysTracking();
                _log.InfoFormat("CreateSysFileHostingTask: {0}", pages.Count);
                foreach (var item in pages)
                {
                    try
                    {
                        uow.PublishPage.AddSysTracking(item);
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
