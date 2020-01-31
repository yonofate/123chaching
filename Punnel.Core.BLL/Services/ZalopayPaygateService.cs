using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using log4net;
using MBN.Utils;
using MBN.Utils.Extension;
using Newtonsoft.Json;
using Punnel.Core.Entities.RequestModel;
using RestSharp;

namespace Punnel.Core.BLL.Services
{
    public enum ZaloPayHMAC
    {
        HMACMD5,
        HMACSHA1,
        HMACSHA256,
        HMACSHA512
    }
    public class ZaloPayConfig
    {
        public string AppId { get; set; }
        public string Key1 { get; set; }
        public string Key2 { get; set; }
        public string CreateOrderUrl { get; set; }
        public string CreateOrderQR { get; set; }
        public string QueryOrderUrl { get; set; }
        public string GetBanksUrl { get; set; }
        public string ZaloPay_RedirectQR { get; set; }

        public Dictionary<string, string> ReturnCode { get; set; }

        public ZaloPayConfig()
        {
            AppId = WebUtils.AppSettings("ZaloPay_AppId", "207");
            Key1 = WebUtils.AppSettings("ZaloPay_Key1", "bzMuVjSPLQyyXSkfpWeTld7csEbdv3x6");
            Key2 = WebUtils.AppSettings("ZaloPay_Key2", "vzIgtn3y3fJ7ajS94A61ep3fDeNRVpwa");
            CreateOrderUrl = WebUtils.AppSettings("ZaloPay_CreateOrderUrl", "https://sbgateway.zalopay.vn/pay");
            QueryOrderUrl = WebUtils.AppSettings("ZaloPay_QueryOrderUrl", "https://sandbox.zalopay.com.vn/v001/tpe/getstatusbyapptransid");
            GetBanksUrl = WebUtils.AppSettings("ZaloPay_GetBanksUrl", "https://sbgateway.zalopay.vn/api/getlistmerchantbanks");
            CreateOrderQR = WebUtils.AppSettings("ZaloPay_CreateOrderQR", "https://sandbox.zalopay.com.vn/v001/tpe/createorder");
            ZaloPay_RedirectQR = WebUtils.AppSettings("ZaloPay_RedirectQR", "https://zalopay.com.vn/openapp/pay.html");

            ReturnCode = new Dictionary<string, string>() {
                {"23","Sai mật khẩu. Vui lòng nhập lại."},//RETRY_PIN
                {"19","Giao dịch vẫn đang được xử lý"},//ZPW_PURCHASE_SUCCESSFUL
                {"18","Giao dịch vẫn đang được xử lý"},//ATM_CHARGE_SUCCESSFUL
                {"17","Sai OTP. Vui lòng nhập lại."},//ATM_RETRY_OTP
                {"16","Sai Mã xác nhận. Vui lòng nhập lại"},//ATM_RETRY_CAPTCHA
                {"15","Giao dịch vẫn đang được xử lý"},//IN_GET_STATUS_ATM_QUEUE
                {"14","Giao dịch vẫn đang được xử lý"},//ATM_AUTHEN_PAYER_SUCCESS
                {"13","Giao dịch vẫn đang được xử lý"},//ATM_VERIFY_OTP_SUCCESS
                {"12","Giao dịch vẫn đang được xử lý"},//ATM_VERIFY_CARD_SUCCESSFUL
                {"10","Giao dịch vẫn đang được xử lý"},//INIT
                {"9","Giao dịch vẫn đang được xử lý"},//ATM_WAIT_FOR_CHARGE
                {"5","Giao dịch vẫn đang được xử lý"},//PROCESSING
                {"4","Giao dịch vẫn đang được xử lý"},//IN_NOTIFY_QUEUE
                {"3","Giao dịch vẫn đang được xử lý"},//CREATE_ORDER_SUCCESSFUL
                {"2","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//DUPLICATE
                {"1","Giao dịch thành công"},//SUCCESSFUL
                {"0","Hệ thống đang có lỗi, vui lòng quay lại sau."},//EXCEPTION
                {"-1","Hệ thống đang có lỗi, vui lòng quay lại sau."},//ZK_NODE_EXIST_EXCEPTION
                {"-2","Hệ thống đang có lỗi, vui lòng quay lại sau."},//APPID_INVALID
                {"-3","Hệ thống đang có lỗi, vui lòng quay lại sau."},//APP_NOT_AVAILABLE
                {"-4","Ứng dụng tạm thời không thể thanh toán. Vui lòng quay lại sau."},//APP_TIME_INVALID
                {"-5","Số tiền không hợp lệ."},//AMOUNT_INVALID
                {"-9","Kênh thanh toán không hỗ trợ hoặc đang bảo trì. Vui lòng chọn kênh khác."},//PMCID_INVALID
                {"-10","Kênh thanh toán không hỗ trợ hoặc đang bảo trì. Vui lòng chọn kênh khác."},//PMC_INACTIVE
                {"-13","Hệ thống đang có lỗi, vui lòng quay lại sau."},//GET_TRANSID_FAIL
                {"-14","Hệ thống đang có lỗi, vui lòng quay lại sau."},//SET_CACHE_FAIL
                {"-15","Hệ thống đang có lỗi, vui lòng quay lại sau."},//GET_CACHE_FAIL
                {"-16","Giao dịch thất bại. Vui lòng liên hệ Hotline 1900545436 để được hỗ trợ."},//UPDATE_RESULT_FAIL
                {"-17","Giao dịch thất bại. Vui lòng liên hệ Hotline 1900545436 để được hỗ trợ."},//EXCEED_MAX_NOTIFY
                {"-18","Hệ thống đang có lỗi, vui lòng quay lại sau."},//DEVICEID_NOT_MATCH
                {"-19","Hệ thống đang có lỗi, vui lòng quay lại sau."},//APPID_NOT_MATCH
                {"-20","Hệ thống đang có lỗi, vui lòng quay lại sau."},//PLATFORM_NOT_MATCH
                {"-21","Hệ thống đang có lỗi, vui lòng quay lại sau."},//PMC_FACTORY_NOT_FOUND
                {"-26","Hệ thống đang có lỗi, vui lòng quay lại sau."},//SDK_INVALID
                {"-29","Hệ thống đang có lỗi, vui lòng quay lại sau."},//ATM_CREATE_ORDER_DBG_FAIL
                {"-31","Thông tin thẻ không chính xác. Vui lòng thực hiện lại."},//CARD_INVALID
                {"-32","Hệ thống đang có lỗi, vui lòng quay lại sau."},//APP_INACTIVE
                {"-33","Ứng dụng đang bảo trì. Vui lòng quay lại sau."},//APP_MAINTENANCE
                {"-34","Kênh thanh toán đang bảo trì. Vui lòng chọn kênh khác."},//PMC_MAINTENANCE
                {"-35","Kênh thanh toán không hỗ trợ hoặc đang bảo trì. Vui lòng chọn kênh khác."},//PMC_NOT_AVAILABLE
                {"-36","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//OVER_LIMIT
                {"-39","Kênh thanh toán không hỗ trợ hoặc đang bảo trì. Vui lòng chọn kênh khác."},//NOT_FOUND_SMS_SERVICE_PHONE
                {"-40","Hệ thống đang có lỗi, vui lòng quay lại sau."},//MAX_RETRY_GET_DBG_STATUS
                {"-41","Ngân hàng chưa hỗ trợ hoặc đang bảo trì. Vui lòng chọn ngân hàng khác."},//ATM_CREATE_ORDER_FAIL
                {"-42","Chưa hỗ trợ ngân hàng đã chọn. Vui lòng chọn ngân hàng khác."},//ATM_BANK_INVALID
                {"-43","Ngân hàng đang bảo trì. Vui lòng chọn ngân hàng khác."},//ATM_BANK_MAINTENANCE
                {"-44","Thông tin thẻ không chính xác. Vui lòng thực hiện lại."},//ATM_VERIFY_CARD_FAIL
                {"-45","Sai OTP. Vui lòng thực hiện lại."},//ATM_MAX_RETRY_OTP_FAIL
                {"-46","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//ATM_QUERY_ORDER_FAIL
                {"-47","Ngân hàng chưa hỗ trợ hoặc đang bảo trì. Vui lòng chọn ngân hàng khác."},//ATM_BANK_SRC_INVALID
                {"-48","Giao dịch thất bại. Vui lòng liên hệ Hotline 1900545436 để được hỗ trợ."},//ATM_CHARGE_FAIL
                {"-49","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//TRANS_INFO_NOT_FOUND
                {"-50","Nhập sai Mã xác nhận quá số lần quy định."},//ATM_CAPTCHA_INVALID
                {"-51","Hệ thống đang có lỗi, vui lòng quay lại sau."},//ATM_COST_RATE_INVALID
                {"-52","Hệ thống đang có lỗi, vui lòng quay lại sau."},//ITEMS_INVALID
                {"-53","Hệ thống đang có lỗi, vui lòng quay lại sau."},//HMAC_INVALID
                {"-54","Giao dịch đã quá hạn, vui lòng thực hiện giao dịch khác."},//TIME_INVALID
                {"-55","Hệ thống đang có lỗi, vui lòng quay lại sau."},//CAL_NET_CHARGE_AMT_FAIL
                {"-56","Hệ thống đang có lỗi, vui lòng quay lại sau."},//ATM_VERIFY_OTP_FAIL
                {"-57","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//APP_USER_INVALID
                {"-58","Hệ thống đang có lỗi, vui lòng quay lại sau."},//ZPW_GETTRANSID_FAIL
                {"-59","Giao dịch thất bại. Vui lòng liên hệ Hotline 1900545436 để được hỗ trợ."},//ZPW_PURCHASE_FAIL
                {"-60","Thông tin tài khoản không chính xác. Vui lòng liên hệ Hotline 1900545436 để được hỗ trợ."},//ZPW_ACCOUNT_NAME_INVALID
                {"-61","Tài khoản tạm thời bị khóa."},//ZPW_ACCOUNT_SUSPENDED
                {"-62","Tài khoản không tồn tại."},//ZPW_ACCOUNT_NOT_EXIST
                {"-63","Tài khoản ZaloPay không đủ số dư"},//ZPW_BALANCE_NOT_ENOUGH
                {"-64","Hệ thống đang có lỗi, vui lòng quay lại sau."},//ZPW_GET_BALANCE_FAIL
                {"-65","Sai mật khẩu."},//ZPW_WRONG_PASSWORD
                {"-66","Sai thông tin tài khoản."},//USER_INVALID
                {"-67","Đăng nhập thất bại."},//DESERIALIZE_TRANS_FAIL
                {"-68","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//DUPLICATE_APPTRANSID
                {"-69","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//DUPLICATE_ZPTRANSID
                {"-70","Giao dịch đã tồn tại. Vui lòng thực hiện lại giao dịch khác"},//APPTRANSID_EXIST
                {"-71","Đăng nhập thất bại."},//ZALO_LOGIN_FAIL
                {"-72","Phiên đăng nhập hết hạn Vui lòng đăng nhập lại."},//ZALO_LOGIN_EXPIRE
                {"-73","Phiên làm việc hết hạn hoặc tài khoản đã đăng nhập thiết bị khác."},//TOKEN_INVALID
                {"-74","Thông tin thẻ không chính xác."},//CARDINFO_INVALID
                {"-75","Thông tin thẻ đã tồn tại."},//CARDINFO_EXIST
                {"-76","Thông tin thẻ không tồn tại."},//CARDINFO_NOT_FOUND
                {"-77","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//UM_TOKEN_NOT_FOUND
                {"-78","Phiên đăng nhập hết hạn Vui lòng đăng nhập lại."},//UM_TOKEN_EXPIRE
                {"-79","Nhập thông tin sai định dạng, vui lòng nhập lại."},//REQUEST_FORMAT_INVALID
                {"-80","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//TRANS_NOT_FINISH
                {"-81","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//USER_NOT_MATCH
                {"-82","Thông tin thẻ không đúng."},//CARD_NOT_MATCH
                {"-83","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//TRANSID_FORMAT_INVALID
                {"-84","Thông tin thẻ không chính xác."},//CARD_TOKEN_INVALID
                {"-85","Thông tin thẻ đã lưu hết hạn. Vui lòng Hủy thẻ và thực hiện Lưu thẻ lại."},//CARD_TOKEN_EXPIRE
                {"-86","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//TRANSTYPE_INVALID
                {"-87","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//TRANSTYPE_INACTIVE
                {"-88","Chức năng này đang bảo trì. Vui lòng quay lại sau."},//TRANSTYPE_MAINTENANCE
                {"-89","Giao dịch đã tồn tại. Vui lòng thực hiện lại giao dịch khác"},//MAP_APPID_APPTRANSID_FAIL
                {"-90","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//EXCEED_MAX_NOTIFY_WALLET_FEE
                {"-91","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//UPDATE_RESULT_FAIL_WALLET_FEE
                {"-92","Hệ thống đang có lỗi, vui lòng quay lại sau."},//APPTRANSID_INVALID
                {"-93","Hệ thống đang có lỗi, vui lòng quay lại sau."},//APPTRANSID_GEN_ERROR
                {"-94","Số tiền thanh toán không hợp lệ."},//TRANSTYPE_AMOUNT_INVALID
                {"-97","Hệ thống đang có lỗi, vui lòng quay lại sau."},//GEN_USER_ID_FAIL
                {"-98","Đăng nhập thất bại."},//LOGIN_SYSTEM_NOT_FOUND
                {"-99","Hệ thống đang có lỗi, vui lòng quay lại sau."},//CLIENT_ID_NOT_FOUND
                {"-100","Hệ thống đang có lỗi, vui lòng quay lại sau."},//SIG_INVALID
                {"-101","Hoàn tiền thành công. Chủ thẻ ATM, Thẻ VISA/Master/JCB sẽ được hoàn tiền trong 3-5 ngày làm việc."},//REFUND_SUCCESS
                {"-102","Hoàn tiền thất bại."},//REFUND_FAIL
                {"-103","Thông tin tài khoản không hợp lệ."},//MUID_INVALID
                {"-104","Thông tin đăng nhập không hợp lệ."},//MACCESSTOKEN_INVALID
                {"-105","Khách hàng đã thoát khỏi hệ thống."},//USER_LOGOUT
                {"-106","Hệ thống đang có lỗi, vui lòng quay lại sau."},//APP_NOT_PRIVILEGE
                {"-107","Tài khoản đã đăng nhập trên thiết bị khác. Vui lòng đăng nhập lại."},//USER_CHANGE_SESSION
                {"-108","Hệ thống đang có lỗi, vui lòng quay lại sau."},//ATM_AUTHEN_PAYER_FAIL
                {"-109","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//TRANS_NOT_REFUND
                {"-110","Số điện thoại không đúng định dạng."},//PHONE_NUMBER_INVALID
                {"-111","Mật khẩu không hợp lệ."},//PIN_INVALID
                {"-112","OTP không đúng."},//OTP_PROFILE_INVALID
                {"-113","OTP hết hạn."},//OTP_PROFILE_EXPIRE
                {"-114","OTP không chính xác."},//OTP_PROFILE_NOT_MATCH
                {"-115","Nhập OTP sai vượt quá số lần quy định."},//OTP_PROFILE_MAX_RETRY
                {"-116","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//USER_NOT_EXIST
                {"-117","Mật khẩu không đúng"},//PIN_NOT_MATCH
                {"-118","Hệ thống đang có lỗi, vui lòng quay lại sau."},//PROFILE_LEVEL_PERMISSION_NOT_FOUND
                {"-119","Bạn cần cập nhật thông tin để sử dụng tính năng này."},//PROFILE_LEVEL_PERMISSION_NOT_ALLOW
                {"-120","Mật khẩu không hợp lệ, giao dịch thất bại."},//PROFILE_LEVEL_PERMISSION_PIN_REQUIRE
                {"-121","Hệ thống đang có lỗi, vui lòng quay lại sau."},//PROFILE_LEVEL_PERMISSION_VERIFY_PIN_FAIL
                {"-122","Sai mật khẩu."},//PROFILE_LEVEL_PERMISSION_WRONG_PIN
                {"-123","Hệ thống đang có lỗi, vui lòng quay lại sau."},//SEND_SMS_FAIL
                {"-124","Tài khoản đang bị khóa."},//USER_IS_LOCKED
                {"-125","Sai mật khẩu thanh toán quá số lần quy định, vui lòng thử lại sau 15 phút."},//WRONG_PIN_OVERLIMIT
                {"-126","Mật khẩu không hợp lệ."},//PIN_SIZE_INVALID
                {"-127","Hệ thống đang có lỗi, vui lòng quay lại sau."},//RECOVERY_INFO_INVALID
                {"-128","Tài khoản nhận tiền không tồn tại. Vui lòng chọn tài khoản khác."},//RECEIVER_NOT_EXIST
                {"-129","Không được phép chuyển tiền cùng tài khoản."},//TRANSFER_SAME_USERID
                {"-130","Không được phép đăng nhập."},//SYSTEM_LOGIN_INVAID
                {"-131","Tài khoản nhận tiền bị khóa."},//RECEIVER_IS_LOCKED
                {"-132","Hoàn tiền không hợp lệ."},//REFUND_TYPE_INVALID
                {"-133","Vượt quá số tiền cho phép sử dụng trong ngày. Vui lòng quay lại sau. Cập nhật Email, CMND để tăng hạn mức sử dụng trong ngày."},//EXCEED_MAX_BALANCE_PER_DAY
                {"-134","Vượt quá số lần cho phép lưu thẻ trong ngày."},//EXCEED_MAX_MAPCARD_PER_DAY
                {"-135","Hệ thống đang bảo trì, vui lòng quay lại sau."},//SYSTEM_AUTO_MAINTENANCE
                {"-136","Lưu thẻ không thành công. Vui lòng thực hiện lại."},//MAP_CARD_FAIL
                {"-137","Hệ thống đang có lỗi, vui lòng quay lại sau."},//UM_API_FAIL
                {"-140","Email không hợp lệ."},//EMAIL_FORMAT_INAVLID
                {"-144","Hệ thống đang có lỗi, vui lòng quay lại sau."},//SEND_QUEUE_FAIL
                {"-145","Số chứng minh thư không hợp lệ"},//IDENTITYNUMBER_INVALID
                {"-146","Thông tin thanh toán không hợp lệ."},//CHARGE_INFO_INVALID
                {"-148","Hệ thống đang có lỗi, vui lòng quay lại sau."},//UM_EXCEPTION
                {"-149","Tên tài khoản không hợp lệ."},//ZALOPAYNAME_INVALID
                {"-150","Tên tài khoản đã tồn tại!"},//ZALOPAYNAME_EXIST
                {"-151","Tên tài khoản không cho phép."},//ZALOPAYNAME_DENY
                {"-152","Tên tài khoản không cho phép."},//ZALOPAYNAME_FOR_BUZ
                {"-153","Tài khoản không tồn tại."},//ZALOPAYNAME_NOT_EXIST
                {"-154","Bạn đã có tên tài khoản!"},//USER_HAD_ZALOPAYNAME
                {"-155","Rút tiền thất bại."},//INQUIRECARD_FAIL
                {"-156","Rút tiền thất bại."},//WITHDRAW_MONEY_FAIL
                {"-158","Chức năng đang tạm đóng."},//FUNCTION_CLOSED
                {"-159","User gửi không hợp lệ."},//SENDER_USERID_INVALID
                {"-160","User nhận không hợp lệ."},//RECEIVER_USERID_INVALID
                {"-161","Sai mật khẩu thanh toán quá số lần quy định, vui lòng thử lại sau 15 phút."},//EXCEED_PIN_NOT_MATCH
                {"-162","Thôn tin tài khoản đã được cập nhật."},//PROFILE_LEVEL_PERMISSION_OVER
                {"-163","Rút tiền thất bại."},//WITHDRAW_MONEY_QUERYORDER_FAIL
                {"-164","Thông tin thẻ đã được liên kết cho tài khoản khác."},//CARD_USERD_ANOTHER_USER
                {"-165","Bạn đã thực hiện vượt quá số lần giao dịch trong ngày"},//EXCEED_TOTAL_TRANS_PER_DAY
                {"-166","Bạn đã thực hiện vượt quá số tiền trong ngày"},//EXCEED_TOTAL_AMT_PER_DAY
                {"-167","App version không đúng"},//APPVERSION_NOT_FOUND
                {"-168","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//INPUT_DB_FAIL
                {"-169","Yêu cầu của bạn đang xử lý! Vui lòng đợi kết quả."},//PROFILE_UPDATING
                {"-172","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//TPE_API_EXCEPTION
                {"-187","AppUserType không chính xác"},//APP_USER_TYPE_INVALID
                {"-197","Số điện thoại đã được sử dụng"},//UM_PHONE_USED
                {"-198","Profile level user nhỏ hơn"},//UM_PROFILE_LEVEL_LESS_THAN
                {"-199","Profile level invalid"},//UM_PROFILE_LEVEL_INVALID
                {"-200","Sai OTP, vui lòng thực hiện lại giao dich."},//ATM_WRONG_OTP_END_TRANSACTION
                {"-203","Notify all user thất bại"},//NOTIFY_ALL_USER_FAIL
                {"-209","Không tìm thấy số điện thoại"},//PHONE_NOT_FOUND
                {"-210","Thông tin bank account không hợp lệ"},//UM_BANK_ACCOUNT_INFO_INVALID
                {"-211","Bank account đã tồn tại"},//UM_BANK_ACCOUNT_EXIST
                {"-212","Bank account đã liên kết cho user khác"},//UM_BANK_ACCOUNT_USERD_ANOTHER_USER
                {"-213","Bank account không tồn tại"},//UM_BANK_ACCOUNT_NOT_FOUND
                {"-214","Trùng thông tin first last"},//UM_BANK_ACCOUNT_DUP_FIRST_LAST
                {"-215","Trùng thẻ đã lưu"},//UM_CARD_DUP_FIRST_LAST
                {"-216","Liên kết ngân hàng hết hạn"},//BANKACCOUNT_TOKEN_EXPIRE
                {"-217","Thanh toán thất bại"},//ZPBANK_CHARGE_FAIL
                {"-218","Thanh toán thất bại"},//ZPBANK_QUERY_ORDER_FAIL
                {"-219","Thanh toán thất bại"},//ZPBANK_CASHIN_FAIL
                {"-220","Merchant id không hợp lệ"},//ZPBANK_MERCHANT_ID_INVALID
                {"-221","Thông tin không chính xác"},//ZPBANK_DATA_INVALID
                {"-224","Tài khoản ngân hàng không hợp lệ"},//BANK_ACCOUNT_INVALID
                {"-225","Hệ thống đang có lỗi"},//ZPBANK_EXCEPTION
                {"-226","CampaignID không hợp lệ"},//CAMPAIGN_ID_INVALID
                {"-227","Campaign chưa active."},//CAMPAIGN_INACTIVE
                {"-228","Campaign bảo trì"},//CAMPAIGN_MAINTAIN
                {"-229","Campaign không tồn tại"},//CAMPAIGN_NOT_EXIST
                {"-230","Campaign hết hạn"},//CAMPAIGN_EXPIRE
                {"-231","CTransID không hợp lệ"},//CAMPAIGN_CTRANSID_INVALID
                {"-232","CTransID phải chưa CampaignID"},//CAMPAIGN_CTRANSID_NOT_HAS_CID
                {"-233","Hệ thống đang có lỗi"},//UM_MERCHANT_EXCEPTION
                {"-234","Campaign đã đóng"},//CAMPAIGN_TOTAL_INVALID
                {"-235","Campaign đạt giới hạn giao dịch"},//CAMPAIGN_TOTAL_NOT_ENOUGHT_COUNT
                {"-236","Campaign đạt giới hạn số tiền"},//CAMPAIGN_TOTAL_NOT_ENOUGHT_AMOUNT
                {"-237","Campaign đã đóng"},//CAMPAIGN_TOTAL_ERROR
                {"-238","Số TK ZaloPay không hợp lệ"},//ZALOPAYID_INVALID
                {"-239","HMac không chính xác"},//HMAC_NOT_MATCH
                {"-240","Campaign không có tài khoản này"},//CAMPAIGN_NOT_CONTAINS_ZALOPAYID
                {"-241","Campaign không allow ip này"},//CAMPAIGN_NOT_CONTAINS_IP
                {"-242","Thời gian request hết hạn"},//TIME_EXPIRE
                {"-243","Số tiền trên mỗi giao dịch không đúng"},//CAMPAIGN_AMOUNT_PER_TRANS_NOT_MATCH
                {"-244","Giao dịch bị từ chối"},//IS_FRAUD_TRANSACTION
                {"-245","Thông tin người nhận không chính xác"},//CAMPAIGN_RECEIVER_TYPE_INVALID
                {"-246","Thông tin người nhận không hợp lệ"},//CAMPAIGN_RECEIVER_TYPE_NOT_SUPPORT
                {"-247","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//CAMPAIGN_UPDATE_DB_FAIL
                {"-248","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//CAMPAIGN_CALL_TPE_FAIL
                {"-249","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//CAMPAIGN_CALL_ANTI_REVERT_FAIL
                {"-250","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//CHARGED_SUCCESSFULLY_AFTER_QUERY
                {"-251","User đang tồn tại liên kết tài khoản."},//USER_HAD_BANK_ACCOUNT
                {"-252","Thời gian yêu cầu hết hạn!"},//REQDATE_EXPIRE
                {"-253","Số tiền không hợp lệ"},//CAMPAIGN_AMOUNT_INVALID
                {"-254","Số tiền không hợp lệ"},//CAMPAIGN_CALC_AMOUNT_INVALID
                {"-255","Giao dịch đã xử lý"},//CAMPAIGN_ANTIREVERT_INSERT_CASHBACK_FAIL
                {"-256","Giao dịch đã xử lý"},//CAMPAIGN_ANTIREVERT_UPDATE_QUOTA_FAIL
                {"-257","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//CAMPAIGN_ANTIREVERT_EXCEPTION
                {"-258","Mã giao dịch ZaloPay không hợp lệ"},//CAMPAIGN_ZALOPAY_TRANSID_INVALID
                {"-259","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//CAMPAIGN_SUBMIT_TPE_FAIL
                {"-260","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//CAMPAIGN_TRY_LOCK_FAIL
                {"-261","Giao dịch đã xử lý"},//CAMPAIGN_INSERT_TRANS_FAIL
                {"-262","Giao dịch đã xử lý"},//CAMPAIGN_UPDATE_QUOTA_FAIL
                {"-264","Người gửi ko hợp lệ"},//CAMPAIGN_SENDER_INVALID
                {"-265","Giao dịch đã refund"},//CAMPAIGN_TRANS_REFUNED
                {"-266","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//CAMPAIGN_API_EXCEPTION
                {"-267","Thanh toán thất bại"},//PMC_CHARGE_FAIL
                {"-268","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//CAMPAIGN_EVOUCHER_VERIFY_SIG_FAIL
                {"-269","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//CAMPAIGN_EVOUCHER_EXCEPTION
                {"-270","Kiểm tra map card thất bại"},//ZPBANK_VERIFYCARD_FOR_MAPPING_FAIL
                {"-271","Authen thất bại"},//ZPBANK_AUTHCARD_FOR_MAPPING_FAIL
                {"-272","Map card thất bại"},//ZPBANK_QUERYSTATUS_FOR_MAPPING_FAIL
                {"-273","Authen thất bại"},//ZPBANK_AUTHCARD_FOR_PAYING_FAIL
                {"-274","Remove thẻ thất bại"},//ZPBANK_REMOVE_CARD_FAIL
                {"-275","Liên kết thẻ thất bại"},//ZPBANK_MAPCARD_FAIL
                {"-278","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//BANK_SYSTEM_INVALID
                {"-279","Đăng ký thanh toán trực tuyến thất bại"},//REGISTER_OP_AND_FAIL
                {"-280","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//UM_BANKTOKEN_INVALID
                {"-281","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//UM_BANKTOKEN_EXIST
                {"-282","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//UM_CLIENT_NOT_ALLOW
                {"-284","Thẻ chưa đăng ký dịch vụ thanh toán trực tuyến với ngân hàng. Vui lòng liên hệ ngân hàng để đăng ký dịch vụ thanh toán trực tuyến."},//NEED_REGISTER_ONLINE_PAYMENT
                {"-285","Hệ thống đang có lỗi, vui lòng thử lại sau ít phút."},//UM_GET_CARDINFO_FAIL
                {"-289","Không hỗ trợ kênh thanh toán này, vui lòng chọn kênh thanh toán khác"},//QRPAY_CONFIG_NOT_SUPPORT
                {"-290","Giao dịch thất bại, tài khoản chưa bị trừ tiền. Vui lòng thực hiện lại."},//DUPLICATE_PAYMENTCODE
                {"-291","Loại giao dịch không hỗ trợ thanh toán với số tiền này"},//AMOUNT_NOT_SUPPORT
                {"-292","Payment code không hợp lệ"},//PAYMENT_CODE_INVALID
                {"-293","Thông tin thanh toán không hợp lệ"},//TRANS_NOT_MATCH
                {"-295","Revert voucher thất bại"},//REVERT_VOUCHER_FAILED
                {"-296","Giao dịch thất bại, tài khoản chưa bị trừ tiền"},//USER_NOT_SUBMIT_PIN
                {"-999","Hệ thống đang bảo trì, vui lòng quay lại sau"}//SYSTEM_MAINTAIN
            };
        }
    }
    public class ZalopayPaygateService
    {
        private static readonly ILog _log = LogManager.GetLogger(typeof(ZalopayPaygateService));
        public static ZaloPayConfig Config => new ZaloPayConfig();
        public ZalopayPaygateService()
        {
        }
        public string CreateOrderURL(
            string appuser, long amount, string apptransid, string bankcode = "",
            string description = "", string phone = "", string embeddata = "{}", string item = "",
            string email = "", string address = "")
        {
            string appid = Config.AppId;
            long apptime = (long)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds * 1000;
            Dictionary<string, string> param = new Dictionary<string, string>();
            string data = appid + "|" + apptransid + "|" + appuser + "|" + amount + "|" + apptime + "|" + embeddata + "|" + item;

            //_log.Info(DateTime.Now.yyyyMMddHHmmss() + " - CreateOrderURL: " + $"{data}");

            param.Add("appid", appid);//int|required||định danh cho ứng dụng đã được cấp khi đăng ký ứng dụng với ZaloPay.
            param.Add("appuser", appuser);//string|required|len<=50|tài khoản được cung cấp dịch vụ khi thanh toán thành công. Ví dụ: id, name hoặc email của user
            param.Add("apptime", apptime.ToString());//long|required||thời gian tạo đơn hàng (unix timestamp in milisecond)
            param.Add("amount", amount.ToString());//long|required||giá trị của đơn hàng VND
            param.Add("apptransid", apptransid);//long|required|len<=40|mã giao dịch của ứng dụng. mã giao dịch phải bắt đầu bằng yymmdd hiện tại
            param.Add("embeddata", embeddata);//string|required|len<=1024|dữ liệu riêng của ứng dụng. Dữ liệu này sẽ được callback lại cho MerchantServer khi thanh toán thành công
            param.Add("item", item);//string|required|len<=256|item của đơn hàng, ứng dụng tự định nghĩa
            param.Add("mac", CalculateMac(ZaloPayHMAC.HMACSHA256, Config.Key1, data));//string|required||dữ liệu xác thực của đơn hàng. Xem phần Tạo dữ liệu xác thực cho đơn hàng
            param.Add("description", description);//string|required|len<=100|hông tin dịch vụ đang được thanh toán dùng để hiển thị cho user
            param.Add("phone", phone);//string|required|len<=20|Số điện thoại của người dùng
            param.Add("email", email);//string|required|len<=50|Email của người dùng
            param.Add("address", address);//string|required|len<=1024|Địa chỉ của người dùng
            param.Add("bankcode", bankcode);//string|required|len<=20|Mã ngân hàng
            return string.Format("{0}?order={1}", Config.CreateOrderUrl, System.Web.HttpUtility.UrlEncode(CreateURL(param)));
        }
        public bool IsValidRedirectLink(string checksum, string appid, string apptransid, string pmcid, string bankcode, string amount, string discountamount, string status)
        {
            string data = appid + "|" + apptransid + "|" + pmcid + "|" + bankcode + "|" + amount + "|" + discountamount + "|" + status;
            string recalculateChecksum = CalculateMac(ZaloPayHMAC.HMACSHA256, Config.Key2, data);
            if (checksum != recalculateChecksum)
            {
                return false;
            }
            return true;
        }

        #region cacllback
        public static ZaloPayResponse ParseCallbackResult(ZaloPayCallBackReq req)
        {
            var res = req.data.FromJson<ZaloPayResponse>();
            string mac2 = CalculateMac(ZaloPayHMAC.HMACSHA256, Config.Key2, req.data);
            res.Success = (req.mac == mac2);

            return res;
        }
        public Dictionary<string, object> ParseCallBackResult(string input, out string errorCode)
        {
            /*  1: thành công
                2: trùng mã giao dịch ZaloPay zptransid hoặc apptransid ( đã cung cấp dịch vụ cho user trước đó)
                0: callback lại (tối đa 3 lần)
                3: Refund vào tài khoản zalopay của user
                mã lỗi khác : thất bại (không callback lại)
                {
                "data":"{
                \"appid\":2,
                \"zptransid\":160520000000081,
                \"apptransid\":\"160520176021926423825\",
                \"apptime\":1463711618132,
                \"appuser\":\"160514000002501\",
                \"item\":\"[{\"itemID\":\"it002\",\"itemName\":\"Color 50K\",\"itemQuantity\":1,\"itemPrice\":50000}]\",
                \"amount\":1000,\"embeddata\":\"{\"promotioninfo\":\"\",\"merchantinfo\":\"embeddata123\"}"\",
                \"servertime\":1463711619269,
                \"channel\":38,
                \"merchantuserid\":\"rSVW3nBDryiJ6eN7h4L8ZjFn1OAbTaPoBm0I0JbB9zo\",
                \"userfeeamount\":220
                }"
                ,"mac":"16b369598e86411baf15421cff917610119f37d157c064109618496c937b9bc5"}
             */
            Dictionary<string, object> o = null;
            errorCode = "1";
            try
            {
                Dictionary<string, object> i = JsonConvert.DeserializeObject<Dictionary<string, object>>(input);
                string data = i["data"].ToString();
                string mac = i["mac"].ToString();

                //WebLog.Log.Data(DateTime.Now.yyyyMMddHHmmss() + " - ParseCallBackResult data=" + $"{data}", true, FileLog);

                string recalculateMac = CalculateMac(ZaloPayHMAC.HMACSHA256, Config.Key2, data);
                if (recalculateMac != mac)
                {
                    //WebLog.Log.Data(DateTime.Now.yyyyMMddHHmmss() + " - ParseCallBackResult mac err: mac=" + $"{recalculateMac}", true, FileLog);
                    errorCode = "4";
                }
                o = JsonConvert.DeserializeObject<Dictionary<string, object>>(data);

                return o;
            }
            catch (Exception ex)
            {
                //WebLog.Log.Data(DateTime.Now.yyyyMMddHHmmss() + " - ParseCallBackResult err: " + $"{ex.Message}", true, FileLog);
                errorCode = "0";
            }
            return o;
        }

        #endregion callback

        /// <summary>
        /// Lấy trạng thái thanh toán
        /// </summary>
        /// <param name="appTransId"></param>
        /// <returns></returns>
        public ZalopayQueryOrderResponse QueryOrder(string appTransId)
        {
            string appId = Config.AppId;
            Dictionary<string, string> param = new Dictionary<string, string>();
            param.Add("appid", appId);
            param.Add("apptransid", appTransId);
            string data = appId + "|" + appTransId + "|" + Config.Key1;
            param.Add("mac", CalculateMac(ZaloPayHMAC.HMACSHA256, Config.Key1, data));
            string result = HttpPost(Config.QueryOrderUrl, CreateQueryString(param));
            var res = JsonConvert.DeserializeObject<ZalopayQueryOrderResponse>(result);
            return res;
        }

        public Dictionary<string, object> GetBanks()
        {
            string reqtime = GetTimeStamp(DateTime.Now).ToString();
            string appid = Config.AppId;
            Dictionary<string, string> param = new Dictionary<string, string>();
            param.Add("appid", appid);
            param.Add("reqtime", reqtime);
            string data = appid + "|" + reqtime;
            param.Add("mac", CalculateMac(ZaloPayHMAC.HMACSHA256, Config.Key1, data));
            string result = HttpPost(Config.GetBanksUrl, CreateQueryString(param));
            var o = JsonConvert.DeserializeObject<Dictionary<string, object>>(result);
            return (Dictionary<string, object>)o["banks"];
        }

        #region static utilities
        private static string CreateURL(Dictionary<string, string> paras)
        {
            string json = JsonConvert.SerializeObject(paras);
            return Base64(json);
        }
        private static string Base64(string message)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(message);
            string encodedText = Convert.ToBase64String(plainTextBytes);
            return encodedText;
        }
        private static string CreateQueryString(Dictionary<string, string> paras)
        {
            StringBuilder sb = new StringBuilder();
            foreach (KeyValuePair<string, string> pair in paras)
            {
                sb.Append(pair.Key + "=" + pair.Value + "&");
            }
            string url = sb.ToString();
            url = url.Remove(url.LastIndexOf("&"));
            return url;
        }

        public static string CalculateMac(ZaloPayHMAC algorithm = ZaloPayHMAC.HMACSHA256, string key = "", string message = "", bool toHex = true)
        {
            byte[] keyByte = System.Text.Encoding.UTF8.GetBytes(key);
            byte[] messageBytes = System.Text.Encoding.UTF8.GetBytes(message);
            byte[] hashMessage = null;
            switch (algorithm)
            {
                case ZaloPayHMAC.HMACMD5:
                    hashMessage = new HMACMD5(keyByte).ComputeHash(messageBytes);
                    break;
                case ZaloPayHMAC.HMACSHA1:
                    hashMessage = new HMACSHA1(keyByte).ComputeHash(messageBytes);
                    break;
                case ZaloPayHMAC.HMACSHA256:
                    hashMessage = new HMACSHA256(keyByte).ComputeHash(messageBytes);
                    break;
                case ZaloPayHMAC.HMACSHA512:
                    hashMessage = new HMACSHA512(keyByte).ComputeHash(messageBytes);
                    break;
                default:
                    hashMessage = new HMACSHA256(keyByte).ComputeHash(messageBytes);
                    break;
            }
            string sOut = "";
            if (toHex)
            {
                sOut = BitConverter.ToString(hashMessage);
                sOut = sOut.Replace("-", "");
                sOut = sOut.ToLower();
            }
            else
            {
                // to lowercase hexits
                String.Concat(Array.ConvertAll(hashMessage, x => x.ToString("x2")));

                // to base64
                sOut = Convert.ToBase64String(hashMessage).ToLower();
            }

            return sOut;
        }
        private static string HttpPost(string URI, string Parameters)
        {
            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var client = new RestClient(URI);
            var request = new RestRequest(Method.POST);
            request.AddHeader("cache-control", "no-cache");
            request.AddHeader("content-type", "application/x-www-form-urlencoded");
            request.AddParameter("application/x-www-form-urlencoded", Parameters, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            if (response.StatusCode != HttpStatusCode.OK)
            {
                return null;
            }
            else
            {
                return response.Content.Trim();
            }
        }

        public static long GetTimeStamp(DateTime date)
        {
            try
            {
                var timeSpan = (date.ToUniversalTime() - new DateTime(1970, 1, 1, 0, 0, 0));
                return (long)timeSpan.TotalSeconds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static byte[] BitmapToBytes(Bitmap img)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                img.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                return stream.ToArray();
            }
        }
        #endregion static utilities

        #region QR code
        public Dictionary<string, object> CreateOrderQR(
            string appuser, long amount, string apptransid,
            string embeddata = "{}", string item = "", string description = "")
        {
            //Tuple<string, string> res = null;

            string appid = Config.AppId;
            long apptime = (long)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds * 1000;
            Dictionary<string, string> param = new Dictionary<string, string>();
            //appid +”|”+ apptransid +”|”+ appuser +”|”+ amount +"|" + apptime +”|”+ embeddata +"|" +item
            string data = appid + "|" + apptransid + "|" + appuser + "|" + amount + "|" + apptime + "|" + embeddata + "|" + item;

            //WebLog.Log.Data(DateTime.Now.yyyyMMddHHmmss() + " - CreateOrderQR: " + $"{data}", true, FileLog);

            param.Add("appid", appid);//int|required||định danh cho ứng dụng đã được cấp khi đăng ký ứng dụng với ZaloPay.
            param.Add("appuser", appuser);//string|required|len<=50|tài khoản được cung cấp dịch vụ khi thanh toán thành công. Ví dụ: id, name hoặc email của user
            param.Add("apptime", apptime.ToString());//long|required||thời gian tạo đơn hàng (unix timestamp in milisecond)
            param.Add("amount", amount.ToString());//long|required||giá trị của đơn hàng VND
            param.Add("apptransid", apptransid);//long|required|len<=40|mã giao dịch của ứng dụng. mã giao dịch phải bắt đầu bằng yymmdd hiện tại
            param.Add("embeddata", embeddata);//string|required|len<=1024|dữ liệu riêng của ứng dụng. Dữ liệu này sẽ được callback lại cho MerchantServer khi thanh toán thành công
            param.Add("item", item);//string|required|len<=256|item của đơn hàng, ứng dụng tự định nghĩa
            param.Add("description", description);//string|required|len<=100|hông tin dịch vụ đang được thanh toán dùng để hiển thị cho user
            param.Add("mac", CalculateMac(ZaloPayHMAC.HMACSHA256, Config.Key1, data));//string|required||dữ liệu xác thực của đơn hàng. Xem phần Tạo dữ liệu xác thực cho đơn hàng


            string result = HttpPost(Config.CreateOrderQR, CreateQueryString(param));
            Dictionary<string, object> o = JsonConvert.DeserializeObject<Dictionary<string, object>>(result);

            if (o["returncode"].ToString() == "1")
            {
                //string tk = o["zptranstoken"].ToString();
                //string tks = "{" + string.Format("\"zptranstoken\":\"{0}\",\"appid\":\"{1}\"", tk, Config.AppId) + "}";
                //res = new Tuple<string, string>(tks, string.Format(Config.ZaloPay_RedirectQR + "?appid={0}&zptranstoken={1}", Config.AppId, tk));
                return o;
            }

            return null;
        }
        #endregion QR code

    }
}
