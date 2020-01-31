using log4net;
using Punnel.Core.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class ZaloPayTransactionRepository : BaseRepository<ZaloPayTransaction>, IZaloPayTransactionRepository
    {
        public ZaloPayTransactionRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(ZaloPayTransactionRepository));

        public override ZaloPayTransaction Get(int id)
        {
            return _dbSet.AsNoTracking().FirstOrDefault(c => c.TransId == id);
        }

        /// <summary>
        /// Lấy thông tin chi tiết theo AppTransId - ZaloPay
        /// </summary>
        /// <param name="appTransId"></param>
        /// <returns></returns>
        public ZaloPayTransaction GetByAppTransId(string appTransId)
        {
            return _dbSet.AsNoTracking().FirstOrDefault(c => c.AppTransId == appTransId);
        }

        /// <summary>
        /// Kiểm tra giao dịch đã thanh toán
        /// quy.vu - 09:25 2018-08-14
        /// </summary>
        /// <param name="profileId"></param>
        /// <param name="appTransId"></param>
        /// <returns></returns>
        public bool IsPaid(string userId, string appTransId)
        {
            return _dbSet.AsNoTracking().Any(c => c.UserId == userId && c.AppTransId == appTransId && c.IsPaid == true);
        }

        /// <summary>
        /// Thêm mới , Cập nhật thông tin
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public void IU(ZaloPayTransaction obj)
        {
            if (obj.TransDesc == null) obj.TransDesc = string.Empty;
            ZaloPayTransaction m = _dbSet.FirstOrDefault(c => c.TransId == obj.TransId);
            if (m == null)
            {
                obj.NextProcess = DateTime.Now.AddYears(-1);
                this.Add(obj);
            }
            else
            {
                m.InvoiceId = obj.InvoiceId;
                m.InvoiceCode = obj.InvoiceCode;
                m.TransDesc = obj.TransDesc;
                m.BankCode = obj.BankCode;
                m.ClientIP = obj.ClientIP;
                m.Status = obj.Status;
                m.IsCreditCard = obj.IsCreditCard;
                m.IsPaid = obj.IsPaid;
                m.IsDone = obj.IsDone;
                m.IsProcessed = obj.IsProcessed;
                m.ErrorMsg = obj.ErrorMsg;
                m.PayGateResponse = obj.PayGateResponse;
                m.PayGateStatus = obj.PayGateStatus;
                m.PayGateTicket = obj.PayGateTicket;
                m.PayGateTime = obj.PayGateTime;
                m.PayGateTransId = obj.PayGateTransId;
            }
            this.Commit();
        }

        /// <summary>
        /// Lấy trạng thái thanh toán
        /// review: quy.vu - 10:33 2018-06-21
        /// </summary>
        /// <param name="statusId"></param>
        /// <returns></returns>
        public ZaloPayStatus GetStatusById(int statusId)
        {
            var res = L2qContext.ExecuteQuery<ZaloPayStatus>("[dbo].[msp_ZaloPayStatus_GetById] {0}", statusId).FirstOrDefault();
            return res;
        }

    }
}
