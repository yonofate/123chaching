using log4net;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;
using Punnel.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.BLL.Repositories
{
    public class EmailTemplateRepository : BaseRepository<EmailTemplate>, IEmailTemplateRepository
    {
        public EmailTemplateRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(EmailTemplateRepository));
        public async Task<List<EmailTemplateListViewModel>> GetByUser(string userId)
        {
            var res = await (_dbContext as Model.PunnelContext).msp_EmailTemplate_GetByUser(userId);
            return res;
        }

        public async Task<List<EmailTemplateListViewModel>> GetNotUseOnPage(Guid pageId, string userId)
        {
            var res = await (_dbContext as Model.PunnelContext).msp_EmailTemplate_GetNotUseOnPage(userId, pageId);
            return res;
        }

        public void IU(EmailTemplate obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.Id== obj.Id);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {
                if (IsOwnerOrAdmin(m.UserId, obj.UserId) == false) return;
                m.Name = obj.Name;
                m.Type = obj.Type;
                m.Title = obj.Title;
                m.BodyHtml = obj.BodyHtml;
                m.Variants = obj.Variants;
                m.ReplyTo = obj.ReplyTo;
                m.SendName = obj.SendName;
                m.SendFromType = obj.SendFromType;
                if (obj.SendFromType == 1)
                {
                   if(obj.Type==1) m.FromEmails = obj.FromEmails;
                   if (obj.Type == 2) m.FromSms = obj.FromSms;
                }
            }
            this.Commit();
        }

        public bool Exists(int id)
        {
            return _dbSet.AsNoTracking().Any(x => x.Id == id);
        }

        public void Delete(int id,string userId="")
        {
            var col = _dbSet.FirstOrDefault(x => x.Id == id);
            if (col == null) throw new Exception("Không tìm thấy thông tin này");
            if (IsOwnerOrAdmin(col.UserId, userId) == false) return;
            _dbSet.Remove(col);
            uow.Automation.DeleteByTemplateId(id, userId);
            this.Commit();
        }
    }
}
