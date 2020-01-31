using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.RequestModel
{
    public class ZaloPayCallBackReq
    {
        public string data { get; set; }
        public string mac { get; set; }
    }

	public class ZaloPayResponse
	{
		public int AppId { get; set; }
		public string AppTransId { get; set; }
		public long AppTime { get; set; }
		public string AppUser { get; set; }
		public long Amount { get; set; }
		public string EmbedData { get; set; }
		public string Item { get; set; }
		public long ZPTransId { get; set; }
		public long ServerTime { get; set; }
		public int Channel { get; set; }
		public string MerchantUserId { get; set; }
		public long UserFeeAmount { get; set; }
		public long DiscountAmount { get; set; }
		public string BankCode { get; set; }
		public bool Success { get; set; }
	}

	public class ZalopayQueryOrderResponse
	{
		/// <summary>
		/// Mã trạng thái đơn hàng
		/// </summary>
		public int ReturnCode { get; set; }
		/// <summary>
		/// Thông tin trạng thái đơn hàng
		/// </summary>
		public string ReturnMessage { get; set; }
		/// <summary>
		/// true: giao dịch đang xử lý, false: giao dịch đã kết thúc xử lý
		/// </summary>
		public bool IsProcessing { get; set; }
		public long Amount { get; set; }
		public long ZPTransid { get; set; }

		public int GetPayGateStatus()
		{
			int res = 0;
			string msg = "";
			if (ReturnCode == 1)
			{
				res = 1;
				msg = "Payment Success";
			}
			else if (ReturnCode > 1)
			{
				if (this.IsProcessing == true)
				{
					res = 0;
					msg = "Payment Processing";
				}
				else
				{
					res = 2;
					msg = "Payment Fail";
				}
			}
			else
			{
				if (ReturnCode == -16 || ReturnCode == -17)//Paid, delivery service to customer
				{
					res = 1;
					msg = "Payment Success";
				}
				else if (ReturnCode == -117)
				{
					res = 0;
					msg = "Payment Processing";
				}
				else if (ReturnCode == -49)
				{
					res = 3;
					msg = "Waiting payment";
				}
				else
				{
					res = 2;
					msg = "Payment Fail";
				}
			}

			return res;
		}
	}
}
