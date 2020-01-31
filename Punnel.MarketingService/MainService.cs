using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.QueueService
{
    partial class MainService : ServiceBase
    {
        private List<IScheduler> schedulers = null;

        public MainService()
        {
            InitializeComponent();

            schedulers = new List<IScheduler>();
            schedulers.Add(new TaskScheduler());
        }

        protected override void OnStart(string[] args)
        {
            this.StartMonitor();
        }

        public void StartMonitor()
        {
            foreach (IScheduler item in schedulers)
            {
                item.Start();
            }
        }

        public void StopMonitor()
        {
            foreach (IScheduler item in schedulers)
            {
                item.Stop();
            }
        }

        protected override void OnStop()
        {
            this.StopMonitor();
        }
    }
}
