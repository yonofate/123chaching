using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Core.Objects;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.Model
{
    public partial class PunnelContext
    {
        private void DBNullValue(SqlParameter[] items)
        {
            foreach (var p in items)
            {
                if (p.Value == null) p.Value = DBNull.Value;
            }
        }

        /// <summary>
        /// Tìm kiếm template
        /// </summary>
        /// <param name="query"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        public List<TemplateListViewModel> msp_Template_Search(TemplateRequestModel query, out int total)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="publish", DbType= DbType.Int32, Value = query.Status},
                new SqlParameter(){ParameterName="templatecateid", DbType= DbType.Guid, Value = query.TemplateCateId},
                new SqlParameter(){ParameterName="type", DbType= DbType.Int32, Value = query.Type},
                new SqlParameter(){ParameterName="userid", DbType= DbType.String, Value = query.UserId},
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@limit,@page,@status,@templatecateid,@type,@userid";
            var results = this.ExecuteStoreQuery<TemplateListViewModel>("[dbo].[msp_Template_Search] " + storeParam, sqlParams);
            total = (int)sqlParams[0].Value;
            return results;
        }

        public List<LandingPageSearchResult> msp_LandingPage_Search(LandingPageRequestModel query, out int total)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="publish", DbType= DbType.Boolean, Value = query.Publish},
                new SqlParameter(){ParameterName="collectionid", DbType= DbType.Guid, Value = query.CollectionId},
                new SqlParameter(){ParameterName="type", DbType= DbType.Int32, Value = query.Type},
                new SqlParameter(){ParameterName="userid", DbType= DbType.String, Value = query.UserId},
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@limit,@page,@publish,@collectionid,@type,@userid";
            var results = this.ExecuteStoreQuery<LandingPageSearchResult>("[dbo].[msp_LandingPage_Search] " + storeParam, sqlParams);
            total = (int)sqlParams[0].Value;
            return results;
        }

        public List<LeadSearchResult> msp_Lead_Search(LeadSearchRequest query, out int total)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="keyword", DbType= DbType.String, Value = query.Keyword},
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="landingpageid", DbType= DbType.Guid, Value = query.LandingPageId},
                new SqlParameter(){ParameterName="status", DbType= DbType.Int32, Value = query.Status},
                new SqlParameter(){ParameterName="userid", DbType= DbType.String, Value = query.UserId}
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@keyword,@limit,@page,@landingpageid,@status,@userid";
            var results = this.ExecuteStoreQuery<LeadSearchResult>("[dbo].[msp_Lead_Search] " + storeParam, sqlParams);
            total = (int)sqlParams[0].Value;
            return results;
        }

        public List<IntegrationFormViewModel> msp_IntegrationPage(Guid landingPageId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="landingpageid", DbType= DbType.Guid, Value = landingPageId},
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@landingpageid";
            var results = this.ExecuteStoreQuery<IntegrationFormViewModel>("[dbo].[msp_IntegrationPage] " + storeParam, sqlParams);
            return results;
        }

        public List<IntegrationFormViewModel> msp_Integration_Dashboard()
        {
            var results = this.ExecuteStoreQuery<IntegrationFormViewModel>("[dbo].[msp_Integration_Dashboard]");
            return results;
        }

        public UserDomainExpiredViewModel msp_GetUserByDomain(string domain)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="domain", DbType= DbType.String, Value = domain},
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@domain";
            var results = this.ExecuteStoreQuery<UserDomainExpiredViewModel>("[dbo].[msp_GetUserByDomain] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        #region Async

        public async Task<List<TemplateCategoryViewModel>> msp_TemplateCategory_GetByType( int type)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@type", DbType= DbType.Int32, Value = type}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@type";
            var results = await this.ExecuteStoreQueryAsync<TemplateCategoryViewModel>("[dbo].[msp_TemplateCategory_GetByType] " + storeParam, sqlParams);
            return results;
        }

        public async Task<TemplateCategoryViewModel> msp_TemplateCategory_GetByCode(string code)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@code", DbType= DbType.String, Value = code}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@code";
            var results = await this.ExecuteStoreQueryAsync<TemplateCategoryViewModel>("[dbo].[msp_TemplateCategory_GetByCode] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<TemplateViewModel> msp_FrontEnd_GetTemplate(Guid id)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@id", DbType= DbType.Guid, Value = id}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@id";
            var results = await this.ExecuteStoreQueryAsync<TemplateViewModel>("[dbo].[msp_FrontEnd_GetTemplate] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<TemplateViewModel> msp_Template_GetInfoById(Guid id)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@id", DbType= DbType.Guid, Value = id}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@id";
            var results = await this.ExecuteStoreQueryAsync<TemplateViewModel>("[dbo].[msp_Template_GetInfoById] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }
        public async Task<List<CollectionViewModel>> msp_Collection_GetByUser(string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@userId", DbType= DbType.String, Value = userId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId";
            var results = await this.ExecuteStoreQueryAsync<CollectionViewModel>("[dbo].[msp_Collection_GetByUser] " + storeParam, sqlParams);
            return results;
        }
        public async Task<List<CollectionViewModel>> msp_Collection_GetByType(string userId, int type)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@userId", DbType= DbType.String, Value = userId},
                new SqlParameter(){ParameterName="@type", DbType= DbType.Int32, Value = type}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId,@type";
            var results = await this.ExecuteStoreQueryAsync<CollectionViewModel>("[dbo].[msp_Collection_GetByType] " + storeParam, sqlParams);
            return results;
        }
        public async Task<LandingPageItemModel> msp_FrontEnd_GetLandingPage(Guid id, string type)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="id", DbType= DbType.Guid, Value = id},
                new SqlParameter(){ParameterName="type", DbType= DbType.String, Value = type}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@id,@type";
            var results = await this.ExecuteStoreQueryAsync<LandingPageItemModel>("[dbo].[msp_FrontEnd_GetLandingPage] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<LandingPageItemModel> msp_LandingPage_GetById(Guid id)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="id", DbType= DbType.Guid, Value = id}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@id";
            var results = await this.ExecuteStoreQueryAsync<LandingPageItemModel>("[dbo].[msp_LandingPage_GetById] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<LandingPageForSubcribleModel> msp_LandingPage_GetPageForSubcrible(Guid id)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="id", DbType= DbType.Guid, Value = id}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@id";
            var results = await this.ExecuteStoreQueryAsync<LandingPageForSubcribleModel>("[dbo].[msp_LandingPage_GetPageForSubcrible] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }
        public async Task<int> msp_Template_AddFromPageAsync(TemplateRequestFromPageModel data)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="pageid", DbType= DbType.Guid, Value = data.PageId.Value},
                new SqlParameter(){ParameterName="name", DbType= DbType.String, Value = data.Name},
                new SqlParameter(){ParameterName="code", DbType= DbType.String, Value = data.Code},
                new SqlParameter(){ParameterName="groupid", DbType= DbType.Byte, Value = data.Groupid},
                new SqlParameter(){ParameterName="templatecateid", DbType= DbType.Guid, Value = data.TemplateCateId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@pageid,@name,@code,@groupid,@templatecateid";
            var results = await this.ExecuteStoreCommandAsync("[dbo].[msp_Template_AddFromPage] " + storeParam, sqlParams);
            return results;
        }
        public async Task<Tuple<List<TemplateListViewModel>,int>> msp_Template_SearchAsync(TemplateRequestModel query)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="status", DbType= DbType.Int32, Value = query.Status},
                new SqlParameter(){ParameterName="templatecateid", DbType= DbType.Guid, Value = query.TemplateCateId},
                new SqlParameter(){ParameterName="type", DbType= DbType.Int32, Value = query.Type},
                new SqlParameter(){ParameterName="groupid", DbType= DbType.Int32, Value = query.GroupId},
                new SqlParameter(){ParameterName="isstore", DbType= DbType.Boolean, Value = query.IsStore},
                new SqlParameter(){ParameterName="isfree", DbType= DbType.Boolean, Value = query.IsFree},
                new SqlParameter(){ParameterName="iscommunity", DbType= DbType.Boolean, Value = query.IsComunity},
                new SqlParameter(){ParameterName="userid", DbType= DbType.String, Value = query.UserId},
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@limit,@page,@status,@templatecateid,@type,@groupid,@isstore,@isfree,@iscommunity,@userid";
            var results = await this.ExecuteStoreQueryAsync<TemplateListViewModel>("[dbo].[msp_Template_Search] " + storeParam, sqlParams);
            int total = (int)sqlParams[0].Value;
            return new Tuple<List<TemplateListViewModel>, int>(results,total);
        }
        public async Task<Tuple<List<LandingPageSearchResult>,int>> msp_LandingPage_SearchAsync(LandingPageRequestModel query)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="keyword", DbType= DbType.String, Value = query.Keyword},
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="publish", DbType= DbType.Boolean, Value = query.Publish},
                new SqlParameter(){ParameterName="collectionid", DbType= DbType.Guid, Value = query.CollectionId},
                new SqlParameter(){ParameterName="type", DbType= DbType.Int32, Value = query.Type},
                new SqlParameter(){ParameterName="userid", DbType= DbType.String, Value = query.UserId},
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@keyword,@limit,@page,@publish,@collectionid,@type,@userid";
            var results = await this.ExecuteStoreQueryAsync<LandingPageSearchResult>("[dbo].[msp_LandingPage_Search] " + storeParam, sqlParams);
            int total = (int)sqlParams[0].Value;
            return new Tuple<List<LandingPageSearchResult>, int>(results, total);
        }

        public async Task<Tuple<List<LandingPageAdminResult>, int>> msp_Admin_LandingPageByUser(string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="userId", DbType= DbType.String, Value = userId},
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@userId";
            var results = await this.ExecuteStoreQueryAsync<LandingPageAdminResult>("[dbo].[msp_Admin_LandingPageByUser] " + storeParam, sqlParams);
            int total = (int)sqlParams[0].Value;
            return new Tuple<List<LandingPageAdminResult>, int>(results, total);
        }

        public async Task<Tuple<List<LeadSearchResult>,int>> msp_Lead_SearchAsync(LeadSearchRequest query)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="fromdate", DbType= DbType.DateTime, Value = query.FromDate},
                new SqlParameter(){ParameterName="todate", DbType= DbType.DateTime, Value = query.ToDate},
                new SqlParameter(){ParameterName="keyword", DbType= DbType.String, Value = query.Keyword},
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="landingpageid", DbType= DbType.Guid, Value = query.LandingPageId},
                new SqlParameter(){ParameterName="status", DbType= DbType.Int32, Value = query.Status},
                new SqlParameter(){ParameterName="contact", DbType= DbType.Int32, Value = query.Contact},
                new SqlParameter(){ParameterName="region", DbType= DbType.String, Value = query.Region},
                new SqlParameter(){ParameterName="ismobile", DbType= DbType.Boolean, Value = query.IsMobile},
                new SqlParameter(){ParameterName="tagid", DbType= DbType.Int32, Value = query.TagId},
                new SqlParameter(){ParameterName="userid", DbType= DbType.String, Value = query.UserId}
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@fromdate,@todate,@keyword,@limit,@page,@landingpageid,@status,@contact,@region,@ismobile,@tagid,@userid";
            var results = await this.ExecuteStoreQueryAsync<LeadSearchResult>("[dbo].[msp_Lead_Search] " + storeParam, sqlParams);
            int total = (int)sqlParams[0].Value;
            return new Tuple<List<LeadSearchResult>,int>(results,total);
        }

        public async Task<LeadViewModel> msp_Lead_GetById(int id)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="id", DbType= DbType.Int32, Value = id},
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@id";
            var results = await this.ExecuteStoreQueryAsync<LeadViewModel>("[dbo].[msp_Lead_GetById] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<List<IntegrationInfoModel>> msp_IntegrationInfoAsync(int leadId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="leadId", DbType= DbType.Int32, Value = leadId},
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@leadId";
            var results = await this.ExecuteStoreQueryAsync<IntegrationInfoModel>("[dbo].[msp_IntegrationInfo] " + storeParam, sqlParams);
            return results;
        }

        public List<IntegrationInfoModel> msp_IntegrationInfo(int leadId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="leadId", DbType= DbType.Int32, Value = leadId},
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@leadId";
            var results = this.ExecuteStoreQuery<IntegrationInfoModel>("[dbo].[msp_IntegrationInfo] " + storeParam, sqlParams);
            return results;
        }

        public List<LeadToSendIntegrationModel> msp_LeadToSend()
        {
            var results = this.ExecuteStoreQuery<LeadToSendIntegrationModel>("[dbo].[msp_LeadToSend]");
            return results;
        }

        public async Task<List<IntegrationFormViewModel>> msp_IntegrationPageAsync(Guid landingPageId, string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="landingpageid", DbType= DbType.Guid, Value = landingPageId},
                 new SqlParameter(){ParameterName="userid", DbType= DbType.String, Value = userId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@landingpageid, @userid";
            var results = await this.ExecuteStoreQueryAsync<IntegrationFormViewModel>("[dbo].[msp_IntegrationPage] " + storeParam, sqlParams);
            return results;
        }

        public async Task<List<IntegrationFormViewModel>> msp_Integration_DashboardAsync(string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="userid", DbType= DbType.String, Value = userId},
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userid";
            var results = await this.ExecuteStoreQueryAsync<IntegrationFormViewModel>("[dbo].[msp_Integration_Dashboard] " + storeParam, sqlParams);
            return results;
        }

        public async Task<UserDomainExpiredViewModel> msp_GetUserByDomainAsync(string domain)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="domain", DbType= DbType.String, Value = domain},
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@domain";
            var results = await this.ExecuteStoreQueryAsync<UserDomainExpiredViewModel>("[dbo].[msp_GetUserByDomain] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<UserDomainExpiredViewModel> msp_GetUserByPageIdAsync(Guid id)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="id", DbType= DbType.Guid, Value = id},
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@id";
            var results = await this.ExecuteStoreQueryAsync<UserDomainExpiredViewModel>("[dbo].[msp_GetUserByPageId] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<List<ListResult>> msp_GetPublishPage(string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="userid", DbType= DbType.String, Value = userId},
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userid";
            var results = await this.ExecuteStoreQueryAsync<ListResult>("[dbo].[msp_GetPublishPage] " + storeParam, sqlParams);
            return results;
        }

        public async Task<int> msp_LandingPage_TotalPublish(string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="userid", DbType= DbType.String, Value = userId},
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userid";
            var results = await this.ExecuteStoreQueryAsync<CountData>("[dbo].[msp_LandingPage_TotalPublish] " + storeParam, sqlParams);
            return results.FirstOrDefault().Total;
        }

        public async Task<Tuple<List<FileSearchResult>, int>> msp_File_SearchAsync(FileRequestModel query)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="type", DbType= DbType.Int32, Value = query.Type},
                new SqlParameter(){ParameterName="collectionid", DbType= DbType.Guid, Value = query.CollectionId},               
                new SqlParameter(){ParameterName="userid", DbType= DbType.String, Value = query.UserId}
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@limit,@page,@type,@collectionid,@userid";
            var results = await this.ExecuteStoreQueryAsync<FileSearchResult>("[dbo].[msp_File_Search] " + storeParam, sqlParams);
            int total = (int)sqlParams[0].Value;
            return new Tuple<List<FileSearchResult>, int>(results, total);
        }

        public async Task<List<AffilateUserModel>> msp_FrontEnd_GetAffilateByOwner(string ownerId, string action)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@ownerId", DbType= DbType.String, Value = ownerId},
                new SqlParameter(){ParameterName="@action", DbType= DbType.String, Value = action}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@ownerId, @action";
            var results = await this.ExecuteStoreQueryAsync<AffilateUserModel>("[dbo].[msp_FrontEnd_GetAffilateByOwner] " + storeParam, sqlParams);
            return results;
        }

        public async Task<AffilateSummaryModel> msp_FrontEnd_GetAffilateSummary(string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@userId", DbType= DbType.String, Value = userId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId";
            var results = await this.ExecuteStoreQueryAsync<AffilateSummaryModel>("[dbo].[msp_FrontEnd_GetAffilateSummary] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<AffilateSummaryMobileModel> msp_FrontEnd_GetAffilateSummary_Mobile(string userId, int monthId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@userId", DbType= DbType.String, Value = userId},
                new SqlParameter(){ParameterName="@monthId", DbType= DbType.Int32, Value = monthId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId,@monthId";
            var results = await this.ExecuteStoreQueryAsync<AffilateSummaryMobileModel>("[dbo].[msp_FrontEnd_GetAffilateSummary_Mobile] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }
        #endregion

        #region Report- chart
        public async Task<List<AffilateChartViewModel>> msp_Affilate_Chart_Subcrible(string ownerId, string timeType="")
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@ownerId", DbType= DbType.String, Value = ownerId},
                new SqlParameter(){ParameterName="@timeType", DbType= DbType.String, Value = timeType}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@ownerId, @timeType";
            var results = await this.ExecuteStoreQueryAsync<AffilateChartViewModel>("[dbo].[msp_Affilate_Chart_Subcrible] " + storeParam, sqlParams);
            return results;
        }

        public async Task<List<LeadChartViewModel>> msp_Lead_Chart_Subcrible(string userId, string timeType = "")
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@userId", DbType= DbType.String, Value = userId},
                new SqlParameter(){ParameterName="@timeType", DbType= DbType.String, Value = timeType}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId, @timeType";
            var results = await this.ExecuteStoreQueryAsync<LeadChartViewModel>("[dbo].[msp_Lead_Chart_Subcrible] " + storeParam, sqlParams);
            return results;
        }

        public async Task<LeadChartSummaryViewModel> msp_Lead_Chart_Summary(string userId, string timeType = "")
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@userId", DbType= DbType.String, Value = userId},
                new SqlParameter(){ParameterName="@timeType", DbType= DbType.String, Value = timeType}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId, @timeType";
            var results = await this.ExecuteStoreQueryAsync<LeadChartSummaryViewModel>("[dbo].[msp_Lead_Chart_Summary] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<List<LeadHistoryViewModel>> msp_Lead_GetHistoryByPhoneOrEmail(string userId, string email,string phone)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@userid", DbType= DbType.String, Value = userId},
                new SqlParameter(){ParameterName="@email", DbType= DbType.String, Value = email},
                new SqlParameter(){ParameterName="@phone", DbType= DbType.String, Value = phone}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId, @email, @phone";
            var results = await this.ExecuteStoreQueryAsync<LeadHistoryViewModel>("[dbo].[msp_Lead_GetHistoryByPhoneOrEmail] " + storeParam, sqlParams);
            return results;
        }

        public async Task<DashboardSummaryViewModel> msp_Report_Summary(string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@userId", DbType= DbType.String, Value = userId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId";
            var results = await this.ExecuteStoreQueryAsync<DashboardSummaryViewModel>("[dbo].[msp_Report_Summary] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<InvoiceOrderViewModel> msp_Invoice_GetByCode(string code)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@code", DbType= DbType.String, Value = code}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@code";
            var results = await this.ExecuteStoreQueryAsync<InvoiceOrderViewModel>("[dbo].[msp_Invoice_GetByCode] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<List<DomainViewModel>> msp_Domain_GetByUser(string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@userId", DbType= DbType.String, Value = userId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId";
            var results = await this.ExecuteStoreQueryAsync<DomainViewModel>("[dbo].[msp_Domain_GetByUser] " + storeParam, sqlParams);
            return results;
        }

        public async Task<List<HistoryViewModel>> msp_HistoryPage_GetByLandingPage(Guid landingPageId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@landingPageId", DbType= DbType.Guid, Value = landingPageId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@landingPageId";
            var results = await this.ExecuteStoreQueryAsync<HistoryViewModel>("[dbo].[msp_HistoryPage_GetByLandingPage] " + storeParam, sqlParams);
            return results;
        }

        public async Task<List<HistoryPage>> msp_HistoryPage_GetById(long id, Guid landingPageId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@id", DbType= DbType.Int64, Value = id},
                new SqlParameter(){ParameterName="@landingPageId", DbType= DbType.Guid, Value = landingPageId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@id, @landingPageId";
            var results = await this.ExecuteStoreQueryAsync<HistoryPage>("[dbo].[msp_HistoryPage_GetById] " + storeParam, sqlParams);
            return results;
        }
        #endregion

        #region Email Marketing
        public async Task<List<EmailTemplateListViewModel>> msp_EmailTemplate_GetByUser(string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@userId", DbType= DbType.String, Value = userId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId";
            var results = await this.ExecuteStoreQueryAsync<EmailTemplateListViewModel>("[dbo].[msp_EmailTemplate_GetByUser] " + storeParam, sqlParams);
            return results;
        }

        public async Task<List<EmailTemplateListViewModel>> msp_EmailTemplate_GetNotUseOnPage(string userId, Guid pageId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@pageId", DbType= DbType.Guid, Value = pageId},
                new SqlParameter(){ParameterName="@userId", DbType= DbType.String, Value = userId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@pageId, @userId";
            var results = await this.ExecuteStoreQueryAsync<EmailTemplateListViewModel>("[dbo].[msp_EmailTemplate_GetNotUseOnPage] " + storeParam, sqlParams);
            return results;
        }
        

        public async Task<List<SendMailTrackingViewModel>> msp_SendMail_ByLeadId(int leadId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@leadId", DbType= DbType.Int32, Value = leadId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@leadId";
            var results = await this.ExecuteStoreQueryAsync<SendMailTrackingViewModel>("[dbo].[msp_SendMail_ByLeadId] " + storeParam, sqlParams);
            return results;
        }
        #endregion

        #region For Tracking
        public async Task<LandingPageIdModel> msp_LandingPage_GetIdByDomain(string domain)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="domain", DbType= DbType.String, Value = domain},
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@domain";
            var results = await this.ExecuteStoreQueryAsync<LandingPageIdModel>("[dbo].[msp_LandingPage_GetIdByDomain] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<List<LandingPageIdModel>> msp_LandingPage_GetByBaseDomain(string domain)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="domain", DbType= DbType.String, Value = domain},
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@domain";
            var results = await this.ExecuteStoreQueryAsync<LandingPageIdModel>("[dbo].[msp_LandingPage_GetByBaseDomain] " + storeParam, sqlParams);
            return results.ToList();
        }

        public List<PublishPage> msp_PublishPage_GetForSysTracking()
        {
            var results = this.ExecuteStoreQuery<PublishPage>("[dbo].[msp_PublishPage_GetForSysTracking]");
            return results;
        }

        public async Task<int> msp_Lead_AddTag(int leadId, int tagId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="id", DbType= DbType.Int32, Value = leadId},
                new SqlParameter(){ParameterName="tag", DbType= DbType.Int32, Value = tagId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@id,@tag";
            var results = await this.ExecuteStoreCommandAsync("[dbo].[msp_Lead_AddTag] " + storeParam, sqlParams);
            return results;
        }

        public async Task<int> msp_Lead_RemoveTag(int leadId, int tagId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="id", DbType= DbType.Int32, Value = leadId},
                new SqlParameter(){ParameterName="tag", DbType= DbType.Int32, Value = tagId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@id,@tag";
            var results = await this.ExecuteStoreCommandAsync("[dbo].[msp_Lead_RemoveTag] " + storeParam, sqlParams);
            return results;
        }

        public async Task<int> msp_LeadTag_Remove(int id)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="id", DbType= DbType.Int32, Value = id}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@id";
            var results = await this.ExecuteStoreCommandAsync("[dbo].[msp_LeadTag_Remove] " + storeParam, sqlParams);
            return results;
        }

        public async Task<List<LeadFilterViewModel>> msp_LeadFilter_GetByUser(string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="userId", DbType= DbType.String, Value = userId},
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId";
            var results = await this.ExecuteStoreQueryAsync<LeadFilterViewModel>("[dbo].[msp_LeadFilter_GetByUser] " + storeParam, sqlParams);
            return results.ToList();
        }
        #endregion

        #region UserProfile
        public async Task<Tuple<List<UserProfileListViewModel>,int>> msp_UserProfile_Search(UserProfileQuery query)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},               
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="keyword", DbType= DbType.String, Value = query.Keyword},
                new SqlParameter(){ParameterName="fromdate", DbType= DbType.DateTime, Value = query.FromDate},
                new SqlParameter(){ParameterName="todate", DbType= DbType.DateTime, Value = query.ToDate},
                new SqlParameter(){ParameterName="datetype", DbType= DbType.Int32, Value = query.DateType},
                new SqlParameter(){ParameterName="level", DbType= DbType.Int32, Value = query.Level},
                new SqlParameter(){ParameterName="role", DbType= DbType.String, Value = query.Role},
                new SqlParameter(){ParameterName="userstatus", DbType= DbType.Int32, Value = query.UserStatus},
                new SqlParameter(){ParameterName="systemstatus", DbType= DbType.Int32, Value = query.SystemStatus},
                new SqlParameter(){ParameterName="staffid", DbType= DbType.String, Value = query.StaffId}
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@limit,@page,@keyword,@fromdate,@todate,@datetype,@level,@role,@userstatus,@systemstatus,@staffid";
            var results = await this.ExecuteStoreQueryAsync<UserProfileListViewModel>("[dbo].[msp_UserProfile_Search] " + storeParam, sqlParams);
            int total = (int)sqlParams[0].Value;
            return new Tuple<List<UserProfileListViewModel>, int>(results, total);
        }

        public async Task<int> msp_UserProfile_ChangeRole(string userId, string roleId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="userId", DbType= DbType.String, Value = userId},
                new SqlParameter(){ParameterName="roleId", DbType= DbType.String, Value = roleId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId,@roleId";
            var results = await this.ExecuteStoreCommandAsync("[dbo].[msp_UserProfile_ChangeRole] " + storeParam, sqlParams);
            return results;
        }

        public async Task<List<StaffProfileViewModel>> msp_UserProfile_GetStaffByCustomer(string customerid)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="customerId", DbType= DbType.String, Value = customerid},
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@customerid";
            var results = await this.ExecuteStoreQueryAsync<StaffProfileViewModel>("[dbo].[msp_UserProfile_GetStaffByCustomer] " + storeParam, sqlParams);
            return results.ToList();
        }
        #endregion

        #region Email AutoResponse
        public async Task<List<UserIntegartionEmailModel>> msp_Integration_GetByUserAndType(string userId, int siteId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="userId", DbType= DbType.String, Value = userId},
                new SqlParameter(){ParameterName="siteId", DbType= DbType.Int32, Value = siteId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId,@siteId";
            var results = await this.ExecuteStoreQueryAsync<UserIntegartionEmailModel>("[dbo].[msp_Integration_GetByUserAndType] " + storeParam, sqlParams);
            return results.ToList();
        }
        #endregion

        #region Sms AutoResponse
        public async Task<List<UserIntegartionSmsModel>> msp_Integration_GetByUserAndType_Sms(string userId, int siteId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="userId", DbType= DbType.String, Value = userId},
                new SqlParameter(){ParameterName="siteId", DbType= DbType.Int32, Value = siteId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId,@siteId";
            var results = await this.ExecuteStoreQueryAsync<UserIntegartionSmsModel>("[dbo].[msp_Integration_GetByUserAndType_Sms] " + storeParam, sqlParams);
            return results.ToList();
        }
        #endregion

        #region system
        public async Task<int> msp_Sys_Delete_User_Permement(string email)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="userName", DbType= DbType.String, Value = email}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userName";
            var results = await this.ExecuteStoreCommandAsync("[dbo].[msp_Sys_Delete_User_Permement] " + storeParam, sqlParams);
            return results;
        }
        #endregion

        #region External Publish
        public async Task<List<IntergationPagePublishViewModel>> msp_Intergration_GetPublishVendor(string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                 new SqlParameter(){ParameterName="userId", DbType= DbType.String, Value = userId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId";
            var results = await this.ExecuteStoreQueryAsync<IntergationPagePublishViewModel>("[dbo].[msp_Intergration_GetPublishVendor] " + storeParam, sqlParams);
            return results;
        }

        public async Task<IntergationPagePublishViewModel> msp_Intergration_GetByAccId(string userId,string accId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                 new SqlParameter(){ParameterName="userId", DbType= DbType.String, Value = userId},
                  new SqlParameter(){ParameterName="accId", DbType= DbType.String, Value = accId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId,@accId";
            var results = await this.ExecuteStoreQueryAsync<IntergationPagePublishViewModel>("[dbo].[msp_Intergration_GetByAccId] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        #endregion

        #region Invoice
        public async Task<Tuple<List<InvoiceViewModel>, int>> msp_Invoice_Search(InvoiceQuery query)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="keyword", DbType= DbType.String, Value = query.Keyword},
                new SqlParameter(){ParameterName="fromdate", DbType= DbType.DateTime, Value = query.FromDate},
                new SqlParameter(){ParameterName="todate", DbType= DbType.DateTime, Value = query.ToDate},
                new SqlParameter(){ParameterName="datetype", DbType= DbType.Int32, Value = query.DateType},
                new SqlParameter(){ParameterName="serviceid", DbType= DbType.Int32, Value = query.ServiceId},
                new SqlParameter(){ParameterName="paymenttype", DbType= DbType.Int32, Value = query.PaymentType},
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@limit,@page,@keyword,@fromdate,@todate,@datetype,@serviceid,@paymenttype";
            var results = await this.ExecuteStoreQueryAsync<InvoiceViewModel>("[dbo].[msp_Invoice_Search] " + storeParam, sqlParams);
            int total = (int)sqlParams[0].Value;
            return new Tuple<List<InvoiceViewModel>, int>(results, total);
        }
        #endregion

        #region Promotion
        public async Task<PromotionViewModel> msp_Promotion_UseByCode(int serviceId, string code)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@serviceId", DbType= DbType.Int32, Value = serviceId},
                new SqlParameter(){ParameterName="@code", DbType= DbType.String, Value = code},
                new SqlParameter(){ParameterName="@date", DbType= DbType.DateTime, Value = DateTime.Now}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@serviceId,@code,@date";
            var results = await this.ExecuteStoreQueryAsync<PromotionViewModel>("[dbo].[msp_Promotion_UseByCode] " + storeParam, sqlParams);
            return results.FirstOrDefault();
        }

        public async Task<Tuple<List<PromotionSearchViewModel>, int>> msp_Promotion_Search(PromotionQuery query)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="keyword", DbType= DbType.String, Value = query.Keyword},
                new SqlParameter(){ParameterName="fromdate", DbType= DbType.DateTime, Value = query.FromDate},
                new SqlParameter(){ParameterName="todate", DbType= DbType.DateTime, Value = query.ToDate},
                new SqlParameter(){ParameterName="datetype", DbType= DbType.Int32, Value = query.DateType},
                new SqlParameter(){ParameterName="serviceid", DbType= DbType.Int32, Value = query.ServiceId}
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@limit,@page,@keyword,@fromdate,@todate,@datetype,@serviceid";
            var results = await this.ExecuteStoreQueryAsync<PromotionSearchViewModel>("[dbo].[msp_Promotion_Search] " + storeParam, sqlParams);
            int total = (int)sqlParams[0].Value;
            return new Tuple<List<PromotionSearchViewModel>, int>(results, total);
        }

        public async Task<Tuple<List<PromotionCodeSearchViewModel>, int>> msp_PromotionCode_Search(PromotionCodeQuery query)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="keyword", DbType= DbType.String, Value = query.Keyword},
                new SqlParameter(){ParameterName="fromdate", DbType= DbType.DateTime, Value = query.FromDate},
                new SqlParameter(){ParameterName="todate", DbType= DbType.DateTime, Value = query.ToDate},
                new SqlParameter(){ParameterName="datetype", DbType= DbType.Int32, Value = query.DateType},
                new SqlParameter(){ParameterName="promotionid", DbType= DbType.Int32, Value = query.PromotionId}
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@limit,@page,@keyword,@fromdate,@todate,@datetype,@promotionid";
            var results = await this.ExecuteStoreQueryAsync<PromotionCodeSearchViewModel>("[dbo].[msp_PromotionCode_Search] " + storeParam, sqlParams);
            int total = (int)sqlParams[0].Value;
            return new Tuple<List<PromotionCodeSearchViewModel>, int>(results, total);
        }

        public async Task<List<OptionViewModel>> msp_Promotion_GetForEnum()
        {
            var results = await this.ExecuteStoreQueryAsync<OptionViewModel>("[dbo].[msp_Promotion_GetForEnum]");
            return results.ToList();
        }
        #endregion

        #region template
        public async Task<int> msp_sys_ReplaceTemplateSource(string keyword, string replacement)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@keyword", DbType= DbType.String, Value = keyword},
                new SqlParameter(){ParameterName="@replacement", DbType= DbType.String, Value = replacement}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@keyword,@replacement";
            var results = await this.ExecuteStoreCommandAsync("[dbo].[msp_sys_ReplaceTemplateSource] " + storeParam, sqlParams);
            return results;
        }
        #endregion

        #region Image Stock
        public async Task<List<ImageStockResult>> msp_ImageStock_GetByCate(Guid cateId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                 new SqlParameter(){ParameterName="cateId", DbType= DbType.Guid, Value = cateId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@cateId";
            var results = await this.ExecuteStoreQueryAsync<ImageStockResult>("[dbo].[msp_ImageStock_GetByCate] " + storeParam, sqlParams);
            return results;
        }

        public async Task<Tuple<List<ImageStockResult>, int>> msp_ImageStock_SearchAsync(FileRequestModel query)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="cateid", DbType= DbType.Guid, Value = query.CollectionId}
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@limit,@page,@cateid";
            var results = await this.ExecuteStoreQueryAsync<ImageStockResult>("[dbo].[msp_ImageStock_Search] " + storeParam, sqlParams);
            int total = (int)sqlParams[0].Value;
            return new Tuple<List<ImageStockResult>, int>(results, total);
        }
        #endregion

        #region Automation
        public async Task<List<AutomationViewModel>> msp_Automation_GetByUser(string userId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@userId", DbType= DbType.String, Value = userId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@userId";
            var results = await this.ExecuteStoreQueryAsync<AutomationViewModel>("[dbo].[msp_Automation_GetByUser] " + storeParam, sqlParams);
            return results;
        }
        public async Task<List<AutomationViewModel>> msp_Automation_GetByPage(Guid pageId)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="@pageId", DbType= DbType.Guid, Value = pageId}
            };

            this.DBNullValue(sqlParams);
            var storeParam = "@pageId";
            var results = await this.ExecuteStoreQueryAsync<AutomationViewModel>("[dbo].[msp_Automation_GetByPage] " + storeParam, sqlParams);
            return results;
        }
        #endregion

        #region Ticket
        public async Task<Tuple<List<TicketViewModel>,int>> msp_Ticket_Search(TicketSearchRequest query)
        {
            SqlParameter[] sqlParams = new SqlParameter[]{
                new SqlParameter(){ParameterName="total", DbType= DbType.Int32, Value = 0,Direction = ParameterDirection.Output},
                new SqlParameter(){ParameterName="keyword", DbType= DbType.String, Value = query.Keyword},
                new SqlParameter(){ParameterName="limit", DbType= DbType.Int32, Value = query.Limit},
                new SqlParameter(){ParameterName="page", DbType= DbType.Int32, Value = query.Page},
                new SqlParameter(){ParameterName="status", DbType= DbType.Int32, Value = query.Status},
                new SqlParameter(){ParameterName="userid", DbType= DbType.String, Value = query.UserId}
            };

            this.DBNullValue(sqlParams);

            var storeParam = "@total OUTPUT,@limit,@page,@status,@keyword,@userid";
            var results = await this.ExecuteStoreQueryAsync<TicketViewModel>("[dbo].[msp_Ticket_Search] " + storeParam, sqlParams);
            int total = (int)sqlParams[0].Value;
            return new Tuple<List<TicketViewModel>, int>(results,total);
        }
        #endregion
    }
}
