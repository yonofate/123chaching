using Punnel.App.Entities;
using Punnel.App.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Punnel.App
{
    public class AuthRepository : IDisposable
    {
        private AuthContext _ctx;

        private UserManager<IdentityUser> _userManager;

        public AuthRepository()
        {
            _ctx = new AuthContext();
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_ctx));
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = userModel.Email,
                Email= userModel.Email,
                PhoneNumber= userModel.Mobile
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = await _userManager.FindAsync(userName, password);
            if (user == null)
            {
                var k = await _userManager.FindByEmailAsync(userName);
                if(k==null) k = await FindUserByMobile(userName);
                if(k!=null) user = await _userManager.FindAsync(k.UserName, password);
            }
            return user;
        }

        public async Task<IdentityUser> FindUser(string userName)
        {
            IdentityUser user = await _userManager.FindByNameAsync(userName);
            if(user==null) user = await _userManager.FindByEmailAsync(userName);
            if (user == null) user = await FindUserByMobile(userName);
            return user;
        }

        public async Task<IdentityUser> FindUserByMobile(string mobile)
        {
            return _ctx.Users.SingleOrDefault(x => x.PhoneNumber == mobile);
        }

            public Client FindClient(string clientId)
        {
            var client = _ctx.Clients.Find(clientId);

            return client;
        }

        public async Task<RefreshToken> FindRefreshTokenByName(string name)
        {
            var refreshToken = _ctx.RefreshTokens.FirstOrDefault(x => x.Subject == name);

            return refreshToken;
        }

        public async Task<bool> AddRefreshToken(RefreshToken token)
        {

           var existingToken = _ctx.RefreshTokens.Where(r => r.Subject == token.Subject && r.ClientId == token.ClientId);

           foreach(var item in existingToken)
           {
                //await RemoveRefreshToken(item);
                _ctx.RefreshTokens.Remove(item);
            }
          
            _ctx.RefreshTokens.Add(token);

            return await _ctx.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveRefreshToken(string refreshTokenId)
        {
           var refreshToken = await _ctx.RefreshTokens.FindAsync(refreshTokenId);

           if (refreshToken != null) {
               _ctx.RefreshTokens.Remove(refreshToken);
               return await _ctx.SaveChangesAsync() > 0;
           }

           return false;
        }

        public async Task<bool> RemoveRefreshToken(RefreshToken refreshToken)
        {
            _ctx.RefreshTokens.Remove(refreshToken);
             return await _ctx.SaveChangesAsync() > 0;
        }

        public async Task<RefreshToken> FindRefreshToken(string refreshTokenId)
        {
            var refreshToken = await _ctx.RefreshTokens.FindAsync(refreshTokenId);

            return refreshToken;
        }

        public List<RefreshToken> GetAllRefreshTokens()
        {
             return  _ctx.RefreshTokens.ToList();
        }

        public async Task<IdentityUser> FindAsync(UserLoginInfo loginInfo)
        {
            IdentityUser user = await _userManager.FindAsync(loginInfo);

            return user;
        }

        public async Task<IdentityUser> FindByNameAsync(string userName)
        {
            IdentityUser user = string.IsNullOrEmpty(userName)==true? null: await _userManager.FindByNameAsync(userName);
            if(user==null) user = string.IsNullOrEmpty(userName) == true ? null : await _userManager.FindByEmailAsync(userName);
            if (user == null) user = string.IsNullOrEmpty(userName) == true ? null : await FindUserByMobile(userName);
            return user;
        }
        //public IdentityUser FindByName(string userName)
        //{
        //    IdentityUser user =  _userManager.FindByName(userName);

        //    return user;
        //}

        public async Task<IdentityResult> CreateAsync(IdentityUser user)
        {
            var result = await _userManager.CreateAsync(user);

            return result;
        }

        public async Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login)
        {
            var result = await _userManager.AddLoginAsync(userId, login);
            return result;
        }
        public async Task<IdentityResult> AddPasswordAsync(string userId, string password)
        {
            var result = await _userManager.AddPasswordAsync(userId, password);
            return result;
        }

        public async Task<IdentityResult> ResetPasswordAsync(string userId, string password)
        {
            await _userManager.RemovePasswordAsync(userId);
            var result = await _userManager.AddPasswordAsync(userId, password);
            return result;
        }

        public async Task<IdentityResult> AddRoleAsync(string userId, string role)
        {
            var result = await _userManager.AddToRoleAsync(userId, role);
            return result;
        }
        public void AddRole(string userId, string role)
        {
            _userManager.AddToRole(userId, role);
        }

        public async Task<IList<string>> GetRolesAsync(string userId)
        {
            var result = await _userManager.GetRolesAsync(userId);
            return result;
        }
        public async Task<IdentityResult> SetPhoneNumberAsync(string userId, string mobile)
        {
            var result = await _userManager.SetPhoneNumberAsync(userId, mobile);
            return result;
        }

        public async Task<IdentityResult> AddClaimAsync(string userId, Claim claim)
        {
            var result = await _userManager.AddClaimAsync(userId, claim);
            return result;
        }

        public async Task<IdentityResult> UpdateClaimAsync(string userId, Claim claim)
        {
            var cls = _userManager.GetClaims(userId).Where(x => x.Type == claim.Type);
            foreach (var c in cls) _userManager.RemoveClaim(userId, c);
            var result = await _userManager.AddClaimAsync(userId, claim);
            return result;
        }

        public IdentityResult UpdateClaim(string userId, Claim claim)
        {
            var cls = _userManager.GetClaims(userId).Where(x=>x.Type==claim.Type);
            foreach(var c in cls) _userManager.RemoveClaim(userId, c);
            var result = _userManager.AddClaim(userId, claim);
            return result;
        }

        public Claim GetClaim(string userId,string key)
        {
            var result = _userManager.GetClaims(userId);
            return result.FirstOrDefault(x=>x.Type==key);
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();
        }
    }
}