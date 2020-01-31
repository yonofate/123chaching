using System;
using Punnel.Core.Entities.Model;
using System.Collections.Generic;
using Punnel.Core.Entities.ViewModel;
using System.Threading.Tasks;
using Punnel.Core.Entities.Integration.GoogleSheet;
using Punnel.Core.Entities;
using System.Collections.Specialized;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.Integration.ActiveCampain;
using Punnel.Core.Entities.Integration.InfusionSoft;
using Punnel.Core.Entities.Integration.Autopilot;

namespace Punnel.Core.BLL.Repositories
{
    public interface IIntegrationRepository: IBaseRepository<Integration>
    {
        Task<List<UserIntegartionEmailModel>> GetByUserAndType(string userId, int siteId);
        Task<List<IntegrationFormViewModel>> GetIntegrationSitesAsync(string userId);
        Task<List<IntegrationFormViewModel>> GetIntegrationSitesByPageAsync(Guid landingPageId, string userId);
        Task<List<IntergationPagePublishViewModel>> GetIntegrationPublishPage(string userId);
        Task<IntergationPagePublishViewModel> GetIntegrationByAccId(string userId, string accId);
        void IU(Integration obj, string userId);
        void Disconnect(Integration obj, string userId);
        Integration GetResponse_Auth(string apiKey, string userId);
        List<Entities.Integration.GetResponse.CampainResponse> GetResponse_GetCampains(string userId, string accId);
        Integration GetByApiKey(int siteId, string apiKey);
        Integration GetByAccId(string userId, int siteId, string accId);
        Integration MailChimp_Auth(string apiKey, string userId);
        List<Entities.Integration.MailChimp.CampainResponseItem> MailChimp_GetCampains(string userId, string accId);

        Integration Gmail_Auth(string userId, string email="",string apiKey = "");
        void Gmail_SendMail(string userId, string accId);

        Integration GoogleSheet_Auth(string userId, string email = "", string apiKey="");
        SpreadPunnelSheetViewModel GoogleSheet_GetSheets(string userId, string accId, string spreedSheetId, Guid pageId);
        SpreadPunnelSheetViewModel GoogleSheet_CreateSpreadSheet(string userId, string accId, string spreedSheetName, Guid pageId);
        void Delete(Guid id, string userId);
        bool Exists(Guid id);
        Task<ApiResponse> Refresh(Guid id, string userId);
        Task Remove(Guid id, string userId);

        #region Shopify
        Uri Shopify_BuildPageAuthUri(string shopUrl);
        Task<Integration> Shopify_Auth(string shopUrl, string accessToken, string userId);
        Task<string> Shopify_GetAccessToken(NameValueCollection query);
        Task<PublishPageResponseModel> Shopify_IU(PublishExternalRequestModel data, string userId);
        #endregion

        #region Haravan
        Uri Haravan_BuildPageAuthUri(string shopUrl);
        Task<Integration> Haravan_Auth(string shopUrl, string accessToken, string userId);
        Task<Tuple<string,string>> Haravan_GetAccessToken(string code);
        Task<PublishPageResponseModel> Haravan_IU(PublishExternalRequestModel data, string userId);
        #endregion

        #region Sapo
        Uri Sapo_BuildPageAuthUri(string shopUrl);
        Task<Integration> Sapo_Auth(string shopUrl, string accessToken, string userId);
        Task<string> Sapo_GetAccessToken(NameValueCollection query, string userId = "");
        Task<PublishPageResponseModel> Sapo_IU(PublishExternalRequestModel data, string userId);
        #endregion

        #region Wordpress
        Task<Integration> WP_Auth(string apiUrl, string apiToken, string userId);
        Task<PublishPageResponseModel> WP_IU(PublishExternalRequestModel data, string userId);
        #endregion

        #region Ftp
        Integration Ftp_Auth(string host, string userName, string password, string userId);
        Task<PublishPageResponseModel> Ftp_IU(PublishExternalRequestModel data, string userId);
        #endregion

        #region Sms
        Integration Sms_Auth(string name, string sim1, string sim2,string pin, string userId);
        Task<List<UserIntegartionSmsModel>> GetByUserAndTypeSms(string userId, int siteId);
        #endregion

        #region InfusionSoft
        Integration InfusionSoft_Auth(string code, string userId);
        List<InfusionSoftTag> InfusionSoft_Auth_GetCampains(string userId, string accId);
        void AddContact();
        #endregion

        #region ActiveCampain
        Integration ActiveCampain_Auth(string url, string apiKey, string userId);
        List<Entities.Integration.ActiveCampain.CampainItemResponse> ActiveCampain_GetCampains(string userId, string accId);
        void ActiveCampain_AddContact();
        #endregion

        #region Autopilot
        Integration Autopilot_Auth(string apiKey, string userId);
        List<AutopilotCampainItemResponse> Autopilot_GetCampains(string userId, string accId);
        void Autopilot_AddContact();
        #endregion
    }
}