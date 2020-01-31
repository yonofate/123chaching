using log4net;
using Punnel.Api.Models;
using Punnel.Core.BLL.Services;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class LeadRepository : BaseRepository<Lead>, ILeadRepository
    {
        private static readonly ILog _log = LogManager.GetLogger("LeadRepository");
        private static readonly string BUIlDER_DOMAIN = MBN.Utils.WebUtils.AppSettings("BUIlDER_DOMAIN", "app.punnel.com");
        public LeadRepository(IUow uow) : base(uow) { }

        public async Task IU(Lead obj)
        {
            obj.BeforeUpdate();
            var m = _dbSet.FirstOrDefault(x=>x.Id== obj.Id);
            if (m == null)
            {
                if (_dbSet.AsNoTracking().Any(x => x.LandingPageId == obj.LandingPageId && x.Email == obj.Email && x.Id != obj.Id && string.IsNullOrEmpty(obj.Email) == false))
                {
                    throw new BusinessException(Punnel.Core.Entities.Resources.Messages.Email_exist);
                }
                if (_dbSet.AsNoTracking().Any(x => x.LandingPageId == obj.LandingPageId && x.Phone == obj.Phone && x.Id != obj.Id && string.IsNullOrEmpty(obj.Phone) == false))
                {
                    throw new BusinessException(Punnel.Core.Entities.Resources.Messages.Phone_exist1);
                }

                this.Add(obj);
            }
            else
            {
                if (_dbSet.AsNoTracking().Any(x => x.Id != obj.Id && x.LandingPageId == obj.LandingPageId && x.Email == obj.Email && x.Id != obj.Id && string.IsNullOrEmpty(obj.Email) == false))
                {
                    throw new BusinessException(Punnel.Core.Entities.Resources.Messages.Email_exist);
                }
                if (_dbSet.AsNoTracking().Any(x => x.Id != obj.Id && x.LandingPageId == obj.LandingPageId && x.Phone == obj.Phone && x.Id != obj.Id && string.IsNullOrEmpty(obj.Phone) == false))
                {
                    throw new BusinessException(Punnel.Core.Entities.Resources.Messages.Phone_exist1);
                }

                if (IsOwnerOrAdmin(m.UserId, obj.UserId) == false) return;
                m.Status = obj.Status;
                m.Notes = obj.Notes;
                m.Phone = obj.Phone;
                m.Email = obj.Email;
                m.FullName = obj.FullName;
                m.FirstName = obj.FirstName;
                m.LastName = obj.LastName;
                m.Status = obj.Status;
                //if (obj.IsVerifyEmail == true && string.IsNullOrEmpty(m.Email)==false)
                //{
                //    await uow.PunnelTracking.UpdateEmailStatus(m.Email, EmailStatus.Verified);
                //}
                //if (obj.IsVerifyMobile == true && string.IsNullOrEmpty(m.Phone) == false)
                //{
                //    await uow.PunnelTracking.UpdateMobileStatus(m.Phone, MobileStatus.Verified);
                //}
            }
            this.Commit();
        }

        public void UpdateStatus(Lead obj)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == obj.Id);
            if (m != null)
            {
                if (IsOwnerOrAdmin(m.UserId, obj.UserId) == false) return;
                m.Status = obj.Status;
            }
            this.Commit();
        }

        public async Task<LeadViewModel> GetById(int id, string userId)
        {
            var res= await (_dbContext as Model.PunnelContext).msp_Lead_GetById(id);
            if (res == null)
            {
                throw new BusinessException("Thông tin này đã bị xóa!");
            }
            if (IsOwnerOrAdmin(userId, res.UserId) == false) return null;
            return res;
        }

        public async Task<Tuple<List<LeadSearchResult>,int>> SearchAsync(LeadSearchRequest req)
        {
            return await (_dbContext as Model.PunnelContext).msp_Lead_SearchAsync(req);
        }

        public async Task<List<LeadChartViewModel>> GetChartSubcrible(string userId, string timeType = "")
        {
            return await (_dbContext as Model.PunnelContext).msp_Lead_Chart_Subcrible(userId, timeType);
        }

        public async Task<LeadChartSummaryViewModel> GetChartSummary(string userId, string timeType = "")
        {
            return await (_dbContext as Model.PunnelContext).msp_Lead_Chart_Summary(userId, timeType);
        }

        public async Task<DashboardSummaryViewModel> GetDashboardSummary(string userId)
        {
            return await (_dbContext as Model.PunnelContext).msp_Report_Summary(userId);
        }

        public async Task<List<LeadHistoryViewModel>> GetHistoryByPhoneOrEmail(string userId, string email, string phone)
        {
            return await (_dbContext as Model.PunnelContext).msp_Lead_GetHistoryByPhoneOrEmail(userId, email,phone);
        }

        public async Task<Lead> Add(Core.Entities.RequestModel.FormDataRequest data)
        {
            var page = await uow.LandingPage.GetPageForSubcrible(data.id);
            if (page == null)
            {
                throw new BusinessException("Landing page không tồn tại");
            }
            Lead lead = new Lead();
            lead.UserId = page.UserId;
            lead.LandingPageId = data.id;
            lead.PrivateCode = DateTime.Now.GetHashCode().ToString("x").ToUpper();
            lead.SubmitDate = DateTime.Now;
            lead.IpAddress = data.IpAddress;
            lead.IsMobile = data.IsMobile.Value;
            lead.Referer = "";
            var frmAttrs = data.dataForm.ToList();           
            int auto_email_template = 0;
            List<Entities.RequestModel.FormData> extData = new List<Entities.RequestModel.FormData>();
            foreach (var item in frmAttrs)
            {
                switch (item.name)
                {
                    case "name":
                        lead.FullName = item.value;
                        break;
                    case "email":
                        lead.Email = item.value;
                        break;
                    case "phone":
                        lead.Phone = item.value;
                        break;
                    //case "message":
                    //    lead.Notes = item.value;
                    //    break;
                    case "url page":
                        lead.Link = (item.value + "@").Replace("/@", "").Replace("@", "");
                        break;
                    case "url_page":
                        lead.Link = (item.value + "@").Replace("/@", "").Replace("@","");
                        break;
                    case "auto_rep":
                        if (!string.IsNullOrEmpty(item.value))
                        {
                            auto_email_template = int.Parse(item.value);
                        }
                        break;
                    default:
                        if (string.IsNullOrEmpty(item.value) == false)
                        {
                            extData.Add(item);
                        }
                        break;
                }
            }

            //_log.Warn(lead.Link);
            //_log.Warn(page.Domain);
            //Nếu đăng kí từ trang preview
            if (lead.Link.Contains(BUIlDER_DOMAIN)){
                return lead;
            }
            //else if (Utils.CommonUtils.GetDomainFromUrl(lead.Link) != Utils.CommonUtils.GetDomainFromUrl(page.Domain))
            //{
            //    _log.Warn("Xin lỗi! Đăng kí không thể thực hiện từ url " + lead.Link + " , domain: " + page.Domain);
            //    throw new BusinessException("Xin lỗi! Đăng kí chỉ thực hiện được từ địa chỉ chính thức của Landing Page này.");
            //}

            lead.JsonData = Newtonsoft.Json.JsonConvert.SerializeObject(extData);
            lead.BeforeUpdate();
            int leadId = 0, count =0;
            bool k = false;
            var m = _dbSet.FirstOrDefault(x=>x.LandingPageId==lead.LandingPageId && x.Email == lead.Email && x.Phone==lead.Phone);
            if (m == null || (string.IsNullOrEmpty(lead.Email) && string.IsNullOrEmpty(lead.Phone)))
            {
                lead.SubmitDate = DateTime.Now;
                lead.SubmitCount = 1;
                count = 1;
                this.Add(lead);
                this.Commit();
                leadId = lead.Id;
            }
            else
            {
                m.FullName = lead.FullName;
                m.FirstName = lead.FirstName;
                m.LastName = lead.LastName;
                m.Notes = lead.Notes;
                m.IpAddress = lead.IpAddress;
                m.Link = lead.Link;
                m.SubmitDate = DateTime.Now;
                m.SubmitCount++;
                count = m.SubmitCount;
                m.Status = 1;
                m.SystemNote = $"Khách liên hệ lần {m.SubmitCount}";
                this.Commit();
                leadId = m.Id;
                k = true;
            }          

            //if (auto_email_template > 0)
            //{
            //    if (leadId == 0)
            //    {
            //        _log.Warn("Lead id: 0");
            //    }
            //    if (uow.EmailTemplate.Exists(auto_email_template) && count<3)
            //    {
            //        var emailAuto = new MailToSend()
            //        {
            //            LeadId = leadId,
            //            TemplateId = auto_email_template,
            //            UserId = page.UserId,
            //            WillSendDate = DateTime.Now
            //        };
            //        uow.MailToSend.IU(emailAuto);

            //        var list = GetLeadsToSendAutomation();
            //        var r = SendAutomation(list.FirstOrDefault());
            //    }
            //}
            //else
            //{
                


            //    //check automation
            //    //var automations = await uow.Automation.GetByPage(page.Id);
            //    //foreach(var item in automations.Where(x=>x.IsEnable))
            //    //{
            //    //    var emailAuto = new MailToSend()
            //    //    {
            //    //        LeadId = leadId,
            //    //        TemplateId = item.TemplateId,
            //    //        UserId = page.UserId,
            //    //        WillSendDate = DateTime.Now.AddHours(item.DelayHour).AddMinutes(item.DelayMin)
            //    //    };

            //    //    uow.MailToSend.IU(emailAuto);


            //    //    var list = GetLeadsToSendAutomation();
            //    //    var r = SendAutomation(list.FirstOrDefault(x=>x.UserId==page.UserId && x.TemplateId==item.TemplateId && x.LeadId==leadId));
            //    //}
            //}


            var res= k==true? m: lead;
            return res;
        }

        public async Task AddSendAutomation(AutomationRequestModel data)
        {
            //check automation
            var automations = await uow.Automation.GetByPage(data.PageId);
            foreach (var item in automations.Where(x => x.IsEnable))
            {
                var emailAuto = new MailToSend()
                {
                    LeadId = data.LeadId,
                    TemplateId = item.TemplateId,
                    UserId = data.UserId,
                    WillSendDate = DateTime.Now.AddHours(item.DelayHour).AddMinutes(item.DelayMin)
                };

                uow.MailToSend.IU(emailAuto);
                var list = GetLeadsToSendAutomation();
                foreach (var a in list.Where(x => x.UserId == data.UserId && x.TemplateId == item.TemplateId && x.LeadId == data.LeadId))
                {
                    var r = SendAutomation(a);
                }
            }
        }

        public void SendLeadData(AutomationRequestModel data)
        {
            try
            {
                var leads = uow.Lead.GetLeadsToSendIntegration().Where(x=>x.LeadId==data.LeadId);
                foreach (var item in leads)
                {
                    try
                    {
                        var res = uow.Lead.SendViaApi(item);
                        if (res.Code == System.Net.HttpStatusCode.Unauthorized)
                        {
                            //uow.Integration.Delete(item.IntegrationId, Conts.Cpanel_user);
                        }
                        uow.IntegrationLeadSend.IU(new Entities.Model.IntegrationLeadSend()
                        {
                            LeadId = item.LeadId,
                            IntegrationId = item.IntegrationId,
                            ListId = item.ListId,
                            ResponseMsg = res.Message,
                            Status = res.Code == System.Net.HttpStatusCode.OK ? (int)LeadSendStatus.Success : (int)LeadSendStatus.Failed,
                            LastSendDate = DateTime.Now
                        });
                    }
                    catch (Exception ex)
                    {
                        _log.Error(ex);
                    }
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex);
            }
        }

        public void GetMoreInfo(int leadId)
        {
            // Lấy thêm thông tin từ IP
            var lead = _dbSet.SingleOrDefault(x => x.Id == leadId);
            if (lead == null) return;
             var moreInfo = new LocationService().GetInfoByIp(lead.IpAddress);
            if (moreInfo.Code == System.Net.HttpStatusCode.OK)
            {               
                var d = (Entities.Integration.LocationIPResponse)moreInfo.Data;
                _log.Info(d.region);
                lead.City = d.city;
                lead.Country = d.country_name;
                lead.Isp = d.organisation;
                //lead.Lat = d.latitude;
                //lead.Lon = d.longitude;
                lead.RegionName = d.region;
                this.Commit();
            }
            else
            {
                lead.City = "";
                this.Commit();
            }
        }

        public void GetRefererInfo(int leadId)
        {
            var lead = _dbSet.SingleOrDefault(x => x.Id == leadId);
            if (lead == null) return;
            // Lấy thêm thông tin từ IP
            var referer = uow.PunnelTracking.msp_GetPageTrafficSourceNoAsync(lead.LandingPageId, lead.IpAddress, DateTime.Now);
            lead.Referer = referer == null ? "" : referer;
            this.Commit();
        }
        public void IntegrationInfo(int leadId)
        {
            var lead = _dbSet.SingleOrDefault(x => x.Id == leadId);
            if (lead == null) return;

            var l = (_dbContext as Model.PunnelContext).msp_IntegrationInfo(lead.Id);
            foreach (var item in l)
            {
                uow.IntegrationLeadSend.IU(new IntegrationLeadSend()
                {
                    IntegrationId = item.IntegrationId,
                    LeadId = lead.Id,
                    ListId = item.ListId
                });
            }
        }
        public void Delete(int id, string userId)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == id);
            if (m != null)
            {
                if (IsOwnerOrAdmin(m.UserId, userId) == false) return;
                _dbSet.Remove(m);
                this.Commit();
            }
        }

        public void DeleteList(List<string> ids, string userId)
        {
            foreach (var id in ids)
            {
                var i = int.Parse(id);
                var m = _dbSet.FirstOrDefault(x => x.Id == i);
                if (m != null)
                {
                    if (IsOwnerOrAdmin(m.UserId, userId) == false) return;
                    _dbSet.Remove(m);
                }
                this.Commit();
            }
        }

        #region Send Contact to Integration Site
        public List<LeadToSendIntegrationModel> GetLeadsToSendIntegration()
        {
            return this.L2qContext.ExecuteQuery<LeadToSendIntegrationModel>("[dbo].[msp_LeadToSendIntegration]").ToList();
        }

        public List<LeadGetMoreModel> LeadToGetMoreInfo()
        {
            return this.L2qContext.ExecuteQuery<LeadGetMoreModel>("[dbo].[msp_LeadToGetMoreInfo]").ToList();
        }

        public ApiResponse SendViaApi(LeadToSendIntegrationModel item)
        {
            ApiResponse result = new ApiResponse();
            switch (item.SiteId)
            {
                case (int)Core.Entities.IntegrationType.GetResponse:
                    var res = new IntegrationServices.GetResponse.GetResponseTask(item.ApiKey).AddContact(new Entities.Integration.GetResponse.ContactRequest()
                    {
                        name = item.FirstName + " " + item.LastName,
                        email = item.Email,
                        campaign = new Entities.Integration.GetResponse.Campaign()
                        {
                            campaignId = item.ListId
                        }
                    });
                    result = res;
                    break;
                case (int)Core.Entities.IntegrationType.MailChimp:
                    var res1 = new IntegrationServices.MailChimp.MailChimpTask(item.ApiKey).AddContact(new Entities.Integration.MailChimp.ContactRequest()
                    {
                        email_address = item.Email,
                        status = "subscribed",
                        merge_fields = new Entities.Integration.MailChimp.MergeFields()
                        {
                            FNAME = item.FirstName,
                            LNAME = item.LastName
                        }
                    }, item.ListId);
                    result = res1;
                    break;
                case (int)Core.Entities.IntegrationType.Autopilot:
                    var res_al = new IntegrationServices.Autopilot.AutopilotTask(item.ApiKey).AddContact(new Entities.Integration.Autopilot.ContactRequest()
                    {
                        contact= new Entities.Integration.Autopilot.ContactModelRequest()
                        {
                            Email= item.Email,
                            FirstName= item.FirstName,
                            LastName= item.LastName
                        }
                    }, item.ListId);
                    result = res_al;
                    break;
                case (int)Core.Entities.IntegrationType.ActiveCampain:
                    var itg = uow.Integration.GetByApiKey(item.SiteId, item.ApiKey);
                    if (itg != null)
                    {
                        var res_at = new IntegrationServices.ActiveCampain.ActiveCampainTask(itg.AccId,item.ApiKey).AddContact(new Entities.Integration.ActiveCampain.ContactRequest
                        {
                            contact = new Entities.Integration.ActiveCampain.ContactModelRequest()
                            {
                                email = item.Email,
                                phone = item.Phone,
                                firstName = item.FirstName,
                                lastName = item.LastName
                            }
                        }, item.ListId);
                        result = res_at;
                    }
                    break;
                case (int)Core.Entities.IntegrationType.InfusionSoft:
                    var emailadd = new List<Entities.Integration.InfusionSoft.EmailAddress>();
                    emailadd.Add(new Entities.Integration.InfusionSoft.EmailAddress() { email = item.Email, field = "EMAIL1" });
                    var phoneadd = new List<Entities.Integration.InfusionSoft.PhoneNumber>();
                    phoneadd.Add(new Entities.Integration.InfusionSoft.PhoneNumber() { number = item.Phone, field = "PHONE1" });
                    var res_in = new IntegrationServices.InfusionSoft.InfusionSoftTask(item.ApiKey).AddContact(new Entities.Integration.InfusionSoft.ContactRequest()
                    {
                        email_addresses = emailadd ,
                        phone_numbers = phoneadd,
                        family_name= item.FirstName + " " + item.LastName
                    }, item.ListId);
                    result = res_in;
                    break;
                case (int)Core.Entities.IntegrationType.GoogleSheet:
                    List<Object> d = new List<Object>();
                    d.Add(item.FullName);
                    d.Add(item.Email);
                    d.Add(item.Phone);
                    d.Add(item.RegionName);
                    d.Add(item.Referer);
                    d.Add(item.SubmitDate);
                    if (string.IsNullOrEmpty(item.JsonData) == false)
                    {
                        var moreInfo = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Entities.RequestModel.FormData>>(item.JsonData);
                        foreach(var i in moreInfo)
                        {
                            d.Add(i.value);
                        }
                    }
                    var res2 = new EmailServices.GoogleSheetSvc(item.ApiKey, item.TokenJson).AddItemOnSheet(item.ListId,d);
                    result = res2;
                    break;
            }
            return result;
        }
        #endregion

        #region Send AutoReply Email to Lead Subcribler
        public List<LeadToSendAutoEmailModel> GetLeadsToSendAutomation()
        {
            return this.L2qContext.ExecuteQuery<LeadToSendAutoEmailModel>("[dbo].[msp_LeadToSendAutomation]").ToList();
        }

        public ApiResponse SendAutomation(LeadToSendAutoEmailModel data)
        {
            var profile = uow.UserProfile.Get(data.UserId);
            var r = new ApiResponse();
            switch (data.Type) {
                case 1:
                    string apiKey = "", tokenJson="";
                    if (data.SendFromType == 1)
                    {
                        data.ToIntegrationEmail();
                        var apiSite = uow.Integration.GetByAccId(data.UserId,(int)IntegrationType.Gmail,data.FromEmailList[0].Email);// _dbSet.AsNoTracking().FirstOrDefault(x => x.UserId == userId && x.AccId == accId);
                        if (apiSite != null)
                        {
                            apiKey = apiSite.ApiKey;
                            tokenJson = apiSite.TokenJson;
                        }
                    }
                    _log.ErrorFormat("Send email token Json:{0}", tokenJson);
                    r= new Utils.EmailUtils().SendLeadAutoReply(data, profile, apiKey, tokenJson);
                    break;
                case 2:
                    r = new SmsService().SendLeadAutoReply(data, profile);
                    break;
            }
            return r;
        }

        public void SendNotifyEmail(int leadId)
        {
            var lead = _dbSet.SingleOrDefault(x => x.Id == leadId);
            if (lead == null) return;
            var user = uow.UserProfile.Get(lead.UserId);
            if (user.IsOffAlert == true || (user.ExpiredDate.HasValue && user.ExpiredDate.Value < DateTime.Now)) return;
            if (user==null || user.IsVerifyEmail==false || lead.SubmitCount>2) return;
            var info = $"<p>{lead.FullName}<br />{lead.Email}<br />{lead.Phone}</p>";
            new Utils.EmailUtils(new Entities.Integration.Gmail.EmailToModel()
            {
                AvatarUrl = user.Avatar,
                FullName = Utils.CommonUtils.GetLastWordOfString(user.FullName),
                Email = user.Email
            }).SendAlertNewLead(lead.Link, info);
        }

        public void CheckSendMail(int id)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == id);
            if (m != null)
            {
                m.IsSendMail = true;
                this.Commit();
            }
            
        }

        public async Task CheckReadMail(int id)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == id);
            if (m != null)
            {
                m.IsReadMail = true;
                this.Commit();
                await uow.PunnelTracking.UpdateEmailStatus(m.Email, EmailStatus.Verified);
            } 
        }
        #endregion

        #region Conditions
        bool CanSendEmail_NotifyOwner()
        {
            return false;
        }
        #endregion
    }
}
