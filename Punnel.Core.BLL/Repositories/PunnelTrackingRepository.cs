using log4net;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using Punnel.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Punnel.Core.BLL.Utils;
using Punnel.Core.Entities.Tracking;
using Punnel.Core.BLL.Services;
using Punnel.Core.Entities.Integration;
using Dapper;
using System.Data;
using Punnel.Core.Entities;
using Punnel.Core.Entities._123Chaching;

namespace Punnel.Core.BLL.Repositories
{
    public class PunnelTrackingRepository : IPunnelTrackingRepository
    {
        IConnectionFactory _connectionFactory;

        public PunnelTrackingRepository(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        private static readonly ILog _log = LogManager.GetLogger(typeof(PunnelTrackingRepository));
       
        public void AddTrack(TrackIP data)
        {
            var timeId = DateTime.Now.ToUnixTimeMiliseconds();
            data.TimeId = timeId;
            if (!string.IsNullOrEmpty(data.Referer))
            {
                Uri myUri = new Uri(data.Referer);
                data.Host = myUri.Host==null?"":myUri.Host;
            }
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_UI_TrackIP";
                data.Host = data.Host == null ? "" : data.Host;
                SqlMapper.Execute(cnn, sql, new {data.TimeId, data.IpAddress, data.PageId, data.Link, data.Os, data.IsMobile, data.Referer,data.Host, data.SourceId, data.Params, data.IsFacebookAds, data.IsGoogleAds, TrackDate = DateTime.Now }, commandType: CommandType.StoredProcedure);
            }
        }

        public void AddIpInfo(TrackIP tr)
        {
            var moreInfo = new LocationService().GetInfoByIp(tr.IpAddress);
            int infoStatus = 2;
            if (moreInfo.Code == System.Net.HttpStatusCode.OK)
            {
                var data = (Entities.Integration.LocationIPResponse)moreInfo.Data;
                data.Ip = tr.IpAddress;
                data.Os = data.Os;
                data.IsMobile = data.IsMobile;
                using (var cnn = _connectionFactory.GetConnection)
                {
                    string sql = "msp_UI_UserInfo";
                    SqlMapper.Execute(cnn, sql, new { IpAddress = data.Ip, City = data.city, Country = data.country_name, Isp = data.organisation, Lat = 0, Lon = 0, RegionName = data.region, Os = data.Os }, commandType: CommandType.StoredProcedure);
                }
                infoStatus = 1;
            }
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_UI_TrackIP_InfoStatus";
                SqlMapper.Execute(cnn, sql, new { IpAddress = tr.IpAddress, InfoStatus= infoStatus }, commandType: CommandType.StoredProcedure);
            }
        }

        public List<TrackIP> GetNewUserIp(int infoStatus)
        {
            var sql = "msp_Get_NewUserIp";
            using (var ccn = _connectionFactory.GetConnection)
            {
                var list = SqlMapper.Query<TrackIP>(ccn, sql,new { InfoStatus = infoStatus }, commandType: CommandType.StoredProcedure);
                return list.ToList();
            }
        }

        public async Task<List<PublishPageModel>> GetPublishPage(string userId)
        {
            var sql = "msp_Get_PublishPage";
            using (var ccn = _connectionFactory.GetConnection)
            {
                var list = await SqlMapper.QueryAsync<PublishPageModel>(ccn, sql, new { userId }, commandType: CommandType.StoredProcedure);
                return list.ToList();
            }
        }

        public async Task<PageSummaryReport> GetPageReportSummary(PageReportQuery query)
        {
            var sql = "msp_Report_Page_ByDate";
            using (var ccn = _connectionFactory.GetConnection)
            {
                var list = await SqlMapper.QueryAsync<PageSummaryReport>(ccn, sql, new { query.PageId,query.UserId, query.IsMobile, query.FromDate, query.ToDate }, commandType: CommandType.StoredProcedure);
                return list.FirstOrDefault();
            }
        }

        public async Task<List<PageSummaryDaily>> GetPageReportDaily(PageReportQuery query)
        {
            var sql = "msp_Report_Page_Daily";
                    using (var ccn = _connectionFactory.GetConnection)
                    {
                        var list = await SqlMapper.QueryAsync<PageSummaryDaily>(ccn, sql, new { query.PageId, query.IsMobile, query.FromDate, query.ToDate }, commandType: CommandType.StoredProcedure);
                _connectionFactory.Dispose();            
                    return list.ToList();
            }
        }

        public async Task<List<PageViewType>> GetPageReportRegion(PageReportQuery query)
        {
            var sql = "msp_Report_Page_Region";
            using (var ccn = _connectionFactory.GetConnection)
            {
                var list = await SqlMapper.QueryAsync<PageViewType>(ccn, sql, new { query.PageId, query.IsMobile, query.FromDate, query.ToDate }, commandType: CommandType.StoredProcedure);
                return list.ToList();
            }
        }

        public async Task<List<PageViewType>> GetPageReportChannel(PageReportQuery query)
        {
            var sql = "msp_Report_Page_TrafficChannel";
            using (var ccn = _connectionFactory.GetConnection)
            {
                var list = await SqlMapper.QueryAsync<PageViewType>(ccn, sql, new { query.PageId, query.IsMobile, query.FromDate, query.ToDate }, commandType: CommandType.StoredProcedure);
                return list.ToList();
            }
        }

        public async Task<List<PageViewType>> GetPageReportReferer(PageReportQuery query)
        {
            var sql = "msp_Report_Page_TrafficReferer";
            using (var ccn = _connectionFactory.GetConnection)
            {
                var list = await SqlMapper.QueryAsync<PageViewType>(ccn, sql, new { query.PageId, query.IsMobile, query.FromDate, query.ToDate }, commandType: CommandType.StoredProcedure);
                return list.ToList();
            }
        }

        public async Task<TrackIP> Lead_GetTrafficSource(int leadId)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_Lead_GetTrafficSource";
                var list = await SqlMapper.QueryAsync<TrackIP>(cnn, sql, new { leadId= leadId}, commandType: CommandType.StoredProcedure);
                return list.FirstOrDefault();
            }
        }

        public async Task<List<LeadRegion>> Lead_GetRegion(string userId)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_Lead_GetRegion";
                var list = await SqlMapper.QueryAsync<LeadRegion>(cnn, sql, new { userId = userId }, commandType: CommandType.StoredProcedure);
                return list.ToList();
            }
        }

        public async Task<string> msp_GetPageTrafficSource(Guid pageId, string ipAddress, DateTime submitDate)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_GetPageTrafficSource";
                var list = await SqlMapper.QueryAsync<TrackIP>(cnn, sql, new { pageId , ipAddress , submitDate }, commandType: CommandType.StoredProcedure);
                var res = list.FirstOrDefault();
                return res!=null? res.Referer:"";
            }
        }

        public string msp_GetPageTrafficSourceNoAsync(Guid pageId, string ipAddress, DateTime submitDate)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_GetPageTrafficSource";
                var list = SqlMapper.Query<TrackIP>(cnn, sql, new { pageId, ipAddress, submitDate }, commandType: CommandType.StoredProcedure);
                var res = list.FirstOrDefault();
                return res != null ? res.Referer : "";
            }
        }

        #region 123ChaChing
        public async Task<List<ChartViewModel>> GetLeadChart(string userId)
        {
            var sql = "msp_123_Report_Lead_Chart";
            using (var ccn = _connectionFactory.GetConnection)
            {
                var list = await SqlMapper.QueryAsync<ChartViewModel>(ccn, sql, new { userId }, commandType: CommandType.StoredProcedure);
                return list.ToList();
            }
        }

        public async Task<AffiliateSummary> GetAffiliateSummary(string userId)
        {
            var sql = "msp_123_Affiliate_Summary";
            using (var ccn = _connectionFactory.GetConnection)
            {
                var list = await SqlMapper.QueryAsync<AffiliateSummary>(ccn, sql, new { userId }, commandType: CommandType.StoredProcedure);
                return list.FirstOrDefault();
            }
        }
        #endregion

        #region Template Image Change
        public void AddPageImgUrl(string ImgUrl, Guid TemplateId,bool IsErr=false, string NewImgUrl="")
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                ImgUrl = ImgUrl.Replace("static.ladipage.net//", "static.ladipage.net/");
                string sql = "msp_UI_PageImage";
                SqlMapper.Execute(cnn, sql, new { ImgUrl ,NewImgUrl, TemplateId, IsErr }, commandType: CommandType.StoredProcedure);
            }
        }

        void UpdateImageInfo(string ImgUrl, int Width, int Height, float Size, string Type)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_UI_PageImage_Info";
                SqlMapper.Execute(cnn, sql, new { ImgUrl, Width, Height, Size, Type }, commandType: CommandType.StoredProcedure);
            }
        }

        public List<PageImage> GetPageImg()
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_Get_PageImage";
                var list= SqlMapper.Query<PageImage>(cnn, sql, commandType: CommandType.StoredProcedure);
                return list.ToList();
            }
        }

        public List<PageImage> Get_PageImage_ByImageUrl(string ImgUrl)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_Get_PageImage_ByImageUrl";
                var list = SqlMapper.Query<PageImage>(cnn, sql,new { ImgUrl } ,commandType: CommandType.StoredProcedure);
                return list.ToList();
            }
        }

        public void UpdateImageInfo()
        {
            var imgs = GetPageImg();
            foreach( var img in imgs)
            {
                try
                {
                    var imgInfo = new CrawlData.LadiPageCrawl().GetImgInfo(img.NewImgUrl);
                    UpdateImageInfo(img.ImgUrl, imgInfo.Width, imgInfo.Height, imgInfo.Size, imgInfo.Type);
                }catch(Exception ex)
                {

                }
            }
        }

        public virtual async Task<List<ImageStockResult>> GetImageInStock(Guid cateId)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_Get_ImageStock";
                var list = await SqlMapper.QueryAsync<ImageStockResult>(cnn, sql,new { cateId }, commandType: CommandType.StoredProcedure);
                return list.ToList();
            }
        }
        #endregion

        #region Email Status

        public async Task<bool> EmailIsValidated(string email)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_EmailStatus_GetStatus";
                var res = await SqlMapper.QueryAsync<EmailStatusViewModel>(cnn, sql, new { email }, commandType: CommandType.StoredProcedure);
                if (res.Count() == 0) return false;
                else return res.FirstOrDefault().Status == (int)EmailStatus.Verified ? true : false;
            }
        }

        public async Task<bool> EmailIsBlock(string email)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_EmailStatus_GetStatus";
                var res = await SqlMapper.QueryAsync<EmailStatusViewModel>(cnn, sql, new { email }, commandType: CommandType.StoredProcedure);
                if (res.Count() == 0) return false;
                else return res.FirstOrDefault().Status == (int)EmailStatus.Block ? true : false;
            }
        }

        /// <summary>
        /// Cập nhật kho trạng thái email : 1-validated, 2-block
        /// </summary>
        public async Task UpdateEmailStatus(string email, EmailStatus emailStatus)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_EmailStatus_IU";
                var status = (int)emailStatus;
                await SqlMapper.ExecuteAsync(cnn, sql, new { email, status }, commandType: CommandType.StoredProcedure);
            }
        }
        #endregion

        #region Mobile Status

        public async Task<bool> MobileIsValidated(string mobile)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_MobileStatus_GetStatus";
                var res = await SqlMapper.QueryAsync<MobileStatusViewModel>(cnn, sql, new { mobile }, commandType: CommandType.StoredProcedure);
                if (res.Count() == 0) return false;
                else return res.FirstOrDefault().Status == (int)MobileStatus.Verified ? true : false;
            }
        }

        public async Task<bool> MobileIsBlock(string mobile)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_MobileStatus_GetStatus";
                var res = await SqlMapper.QueryAsync<MobileStatusViewModel>(cnn, sql, new { mobile }, commandType: CommandType.StoredProcedure);
                if (res.Count() == 0) return false;
                else return res.FirstOrDefault().Status == (int)MobileStatus.Block ? true : false;
            }
        }

        /// <summary>
        /// Cập nhật kho trạng thái mobile : 1-validated, 2-block
        /// </summary>
        public async Task UpdateMobileStatus(string mobile, MobileStatus mobileStatus)
        {
            using (var cnn = _connectionFactory.GetConnection)
            {
                string sql = "msp_MobileStatus_IU";
                var status = (int)mobileStatus;
                await SqlMapper.ExecuteAsync(cnn, sql, new { mobile, status }, commandType: CommandType.StoredProcedure);
            }
        }
        #endregion
    }
}
