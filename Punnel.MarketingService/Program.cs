using System;
using MBN.Utils;
using System.ServiceProcess;
using Punnel.Core.Entities;
using log4net;

namespace Punnel.QueueService
{
    static class Program
    {
        private static readonly ILog _log = LogManager.GetLogger(typeof(Program));
        static void Main(string[] arg)
        {
            log4net.Config.XmlConfigurator.Configure();           
            bool has_arg = false;
            string task = string.Empty;
            if (arg != null)
            {
                foreach(var item in arg)
                {
                    if (item == "/rsa")
                    {
                        has_arg = true;
                        MBN.Utils.Security.RSA.RSACreateKey(1024, "PUNNEL", true);
                    }
                    else if (item.StartsWith("/task:"))
                    {
                        string[] t = item.Split(':');
                        task = t[1];
                    }
                }
            }
            if (has_arg) return;

            WebLog.Log.Info("===== app start =====", "info.log");

            var culture = new System.Globalization.CultureInfo("vi-VN");
            System.Threading.Thread.CurrentThread.CurrentCulture = culture;
            System.Threading.Thread.CurrentThread.CurrentUICulture = culture;

#if DEBUG
            var container = IoC.Initialize();
#else
            var container = IoC.Initialize();
#endif
            // AntiXss
            //BLL.Utils.HtmlUtils.AntiXss_MarkAsSafe();


            if (string.IsNullOrEmpty(task) == false)
            {
                var t = ObjectFactory.GetInstance<MBN.Utils.Tasks.ITaskBase>(task);
                ((MBN.Utils.Tasks.TaskBase)t).Execute();
                return;
            }


            // LoadCache
            //new BLL.Queues.LoadCacheQueue().Execute();

            // Common Queue
            MBN.Utils.TaskScheduler.BackgroundQueue.Start();

            if (Environment.UserInteractive == false)
            {
                ServiceBase[] ServicesToRun;
                ServicesToRun = new ServiceBase[] { new MainService() };
                ServiceBase.Run(ServicesToRun);
            }
            else
            {
                try
                {
                    FMain frm = new FMain();
                    frm.ShowDialog();
                }
                catch (Exception ex)
                {
                    _log.ErrorFormat("Program.Main: {0}", ex.Message);
                }
            }
        }
    }
}
