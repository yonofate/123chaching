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
    public class TokenRepository : BaseRepository<Token>, ITokenRepository
    {
        public TokenRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(TokenRepository));

        public void AddToken(Token obj)
        {
            this.Add(obj);
            this.Commit();
        }
        public bool Verify(Token obj)
        {
            var tk = _dbSet.FirstOrDefault(x => x.Id == obj.Id && x.UserId==obj.UserId);
            if (tk == null)
            {
                return false;
                //throw new BusinessException("Yêu cầu của bạn không thực hiện được vì thông tin bạn cung cấp không hợp lệ");
            }
            if (tk.ExpiredDate != null)
            {
                if (tk.ExpiredDate.Value < DateTime.Now)
                {
                    return false;
                    //throw new BusinessException("Thông tin bạn cung cấp đã quá hạn sử dụng. Vui lòng thực hiện lại");
                }
            }
            return true;
        }

        public bool VerifyByCode(Token obj)
        {
            var tk = _dbSet.FirstOrDefault(x => x.Code == obj.Code && x.UserId == obj.UserId);
            if (tk == null)
            {
                throw new BusinessException("Mã không hợp lệ, vui lòng kiểm tra lại");
            }
            if (tk.ExpiredDate != null)
            {
                if (tk.ExpiredDate.Value < DateTime.Now)
                {
                    throw new BusinessException("Mã đã quá hạn sử dụng. Vui lòng thực hiện lại");
                }
            }
            return true;
        }

        public void Delete(Guid id)
        {
            var col = _dbSet.FirstOrDefault(x => x.Id == id);
            if (col != null)
            {
                _dbSet.Remove(col);
                this.Commit();
            }
        }

        public void DeleteByUser(string userId)
        {
            var cols = _dbSet.Where(x => x.UserId == userId);
            if (cols.Count() >0)
            {
                _dbSet.RemoveRange(cols);
                this.Commit();
            }
        }

    }
}
