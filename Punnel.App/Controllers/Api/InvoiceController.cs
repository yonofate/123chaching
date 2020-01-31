using Punnel.App.Controllers;
using Punnel.Core.BLL.Repositories;
using Punnel.Core.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Punnel.Core.BLL;
using System.Threading.Tasks;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using Punnel.Core.BLL.Services;
using log4net;

namespace Punnel.App.Controllers
{
    [Authorize]
    [RoutePrefix("api/invoice")]
    public class InvoiceController : BaseApiController
    {
        // GET: api/Cate
        private static readonly ILog _log = LogManager.GetLogger("InvoiceController");
        public InvoiceController(IUow uow) : base(uow) { }

        #region Admin Manage
        [Route("list")]
        [CompressContent]
        [Authorize(Roles ="admin")]
        public async Task<IHttpActionResult> Search(InvoiceQuery data)
        {
            try
            {
                var res = await _uow.Invoice.Search(data);
                return Ok(new { data = res.Item1, total = res.Item2 });
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [Route("paid")]
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> Paid(InvoiceRequest data)
        {
            try
            {
                await _uow.Invoice.PaidByCode(data.Code);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [HttpDelete]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> Delete(string code)
        {
            try
            {
                await _uow.Invoice.DeleteByCode(code);
                return Ok();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        #endregion

        [Route("payment")]
        [CompressContent]
        public async Task<IHttpActionResult> GetForPayment(string code)
        {
            try
            {
                var res= await _uow.Invoice.GetForPayment(code, this.CurrentUserId);
                return Ok(res);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [Route("order")]
        public async Task<IHttpActionResult> CreateOrderInvoice(CreateOrderModel data)
        {
            try
            {
                data.Code= DateTime.Now.GetHashCode().ToString("x");
                await _uow.Invoice.CreateOrder(data, this.CurrentUserId);
                return Ok(data.Code);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        [Route("payment-gate")]
        public async Task<IHttpActionResult> UpdatePaymentGate(InvoiceOrderViewModel data)
        {
            try
            {
                if (data.PaymentType == null)
                {
                    return BadRequest(this.General_Err);
                }

                var order = await _uow.Invoice.GetForPayment(data.Code, this.CurrentUserId);
                if(order==null) return BadRequest(this.General_Err);

                if (data.PaymentType==(int)PaymentType.ATM || data.PaymentType == (int)PaymentType.CreditCard)
                {
                    order.IsCreditCard = (data.PaymentType == (int)PaymentType.CreditCard);
                    var res = PaymentWithZaloPay(order);
                    return Ok(res);
                }
                else if(data.PaymentType== (int)PaymentType.QRCode)
                {
                    var res = PaymentWithZaloPayQR(order);
                    return Ok(res);
                }
                return BadRequest(this.General_Err);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                return BadRequest(this.General_Err);
            }
        }

        #region ZaloPay Utils
        private string PaymentWithZaloPay(InvoiceOrderViewModel order)
        {
            try
            {
                string clientIP = this.ClientIP;

                string desc = "Gói " + order.ServiceName + " - Số tiền: " + ((long)order.Amount).ToString();
                string appTransId = $"{DateTime.Now.ToString("yyMMddHHmmss")}-{order.Code}";
                string bankCode = order.IsCreditCard ? "CC" : "";
                string phone = "";

                var resp = new ZalopayPaygateService().CreateOrderURL(order.UserId, (long)order.Amount, appTransId, bankCode, desc, phone);

                if (resp != null)
                {
                    _uow.ZaloPayTransaction.IU(new Core.Entities.Model.ZaloPayTransaction
                    {
                        InvoiceId = order.Id,
                        UserId = order.UserId,
                        InvoiceCode = order.Code,
                        Amount = order.Amount,
                        AppTransId = appTransId,
                        TransDesc = desc,
                        BankCode = bankCode,
                        PayGateTransId = string.Empty,
                        PayGateChannel = 0,
                        IsCreditCard = order.IsCreditCard,
                        ClientIP = clientIP
                    });
                }

                return resp;
            }catch(Exception ex)
            {
                _log.Error(ex);
                return null; 
            }
        }

        private Dictionary<string, object> PaymentWithZaloPayQR(InvoiceOrderViewModel order)
        {
            try
            {
                string clientIP = this.ClientIP;
                string desc = string.Format("Mua dịch vụ {0} - Số tiền {1}", order.ServiceName, order.Amount);

                string appTransId = $"{DateTime.Now.ToString("yyMMddHHmmss")}-{order.Code}";
                string bankCode = "QRCode";

                var res = new ZalopayPaygateService().CreateOrderQR("", (long)order.Amount, appTransId, "{}", order.ServiceName, desc);

                if (res != null)
                {
                    _uow.ZaloPayTransaction.IU(new Core.Entities.Model.ZaloPayTransaction
                    {
                        InvoiceId = order.Id,
                        UserId = order.UserId,
                        InvoiceCode = order.Code,
                        Amount = order.Amount,
                        AppTransId = appTransId,
                        TransDesc = desc,
                        BankCode = bankCode,
                        PayGateTransId = string.Empty,
                        PayGateChannel = 0,
                        IsCreditCard = false,
                        ClientIP = clientIP
                    });
                }
                res.Add("appTransId", appTransId);
                return res;
            }catch(Exception ex)
            {
                _log.Error(ex);
                return null;
            }
        }
        #endregion
    }
}
