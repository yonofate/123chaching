using System;
using System.Windows.Forms;
using Punnel.Core.BLL.Queue;

namespace Punnel.QueueService
{
    public partial class FMain : Form
    {
        private MainService objService;
        public FMain()
        {
            InitializeComponent();
            objService = new MainService();
            //Test();
        }
        private void Test()
        {
            LeadSendTask task = new LeadSendTask();
            task.Execute();
        }

        private void SetState(bool start)
        {
            cmdStart.Enabled = !start;
            cmdStop.Enabled = start;
            cmdClose.Enabled = !start;
        }

        private void cmdStart_Click(object sender, EventArgs e)
        {
            this.SetState(true);
            objService.StartMonitor();
        }

        private void cmdStop_Click(object sender, EventArgs e)
        {
            objService.StopMonitor();
            this.SetState(false);
        }

        private void cmdClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
    
}
