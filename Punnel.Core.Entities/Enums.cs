using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities
{
    public static class Enums
    {
    }

    public enum UserStatus
    {
        NotEmail=0,
        Done=1
    }

    public enum FileType
    {
        Image = 1,
        Font = 2,
        Avatar = 3,
        TemplateThumbnail =4,
        ImageStock=5
    }

    public enum TemplateCateType
    {
        Section = 20,
        PopUp = 30
    }

    public enum IntegrationType
    {
        GetResponse = 4,
        MailChimp= 3,
        ActiveCampain = 5,
        Gmail = 8,
        GoogleSheet = 9,
        Wordpress = 10,
        Shopify =11,
        Haravan = 12,
        Sapo = 13,
        Ftp = 14,
        Sms=15,
        InfusionSoft=16,
        Autopilot = 17
    }

    public enum TemplateStatus
    {
        New =0,
        Submited = 1,
        Approved = 2,
        Cancelled = 3
    }

    public enum CommissionPercent
    {
        Level1 = 30,
        Level2 = 40,
        Level3 = 50
    }
    public enum AffilateAgentLevel
    {
        Level1 = 1,
        Level2 = 2,
        Level3 = 3
    }

    public enum AffilateMemberStatus
    {
        New = 0,
        Paid = 1,
        Expired = 2
    }

    public enum LeadStatus
    {
        New = 0,
        Hot = 1,
        Warm = 2,
        Cold = 3
    }

    public enum ProfileLevel
    {
        Trial = 0,
        Economy = 1,
        Business = 2,
        VIP = 3
    }

    public enum InvoiceStatus
    {
        WaitToPay = 0,
        Paid = 1,
        Cancel = 2,
        PayError = 3
    }

    public enum PaymentType
    {
        ATM = 1,
        CreditCard = 2,
        QRCode = 3
    }

    public enum NotificationType
    {
        Subcrible = 1,
        SystemAlert = 2,
        Other = 3
    }

    public enum LeadSendStatus
    {
        None = 0,
        Success = 1,
        Failed = 2
    }

    public enum EmailFunction
    {
        ResetPassword = 1,
        VerifyEmail = 2
    }

    public enum EmailSendType
    {
        System_NoReply = 1,
        Lead_AutoReply = 2,
        Marketing = 3
    }

    public enum TrafficSource
    {
        Direct = 0,
        Search = 2,
        Social = 3,
        Other = 4
    }

    public enum TaskQueueType
    {
        /// <summary>
        /// Thay đổi page content để xóa cache
        /// </summary>
        UpdatePageContent = 1
    }

    //public enum PublishVendor
    //{
    //    /// <summary>
    //    /// Xuất bản ra các ứng dụng khác
    //    /// </summary>
    //    WordPress = 10
    //}

    public enum PublishType
    {
        /// <summary>
        /// Loại xuất bản
        /// </summary>
        Dns = 1,
        WP=2,
        Shopify=3,
        Haravan=4,
        Sapo = 5,
        Ftp=6
    }

    public enum SMSType
    {
        /// <summary>
        /// Loại gửi SMS
        /// </summary>
        New = 0,
        CS1 = 1,
        CS2 = 2,
        CS3 = 3
    }

    public enum EmailStatus
    {
        NotVerify=0,
        Verified=1,
        Block=2
    }

    public enum MobileStatus
    {
        NotVerify = 0,
        Verified = 1,
        Block = 2
    }

    public enum ResponderType
    {
        Email = 1,
        Sms = 2
    }
}
