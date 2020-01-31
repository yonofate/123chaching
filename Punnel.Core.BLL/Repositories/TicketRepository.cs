using log4net;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class TicketRepository : BaseRepository<Ticket>, ITicketRepository
    {
        public TicketRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(TicketRepository));
        /// <summary>
        /// Them, cap nhat User
        /// </summary>
        /// <param name="obj"></param>
        public void IU(Ticket obj)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == obj.Id);
            if (m == null)
            {
                this.Add(obj);
                new Services.FacebookService().SendToCS($"Punnel có 1 ticket mới: {obj.Subject}, liên hệ sđt: {obj.Mobile}");
            }
            else
            {
                m.Note = obj.Note;
                m.Status = obj.Status;
            }
            this.Commit();
        }

        public async Task<Tuple<List<TicketViewModel>,int>> Search(TicketSearchRequest data)
        {
            return await (_dbContext as Model.PunnelContext).msp_Ticket_Search(data);
        }

        public virtual void Delete(int id, string userId)
        {
            var col = _dbSet.FirstOrDefault(x => x.Id == id);
            if (col == null) throw new Exception("not found");
            this.Delete(id);
            this.Commit();
        }
    }
}
