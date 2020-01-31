
using System.Collections.Generic;
using MBN.Utils;
using MBN.Utils.Tasks;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;

namespace Punnel.QueueService
{
    public class TaskScheduler : IScheduler
    {
        private List<ITaskBase> tasks = null;

        public TaskScheduler()
        {
            IUow uow = ObjectFactory.GetInstance<IUow>();
            tasks = new List<ITaskBase>();

            string s = WebUtils.AppSettings("TaskScheduler_Tasks", string.Empty);
            if (string.IsNullOrEmpty(s) == false)
            {
                string[] items = s.Split(',', ';', '|');
                foreach (string item in items)
                {
                    ITaskBase q = ObjectFactory.GetInstance<ITaskBase>(item.Trim());
                    tasks.Add(q);
                }
            }
        }

        public void Start()
        {
            foreach (ITaskBase task in tasks)
            {
                task.Start();
            }
        }

        public void Stop()
        {
            foreach (ITaskBase task in tasks)
            {
                task.Stop();
            }
        }
    }
}
