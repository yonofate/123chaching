using Punnel.Core.Entities;
using Punnel.Core.Entities.Integration.GoogleSheet;
using Punnel.Core.Entities.Model;
using Punnel.EmailServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public partial class IntegrationRepository
    {
        public Integration GoogleSheet_Auth(string userId,string email="", string apiKey="")
        {
            Integration result = new Integration();
            GoogleSheetSvc task = new GoogleSheetSvc(apiKey);
            var res = task.Auth();
            if (res.Code==System.Net.HttpStatusCode.OK)
            {
                var token_json = res.Data.ToString();
                //save info
                var info = new Integration()
                {
                    Id = Guid.NewGuid(),
                    SiteId = (int)IntegrationType.GoogleSheet,
                    AccId = email,
                    Email = email,
                    ApiKey = apiKey,
                    UserId = userId,
                    LastConnectedDate = DateTime.Now,
                    TokenJson = token_json
                };
                IU(info, userId);
                result = info;
            }
            else
            {
                throw new BusinessException("Không thể kết nối Google Sheet!");
            }
            return result;
        }

        public SpreadPunnelSheetViewModel GoogleSheet_GetSheets(string userId, string accId, string spreedSheetId, Guid pageId)
        {
            var apiSite = _dbSet.AsNoTracking().FirstOrDefault(x => x.UserId == userId && x.AccId == accId && x.SiteId == (int)IntegrationType.GoogleSheet);
            if (apiSite == null)
            {
                throw new BusinessException("Thông tin không tồn tại");
            }

            GoogleSheetSvc task = new GoogleSheetSvc(apiSite.ApiKey, apiSite.TokenJson);
            var res = task.GetSheetsBySpreadSheetId(spreedSheetId);
            if(res.Code!= System.Net.HttpStatusCode.OK)
            {
                throw new BusinessException(res.Message);
            }
            var result = (SpreadPunnelSheetViewModel)res.Data;
            FormConfig frmConfig = new FormConfig()
            {
                LandingPageId = pageId,
                IntegrationId = apiSite.Id,
                ListId = result.Id,
                ListName = result.Name
            };
            uow.FormConfig.IU(frmConfig);
            return result;
        }

        public SpreadPunnelSheetViewModel GoogleSheet_CreateSpreadSheet(string userId, string accId, string spreedSheetName, Guid pageId)
        {
            var apiSite = _dbSet.AsNoTracking().FirstOrDefault(x => x.UserId == userId && x.AccId == accId && x.SiteId==(int)IntegrationType.GoogleSheet);
            if (apiSite == null)
            {
                throw new BusinessException("Thông tin không tồn tại");
            }

            GoogleSheetSvc task = new GoogleSheetSvc(apiSite.ApiKey, apiSite.TokenJson);
            var res = task.CreateSpreadSheet(spreedSheetName);
            if (res.Code != System.Net.HttpStatusCode.OK)
            {
                throw new BusinessException(res.Message);
            }
            var result = (SpreadPunnelSheetViewModel)res.Data;
            FormConfig frmConfig = new FormConfig()
            {
                LandingPageId = pageId,
                IntegrationId = apiSite.Id,
                ListId = result.Id,
                ListName = spreedSheetName
            };
            uow.FormConfig.IU(frmConfig);
            return result;
        }
    }
}
