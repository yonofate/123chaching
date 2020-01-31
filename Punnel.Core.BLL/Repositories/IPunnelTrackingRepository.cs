using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Punnel.Core.Entities;
using Punnel.Core.Entities._123Chaching;
using Punnel.Core.Entities.Tracking;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface IPunnelTrackingRepository
    {
        void AddTrack(TrackIP data);
        void AddIpInfo(TrackIP data);
        List<TrackIP> GetNewUserIp(int infoStatus);
        Task<List<PublishPageModel>> GetPublishPage(string userId);
        Task<PageSummaryReport> GetPageReportSummary(PageReportQuery query);
        Task<List<PageSummaryDaily>> GetPageReportDaily(PageReportQuery query);
        Task<List<PageViewType>> GetPageReportRegion(PageReportQuery query);
        Task<List<PageViewType>> GetPageReportReferer(PageReportQuery query);
        Task<List<PageViewType>> GetPageReportChannel(PageReportQuery query);
        void AddPageImgUrl(string ImgUrl, Guid TemplateId, bool IsErr = false, string NewImgUrl = "");
        List<PageImage> GetPageImg();
        List<PageImage> Get_PageImage_ByImageUrl(string ImgUrl);
        Task<TrackIP> Lead_GetTrafficSource(int leadId);
        Task<List<LeadRegion>> Lead_GetRegion(string userId);
        Task<string> msp_GetPageTrafficSource(Guid pageId, string ipAddress, DateTime submitDate);
        string msp_GetPageTrafficSourceNoAsync(Guid pageId, string ipAddress, DateTime submitDate);
        void UpdateImageInfo();
        Task<List<ImageStockResult>> GetImageInStock(Guid cateId);
        Task UpdateEmailStatus(string email, EmailStatus emailStatus);
        Task<bool> EmailIsValidated(string email);
        Task<bool> EmailIsBlock(string email);
        Task UpdateMobileStatus(string mobile, MobileStatus mobileStatus);
        Task<bool> MobileIsValidated(string mobile);
        Task<bool> MobileIsBlock(string mobile);

        #region 123Chaching
        Task<List<ChartViewModel>> GetLeadChart(string userId);
        Task<AffiliateSummary> GetAffiliateSummary(string userId);
        #endregion
    }
}
