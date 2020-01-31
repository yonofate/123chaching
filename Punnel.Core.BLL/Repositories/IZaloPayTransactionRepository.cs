using Punnel.Core.Entities.Model;

namespace Punnel.Core.BLL.Repositories
{
    public interface IZaloPayTransactionRepository: IBaseRepository<ZaloPayTransaction>
    {
        ZaloPayTransaction GetByAppTransId(string appTransId);
        ZaloPayStatus GetStatusById(int statusId);
        bool IsPaid(string userId, string appTransId);
        void IU(ZaloPayTransaction obj);
    }
}