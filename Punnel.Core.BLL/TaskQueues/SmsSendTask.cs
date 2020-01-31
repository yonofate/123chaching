using log4net;
using MBN.Utils;
using MBN.Utils.Tasks;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.BLL.Utils;
using Punnel.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Queue
{
    public class SmsSendTask : TaskBase, ITaskBase
    {
        private static readonly ILog _log = LogManager.GetLogger("SmsSendTask");
        private IUow _uow = null;
        private IUow uow
        {
            get { return _uow ?? (_uow = ObjectFactory.GetInstance<Uow>()); }
        }
        public SmsSendTask()
        {
            this.Intervals = WebUtils.AppSettings("SmsSendTask_Intervals", 120) * 1000;
        }

        public override void Execute()
        {
            try
            {
                var users = uow.UserProfile.GetUserToSendSMS((int)SMSType.New);
                foreach (var item in users)
                {
                    try
                    {
                        uow.UserProfile.SendSms((int)SMSType.CS1, item.Id);
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
