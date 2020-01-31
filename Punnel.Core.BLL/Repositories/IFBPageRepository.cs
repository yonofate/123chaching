using System;
using System.Collections.Generic;
using Punnel.Core.Entities.Model;

namespace Punnel.Core.BLL.Repositories
{
    public interface IFBPageRepository: IBaseRepository<FBPage>
    {
        List<FBPage> GetByUser(string userId);
        List<FBPage> GetByFbId(long fbId);
        void IU(FBPage obj, string type);
    }
}