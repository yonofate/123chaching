using log4net;
using MBN.Utils;
using Punnel.Core.BLL.Services;
using Punnel.Core.BLL.Utils;
using Punnel.Core.Entities;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class UserProfileRepository : BaseRepository<UserProfile>, IUserProfileRepository
    {
        private static readonly ILog _log = LogManager.GetLogger("UserProfileRepository");
        private static readonly string ROOT_URL = WebUtils.AppSettings("ROOT_URL", @"https://app.punnel.com");
        private static readonly string STAFF_IDS = WebUtils.AppSettings("STAFF_IDS", @"");

        static string Default_Avatar = "/common/img_noavatar.jpg";
        public UserProfileRepository(IUow uow) : base(uow) { }

        bool IsExistsEmail(string email, string userId = "") {
            if (userId == "")
            {
                if (_dbSet.Any(x => x.Email == email)) return true;
                return false;
            }
            else
            {
                if (_dbSet.Any(x => x.Email == email && x.Id != userId)) return true;
                return false;
            }
        }

        bool IsExistsMobile(string mobile, string userId = "")
        {
            if (string.IsNullOrEmpty(mobile)) return false;
            if (userId == "")
            {
                if (_dbSet.Any(x => x.Mobile == mobile)) return true;
                return false;
            }
            else
            {
                if (_dbSet.Any(x => x.Mobile == mobile && x.Id != userId)) return true;
                return false;
            }
        }

        public async Task IsValidEmail(string email, string userId="")
        {
            if (IsExistsEmail(email, userId)) throw new BusinessException("Email này đã được đăng kí.");
        }

        public async Task IsValidMobile(string mobile, string userId = "")
        {
            if (IsExistsMobile(mobile, userId)) throw new BusinessException("Số điện thoại này đã được đăng kí.");
        }

        public void ValidateUserBeforeUI(string mobile, string email, string userId = "")
        {
            if (IsExistsEmail(email, userId)) throw new BusinessException("Email này đã được đăng kí.");
            if (IsExistsMobile(mobile, userId)) throw new BusinessException("Số điện thoại này đã được đăng kí.");
        }
        /// <summary>
        /// Them, cap nhat User
        /// </summary>
        /// <param name="obj"></param>
        public async Task IU(UserProfile obj)
        {
            ValidateUserBeforeUI(obj.Mobile, obj.Email, obj.Id);
            var m = _dbSet.FirstOrDefault(x => x.Id == obj.Id);
            if (m == null)
            {
                obj.Avatar = Default_Avatar;
                obj.Role = Conts.Role_Member;
                obj.UserStatus = (int)AffilateMemberStatus.New;
                obj.Level = (int)ProfileLevel.Trial;
                obj.ExpiredDate = DateTime.Now.AddMonths(6);//Cho 6 tháng sử dụng miễn phí khi đăng kí
                obj.ActiveDate = DateTime.Now;
                this.Add(obj);
                try
                {
                    //Chưa verify email => gửi email xác thực
                    if (obj.IsVerifyEmail == false)
                    {
                        Guid code = Guid.NewGuid();
                        uow.Token.AddToken(new Token()
                        {
                            Id = code,
                            UserId = obj.Id,
                            CreatedDate = DateTime.Now
                        });
                        string url = $"{ROOT_URL}/#!/auth/verify-email/?u={obj.Id}&c={code}";

                        //Send welcome email and verify email
                        new EmailUtils(new Entities.Integration.Gmail.EmailToModel()
                        {
                            Email = obj.Email,
                            FullName = obj.FullName,
                            AvatarUrl = obj.Avatar
                        }).SendWelcomeWidthVerifyEmail(url);
                    }
                    else
                    {
                        //Send welcome email
                        new EmailUtils(new Entities.Integration.Gmail.EmailToModel()
                        {
                            Email = obj.Email,
                            FullName = obj.FullName,
                            AvatarUrl = obj.Avatar
                        }).SendWelcome();
                        //Cập nhật kho email
                        await uow.PunnelTracking.UpdateEmailStatus(obj.Email, EmailStatus.Verified);
                    }

                    //thêm nhân viên hỗ trợ
                    if (!string.IsNullOrEmpty(obj.Id))
                    {
                        uow.StaffSupport.UpdateStaffSupport(new StaffSupportRequest()
                        {
                            CustomerId = obj.Id,
                            StaffIds = STAFF_IDS.Split(new char[1] { ',' }).ToList()
                        });
                    }
                }
                catch(Exception ex)
                {
                    _log.Error(ex);
                }
            }
            else
            {
                if (m.Email != obj.Email)
                {
                    m.IsVerifyEmail = false;
                    //send verify email
                    SendVerifyEmail(m.Id);
                }
                if (m.Mobile != obj.Mobile)
                {
                    m.IsVerifyMobile = false;
                    //send verify mobile
                    //await SendSmsVerifyMobile(m.Id, m.Mobile);
                }
                m.FullName = obj.FullName;
                m.Email = obj.Email;
                m.Mobile = obj.Mobile;
                m.IsOffAlert = obj.IsOffAlert;
                //m.Role = obj.Role;
                //m.UserStatus = obj.UserStatus;
                //m.UserType = obj.UserType;
                //m.BusinessCateId = obj.BusinessCateId;
                //m.ExpiredDate = obj.ExpiredDate;
                //m.ActiveDate = obj.ActiveDate;
                //m.Birthday = obj.Birthday;
            }
            this.Commit();
        }

        public async Task SetExpiredDate(string userId, DateTime expiredDate)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == userId);
            if (m != null && m.ActiveDate.AddMonths(6).ToString("dd/MM/yyyy")==m.ExpiredDate.Value.ToString("dd/MM/yyyy"))
            {
                m.ExpiredDate = expiredDate;
            }
            await this.CommitAsync();
        }


        public async Task SetUserStatusNote(string userId, LeadStatus status, string note, bool? important=false)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == userId);
            if (m != null)
            {
                if (important == true)
                    m.SystemStatus = (int)status;
                else if (m.SystemStatus > (int)status && status!= LeadStatus.New) m.SystemStatus = (int)status;
                if (string.IsNullOrEmpty(m.SystemNote)) m.SystemNote = note;
            }
            await this.CommitAsync();
        }

        public async Task VerifyEmail(string userId)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == userId);
            if (m != null)
            {
                m.IsVerifyEmail = true;
                await uow.PunnelTracking.UpdateEmailStatus(m.Email, EmailStatus.Verified);
            }
            this.Commit();
            //Cập nhật kho email
            
        }

        public async Task VerifyMobile(string userId)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == userId);
            if (m != null)
            {
                m.IsVerifyMobile = true;
                //await uow.PunnelTracking.UpdateEmailStatus(m.Email, EmailStatus.Verified);
            }
            this.Commit();
        }

        public UserProfile GetUserByProviderId(string providerId,string provider)
        {
            return _dbSet.FirstOrDefault(x => x.ProviderId == providerId  && x.Provider==provider);
        }
        public void UpdateAvatar(string userId, string path)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == userId);
            if (m != null)
            {
                m.Avatar = path;
            }
            this.Commit();
        }

        public void UpdateStatus(string userId, AffilateMemberStatus status)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == userId);
            if (m != null)
            {
                m.UserStatus = (int)status;
            }
            this.Commit();
        }

        public void UpdateAffilateAgent(UserProfile obj)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == obj.Id);
            if (m == null)
            {
                throw new BusinessException("Tài khoản không tồn tại");
            }
            m.BankCode = obj.BankCode;
            m.BankAccount = obj.BankAccount;
            m.ReferralCode = obj.ReferralCode;
            m.IsAffilateAgent = true;
            m.AffilateAgentDate = DateTime.Now;
            this.Commit();
        }

        public UserProfile Get(string id)
        {
            return _dbSet.AsNoTracking().FirstOrDefault(x => x.Id == id);
        }

        public UserProfile GetByEmail(string email)
        {
            return _dbSet.AsNoTracking().FirstOrDefault(x => x.Email == email);
        }
        public UserProfile GetByExternalId(string provider, string providerId)
        {
            return _dbSet.AsNoTracking().FirstOrDefault(x => x.Provider == provider && x.ProviderId==providerId);
        }

        public async Task<Tuple<bool,string>> IsDomainPageExpriredAsync(Guid pageId)
        {
            var info = await (_dbContext as Model.PunnelContext).msp_GetUserByPageIdAsync(pageId);
            if (info == null) return new Tuple<bool, string>(true,"");
            if (info.Role == Conts.Role_Admin || info.Role==Conts.Role_Editor) return new Tuple<bool, string>(false, info.ReferralCode);
            //quá hạn quá 1 ngày
            if (info.ExpiredDate.AddDays(1) < DateTime.Now || (info.Role==Conts.Role_Member && info.Level==(int)ProfileLevel.Trial)) return new Tuple<bool, string>(true, info.ReferralCode);
            return new Tuple<bool, string>(false, info.ReferralCode);
        }

        public UserProfile GetByReferralCode(string code)
        {
            if (string.IsNullOrEmpty(code)) return null;
            var res = _dbSet.AsNoTracking().FirstOrDefault(x => x.ReferralCode == code);
            return res;
        }
        public bool ReferralCode_Validate(string code)
        {
            if (string.IsNullOrEmpty(code)) return false;
            var res = _dbSet.AsNoTracking().Count(x => x.ReferralCode == code);
            return (res > 0);
        }

        public void ForgetPass(string userId)
        {
            var profile = _dbSet.AsNoTracking().SingleOrDefault(x => x.Id == userId);
            if (profile != null)
            {
                Guid code = Guid.NewGuid();
                uow.Token.AddToken(new Token()
                {
                    Id= code,
                    UserId =userId,
                    CreatedDate= DateTime.Now
                    
                });
                EmailUtils emailsvc = new EmailUtils(new Entities.Integration.Gmail.EmailToModel()
                {
                    Email= profile.Email,
                    FullName = profile.FullName,
                    AvatarUrl = profile.Avatar
                });
                string url = $"{ROOT_URL}/#!/auth/newpassword/?u={userId}&c={code}";
                emailsvc.SendResetPassword(url);
            }
        }

        public async Task SendSmsVerifyMobile(string userId, string mobile)
        {
            var profile = _dbSet.AsNoTracking().SingleOrDefault(x => x.Id == userId);
            if (profile != null)
            {
                Guid id = Guid.NewGuid();
                string code = new Random().Next(1001, 9999).ToString();    

                var r = new Services.SmsService().Send(mobile, $"Ma xac nhan tai khoan cua ban tren Punnel: {code}");
                if (r == true)
                {
                    uow.Token.DeleteByUser(userId);
                    uow.Token.AddToken(new Token()
                    {
                        Id = id,
                        Code = code,
                        UserId = userId,
                        CreatedDate = DateTime.Now,
                        ExpiredDate = DateTime.Now.AddMinutes(10)
                    });
                }
                else{
                    throw new BusinessException("Không thể gửi SMS đển số của bạn, bạn vui lòng xác nhận tài khoản qua email");
                }
            }
        }
        public void SendVerifyEmail(string userId)
        {
            var profile = _dbSet.AsNoTracking().SingleOrDefault(x => x.Id == userId);
            if (profile != null)
            {
                Guid code = Guid.NewGuid();
                uow.Token.AddToken(new Token()
                {
                    Id = code,
                    UserId = userId,
                    CreatedDate = DateTime.Now
                });
                EmailUtils emailsvc = new EmailUtils(new Entities.Integration.Gmail.EmailToModel()
                {
                    Email = profile.Email,
                    FullName = profile.FullName,
                    AvatarUrl = profile.Avatar
                });
                string url = $"{ROOT_URL}/#!/auth/verify-email/?u={userId}&c={code}";
                emailsvc.SendVerifyEmail(url);
            }
        }

        #region SMS
        public List<SmsUserProfile> GetUserToSendSMS(int smsId)
        {
            return this.L2qContext.ExecuteQuery<SmsUserProfile>($"[dbo].[msp_Task_GetUserToSendSmS] {smsId}").ToList();
        }

        public void SendSms(int smsId, string userId)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == userId);
            if (m != null)
            {
                string content = $"Chao {m.FullName}. Ban da su dung duoc nen tang Punnel cho cong viec cua minh chua? Nhan Y de dong y minh tu van cho ban nhe";
                var res = new SmsService().Send(m.Mobile, content);
                m.SmsId = smsId;
            }
            this.Commit();
        }
        #endregion

        #region Manage member
        public async Task<Tuple<List<UserProfileListViewModel>, int>> UserProfile_Search(UserProfileQuery req)
        {
            return await (_dbContext as Model.PunnelContext).msp_UserProfile_Search(req);
        }

        public async Task UpdateProfile(UserProfile obj)
        {
            var m = _dbSet.SingleOrDefault(x => x.Id == obj.Id);
            if (m == null)
            {
                throw new BusinessException("Không tìm thấy thông tin thành viên này");
            }
            m.FullName = obj.FullName;
            m.Mobile = obj.Mobile;
            m.ExpiredDate = obj.ExpiredDate;
            
            
            if (m.Level != obj.Level)
            {
                //Add tracking
                if(IsValidLevel(obj.Level)==true) m.Level = obj.Level;
            }
            if (m.IsVerifyEmail !=obj.IsVerifyEmail)
            {
                m.IsVerifyEmail = obj.IsVerifyEmail;
                if(m.IsVerifyEmail==true)
                    await uow.PunnelTracking.UpdateEmailStatus(m.Email, EmailStatus.Verified);
                else
                    await uow.PunnelTracking.UpdateEmailStatus(m.Email, EmailStatus.NotVerify);
            }

            if (m.IsVerifyMobile != obj.IsVerifyMobile)
            {
                m.IsVerifyMobile = obj.IsVerifyMobile;
                if (m.IsVerifyMobile == true)
                    await uow.PunnelTracking.UpdateMobileStatus(m.Email, MobileStatus.Verified);
                else
                    await uow.PunnelTracking.UpdateMobileStatus(m.Email, MobileStatus.NotVerify);
            }
            this.Commit();
        }

        public async Task UpdateSystemNote(UserProfile obj)
        {
            var m = _dbSet.FirstOrDefault(x => x.Id == obj.Id);
            if (m != null)
            {
                m.SystemStatus = (int)obj.SystemStatus;
                m.SystemNote = obj.SystemNote;
            }
            await this.CommitAsync();
        }

        public async Task<int> ChangeRole(string userId, string roleId)
        {
            if (IsValidRole(roleId) == false) return 0;
            return await (_dbContext as Model.PunnelContext).msp_UserProfile_ChangeRole(userId,roleId);
        }

        public async Task Upgrade(ProfileUpgradeModel data)
        {
            var profile = _dbSet.SingleOrDefault(x => x.Id == data.Id);
            profile.Level = data.Level;
            if (profile.ExpiredDate == null) profile.ExpiredDate = DateTime.Now;
            profile.ExpiredDate = profile.ExpiredDate.Value.AddMonths(data.Month);
            await this.CommitAsync();
        }

        bool IsValidLevel(int levelId)
        {
            var valuesAsList = Enum.GetValues(typeof(ProfileLevel)).Cast<ProfileLevel>().ToList();
            return valuesAsList.Any(x => (int)x == levelId);
        }
        bool IsValidRole(string role)
        {
            var valuesAsList = "admin,editor,member,agent".Split(new char[1] {','});
            return valuesAsList.Any(x => x == role);
        }
        #endregion

        #region SYSTEM
        public async Task<int> Delete_User_Permement(string email, string role)
        {
            if (role!="admin") return 0;
            return await (_dbContext as Model.PunnelContext).msp_Sys_Delete_User_Permement(email);
        }
        #endregion

        #region condition
        public bool IsTrial(string userId)
        {
            var user = this.Get(userId);
            if (user.Level == (int)ProfileLevel.Trial) return true;
            return false;
        }
        #endregion
    }
}
