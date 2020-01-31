using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Model
{
    [Serializable]
    public class ZaloPayStatus
    {
        public int StatusId { get; set; }
        public string Name { get; set; }
        public bool Done { get; set; }
    }

    [Serializable]
    public class ZaloPayTransaction: BaseEntity
    {
        [Key]
        public int TransId { get; set; }

        public string UserId { get; set; }

        public int InvoiceId { get; set; }

        /// <summary>
        /// Mã hóa đơn
        /// </summary>
        public string InvoiceCode { get; set; }

        /// <summary>
        /// Tổng tiền
        /// </summary>
        public decimal Amount { get; set; }

        /// <summary>
        /// Mã giao dịch app
        /// </summary>
        public string AppTransId { get; set; }

        /// <summary>
        /// Nội dung giao dịch
        /// </summary>
        public string TransDesc { get; set; }
        /// <summary>
        /// Mã ngân hàng
        /// </summary>
        public string BankCode { get; set; }

        /// <summary>
        /// Mã giao dịch của cổng thanh toán
        /// </summary>
        public string PayGateTransId { get; set; }

        /// <summary>
        /// Trạng thái giao dịch
        /// </summary>
        public int PayGateStatus { get; set; }

        /// <summary>
        /// Ticket từ cổng thanh toán cho giao dịch
        /// </summary>
        public string PayGateTicket { get; set; }

        /// <summary>
        /// Kênh thanh toán: ATM, Credit , QR
        /// </summary>
        public int PayGateChannel { get; set; }

        /// <summary>
        /// Thời gian giao dịch thành công
        /// </summary>
        public DateTime? PayGateTime { get; set; }

        /// <summary>
        /// Thời gian nhận được phản hồi từ cổng thanh toán
        /// </summary>
        public DateTime? PayGateResponse { get; set; }

        /// <summary>
        /// Địa chỉ ip của giao dịch
        /// </summary>
        public string ClientIP { get; set; }

        /// <summary>
        /// Trạng thái
        /// NEW/PAID/CANCEL/ERROR
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// Đánh dấu các giao dịch bằng thẻ thanh toán quốc tế
        /// </summary>
        public bool IsCreditCard { get; set; }

        /// <summary>
        /// Thanh toán thành công
        /// </summary>
        public bool IsPaid { get; set; }

        /// <summary>
        /// Cờ đánh dấu giao dịch hoàn tất (1,-10,-100)
        /// </summary>
        public bool IsDone { get; set; }

        /// <summary>
        /// Cờ đánh dấu đã xử lý các quy trình tiếp theo sau khi có Response từ cổng thanh toán
        /// </summary>
        public bool IsProcessed { get; set; }

        /// <summary>
        /// Nội dung lỗi
        /// </summary>
        public string ErrorMsg { get; set; }

        /// <summary>
        /// Ngày kiểm tra thanh toán
        /// </summary>
        public DateTime NextProcess { get; set; }


        /// <summary>
        /// Thanh toán thành công
        /// </summary>
        /// <returns></returns>
        public bool Success()
        {
            return this.PayGateStatus == 1;
        }

        /// <summary>
        /// Xác nhận thanh toán
        /// </summary>
        public void SetPaid()
        {
            this.Status = "PAID";
            this.IsPaid = true;
            this.IsDone = true;
        }


        public ZaloPayTransaction()
        {
            IsCreditCard = false;
            IsPaid = IsDone = IsProcessed = false;
            Status = "NEW";
            PayGateTicket = ErrorMsg = string.Empty;
            PayGateStatus = 0; //new
        }

        /// <summary>
        /// Giao dịch bị người dùng hủy bỏ
        /// </summary>
        public bool IsCancel()
        {
            return Status == "CANCEL";
        }

        /// <summary>
        /// Giao dịch có lỗi xảy ra
        /// </summary>
        public bool IsError()
        {
            return Status == "ERROR";
        }

        public bool IsStatusPaid()
        {
            return this.PayGateStatus == 1;
        }

    }
}
