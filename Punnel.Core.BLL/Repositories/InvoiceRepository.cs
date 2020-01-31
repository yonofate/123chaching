using log4net;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class InvoiceRepository : BaseRepository<Invoice>, IInvoiceRepository
    {
        public InvoiceRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(InvoiceRepository));

        public void IU(Invoice obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.Id== obj.Id);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {               
                m.Status = obj.Status;
            }
            this.Commit();
            this.RemoveCache(obj.Id);
        }

        public async Task<Tuple<List<InvoiceViewModel>, int>> Search(InvoiceQuery req)
        {
            return await (_dbContext as Model.PunnelContext).msp_Invoice_Search(req);
        }
        public async Task<InvoiceOrderViewModel> GetForPayment(string code, string userId)
        {
            var res= await (_dbContext as Model.PunnelContext).msp_Invoice_GetByCode(code);
            if (res == null) throw new BusinessException("Không tìm thấy thông tin đơn hàng: " + code);
            if(res.UserId!= userId) throw new BusinessException("Bạn không thể thanh toán phí mua gói dịch vụ của người khác");
            if (res.Status == (int)InvoiceStatus.Paid) throw new BusinessException("Gói mua dịch vụ này đã được thanh toán");
            if (res.Status != (int)InvoiceStatus.WaitToPay) throw new BusinessException("Gói mua dịch vụ này đã bị hủy");
            return res;
        }
        public async Task CreateOrder(CreateOrderModel data, string userId)
        {
            List<int> months = new List<int>() { 3, 6, 12 };
            decimal discountAmount = 0;
            var service = uow.Service.Get(data.ServiceId);
            if (service == null) throw new BusinessException("Gói dịch vụ này không tồn tại hoặc đã ngưng sử dụng");
            if (!months.Any(x=>x==data.TimeId)) throw new BusinessException("Thời hạn gói dịch vụ không hợp lệ");
            double t = data.TimeId == 12 ? 0.75 : data.TimeId == 6 ? 0.85 : 1;
            decimal amount = service.Price * data.TimeId * (decimal)t;
            if (string.IsNullOrEmpty(data.PromotionCode) == false)
            {
                var pr = await uow.PromotionCode.UseByCode(data.ServiceId,data.PromotionCode);
                if (pr != null)
                {
                    discountAmount = pr.IsDiscountPercent ? amount * pr.Discount / 100 : pr.Discount; 
                }
            }
            decimal totalAmount = amount - discountAmount;
            var order = new Invoice()
            {
                UserId = userId,
                Code = data.Code,
                Amount = amount,
                Discount = discountAmount,
                TotalAmount = totalAmount,
                ServiceId = service.Id,
                Quantity = data.TimeId,
                Price = service.Price,
                Status = 0,
                OrderDate= DateTime.Now
            };
            this.Add(order);
            new Services.FacebookService().SendToCS($"Punnel có 1 thanh toán mới: {service.Name}, số tiền: {order.TotalAmount}");
            this.Commit();
        }
        public async Task PaidByCode(string code)
        {
            if (string.IsNullOrEmpty(code))
            {
                throw new BusinessException("Hóa đơn không hợp lệ");
            }
            var invoice = _dbSet.SingleOrDefault(x => x.Code == code && x.Deleted==false);
            if (invoice == null)
            {
                throw new BusinessException("Hóa đơn không tồn tại trong hệ thống");
            }
            if (invoice.Status!= (int)InvoiceStatus.WaitToPay)
            {
                throw new BusinessException("Hóa đơn không thể thực hiện thanh toán vì đã thanh toán rồi");
            }

            var user = uow.UserProfile.Get(invoice.UserId);
            if(user== null) throw new BusinessException("Tài khoản thanh toán không tồn tại");

            invoice.Status = (int)InvoiceStatus.Paid;
            invoice.PaymentDate = DateTime.Now;
            await this.CommitAsync();

            //Upgrade user_profile
            await uow.UserProfile.Upgrade(new ProfileUpgradeModel()
            {
                Id = invoice.UserId,
                Level = invoice.ServiceId,
                Month = invoice.Quantity
            });

            //Xác đinh loại user: Hot
            await uow.UserProfile.SetUserStatusNote(invoice.UserId, LeadStatus.Hot, "Paid");

            //Send email notify
            DateTime expDate = (user.ExpiredDate ?? DateTime.Now).AddMonths(invoice.Quantity);
            new Utils.EmailUtils(new Entities.Integration.Gmail.EmailToModel()
            {
                AvatarUrl = user.Avatar,
                FullName = Utils.CommonUtils.GetLastWordOfString(user.FullName),
                Email = user.Email
            }).SendUpgradeSuccess(GetServiceName(invoice.ServiceId),invoice.Quantity, expDate);
        }
        
        public virtual List<Invoice> GetAllByUser(string userId)
        {
            return _dbSet.AsNoTracking().Where(x => x.Deleted==false && x.UserId== userId).ToList();
        }

        public virtual List<Invoice> GetAllByStatus(int status, string userId)
        {
            return _dbSet.AsNoTracking().Where(x => x.Deleted == false && x.UserId == userId && x.Status== status).ToList();
        }

        public async Task DeleteByCode(string code)
        {
            var col = _dbSet.FirstOrDefault(x => x.Code == code);
            if (col == null) throw new Exception("not found");
            _dbSet.Remove(col);
            await this.CommitAsync();
        }

        string GetServiceName(int id)
        {
            ProfileLevel enumDisplayStatus = (ProfileLevel)id;
            return enumDisplayStatus.ToString();
        }

    }
}
