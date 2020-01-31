using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IInvoiceRepository: IBaseRepository<Invoice>
    {
        Task<Tuple<List<InvoiceViewModel>, int>> Search(InvoiceQuery req);
        List<Invoice> GetAllByStatus(int status, string userId);
        List<Invoice> GetAllByUser(string userId);
        void IU(Invoice obj);
        Task CreateOrder(CreateOrderModel data, string userId);
        Task<InvoiceOrderViewModel> GetForPayment(string code, string userId);
        Task PaidByCode(string code);
        Task DeleteByCode(string code);
    }
}