using System;
using System.Collections.Generic;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface ITemplateDefaultRepository
    {
        TemplateDefault GetByType(int type);
        void IU(TemplateDefault obj);
    }
}