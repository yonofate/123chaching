using Punnel.Core.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;


namespace Punnel.Core.BLL.Repositories
{
    public class FBPageRepository : BaseRepository<FBPage>, IFBPageRepository
    {
        public FBPageRepository(IUow uow) : base(uow) { }

        public List<FBPage> GetByUser(string userId)
        {
            return _dbSet.Where(x => x.UserId == userId).ToList();
        }

        public List<FBPage> GetByFbId(long fbId)
        {
            return _dbSet.Where(x => x.FbId == fbId).ToList();
        }

        public void IU(FBPage obj, string type)
        {
            obj.LastConnected = DateTime.Now;
            var m = _dbSet.FirstOrDefault(x => x.Id == obj.Id);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {
                if (type == "config")
                {
                    m.GreetingIn = obj.GreetingIn;
                    m.GreetingOut = obj.GreetingOut;
                    m.Delay = obj.Delay;
                    m.ThemeColor = obj.ThemeColor;
                }
                else if (type == "token")
                {
                    m.FbId = obj.FbId;
                    m.Name = obj.Name;
                    m.AccessToken = obj.AccessToken;
                    m.LastConnected = obj.LastConnected;
                    m.UserId = obj.UserId;
                }
                else if (type == "bot")
                {
                    m.UseBot = obj.UseBot;
                }
                else if (type == "domain")
                {
                    m.WhiteListDomains = obj.WhiteListDomains;
                }
                else if (type == "publish")
                {
                    m.Publish = obj.Publish;
                }                              
            }
            this.Commit();
        }

        public override void Delete(Guid id)
        {
            var FBPage = _dbSet.Find(id);
            _dbSet.Remove(FBPage);
            this.Commit();
            this.RemoveCache(id);
        }
    }
}
