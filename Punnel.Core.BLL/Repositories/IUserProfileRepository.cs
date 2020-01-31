using Punnel.Core.Entities;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.RequestModel;
using Punnel.Core.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public interface IUserProfileRepository: IBaseRepository<UserProfile>
    {
        Task IsValidEmail(string email, string userId = "");
        Task IsValidMobile(string mobile, string userId = "");
        void ValidateUserBeforeUI(string mobile, string email, string userId = "");
        Task IU(UserProfile obj);
        UserProfile Get(string id);
        UserProfile GetByEmail(string email);
        UserProfile GetByExternalId(string provider, string providerId);
        Task<Tuple<bool, string>> IsDomainPageExpriredAsync(Guid pageId);
        void UpdateAvatar(string userId, string path);
        Task SetExpiredDate(string userId, DateTime expiredDate);
        Task SetUserStatusNote(string userId, LeadStatus status, string note,bool? important=false);
        bool ReferralCode_Validate(string code);
        UserProfile GetByReferralCode(string code);
        void UpdateAffilateAgent(UserProfile obj);
        void UpdateStatus(string userId, AffilateMemberStatus status);
        void ForgetPass(string userId);
        Task VerifyEmail(string userId);
        Task VerifyMobile(string userId);
        Task<Tuple<List<UserProfileListViewModel>, int>> UserProfile_Search(UserProfileQuery req);
        Task UpdateProfile(UserProfile obj);
        Task UpdateSystemNote(UserProfile obj);
        Task<int> ChangeRole(string userId, string roleId);
        Task<int> Delete_User_Permement(string email, string role);
        void SendSms(int smsId, string userId);
        List<SmsUserProfile> GetUserToSendSMS(int smsId);
        void SendVerifyEmail(string userId);
        Task Upgrade(ProfileUpgradeModel data);
        bool IsTrial(string userId);
        UserProfile GetUserByProviderId(string providerId, string provider);
        Task SendSmsVerifyMobile(string userId, string mobile);

    }
}