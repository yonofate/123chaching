using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface ITicketRepository
    {
        void Delete(int id, string userId);
        void IU(Ticket obj);
        Task<Tuple<List<TicketViewModel>, int>> Search(TicketSearchRequest data);
    }
}