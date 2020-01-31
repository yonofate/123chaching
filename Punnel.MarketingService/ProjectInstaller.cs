using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration.Install;
using System.Linq;
using System.Threading.Tasks;

namespace Punnel.QueueService
{
    [RunInstaller(true)]
    public partial class ProjectInstaller : System.Configuration.Install.Installer
    {
        public ProjectInstaller()
        {
            InitializeComponent();
        }

        private void ProjectInstaller_BeforeInstall(object sender, InstallEventArgs e)
        {
            this.SetServiceName();
        }

        private void ProjectInstaller_BeforeUninstall(object sender, InstallEventArgs e)
        {
            this.SetServiceName();
        }

        private void SetServiceName()
        {
            if (Context.Parameters.ContainsKey("ServiceName"))
            {
                serviceInstaller1.ServiceName = Context.Parameters["ServiceName"];
                serviceInstaller1.DisplayName = serviceInstaller1.ServiceName;
            }
        }
    }
}
