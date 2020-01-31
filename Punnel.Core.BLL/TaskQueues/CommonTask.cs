using log4net;
using MBN.Utils;
using MBN.Utils.Tasks;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Queue
{
    public class CommonTask : TaskBase, ITaskBase
    {
        private static readonly ILog _log = LogManager.GetLogger("CommonTask");
        private IUow _uow = null;
        private IUow uow
        {
            get { return _uow ?? (_uow = ObjectFactory.GetInstance<Uow>()); }
        }
        public CommonTask()
        {
            this.Intervals = WebUtils.AppSettings("CommonTask_Intervals", 120) * 1000;
        }

        public override void Execute()
        {
            try
            {
                var items = uow.TaskQueue.GetToExecute();
                foreach (var item in items)
                {
                    try
                    {
                        ProcessTask(item);
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

        void ProcessTask(TaskQueue item)
        {
            switch (item.Type)
            {
                case (int)TaskQueueType.UpdatePageContent:
                    uow.TaskQueue.ExecuteTask(item);
                    uow.LandingPage.RemovePageCache(Guid.Parse(item.Data));
                    break;
            }
        }
    }
}
