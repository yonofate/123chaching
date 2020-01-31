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
    public class TrackIPInfoTask : TaskBase, ITaskBase
    {
        private static readonly ILog _log = LogManager.GetLogger("TrackIPInfoTask");
        private IUow _uow = null;
        int _infoStatus = 0;
        private IUow uow
        {
            get { return _uow ?? (_uow = ObjectFactory.GetInstance<Uow>()); }
        }
        public TrackIPInfoTask()
        {
            this.Intervals = WebUtils.AppSettings("TrackIPInfoTask_Intervals", 120) * 1000;
            _infoStatus = WebUtils.AppSettings("TrackIPInfoTask_InfoStatus", 0);
        }

        public override void Execute()
        {
            try
            {
                var ips = uow.PunnelTracking.GetNewUserIp(_infoStatus);
                foreach (var item in ips)
                {
                    try
                    {
                        uow.PunnelTracking.AddIpInfo(item);
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
