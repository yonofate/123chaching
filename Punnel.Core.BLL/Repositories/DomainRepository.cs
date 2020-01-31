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
    public class DomainRepository : BaseRepository<Domain>, IDomainRepository
    {
        public DomainRepository(IUow uow) : base(uow) { }
        private static readonly ILog _log = LogManager.GetLogger(typeof(DomainRepository));
        private static readonly string DNS_SERVER = ConfigSettings.Get("DNS_SERVER", "103.92.28.60");
        public async Task<List<DomainViewModel>> GetByUser(string userId)
        {
            var res = await (_dbContext as Model.PunnelContext).msp_Domain_GetByUser(userId);
            return res;
        }

        public void IU(Domain obj)
        {
            var m = _dbSet.FirstOrDefault(x=>x.Id== obj.Id && x.UserId==obj.UserId);
            if (m == null)
            {
                this.Add(obj);
            }
            else
            {
                if (IsOwnerOrAdmin(m.UserId, obj.UserId) == false) return;
                m.IsSub = obj.IsSub;
                m.IsChecked = obj.IsChecked;
                m.LastCheckedDate = obj.LastCheckedDate;
                m.Dns = obj.Dns;
            }
            this.Commit();
        }

        public void AddDomain(Domain obj)
        {
            var m = _dbSet.FirstOrDefault(x => (x.Id == obj.Id && x.UserId == obj.UserId) || (x.Id == obj.Id && x.IsChecked == true));
            if (m != null) throw new BusinessException("Domain này đã được sử dụng, bạn không thể thêm mới");
            this.Add(obj);
            this.Commit();
        }

        public bool IsNotOwner(string domain,string userId)
        {
            return _dbSet.Any(x => x.Id==domain && x.UserId!=x.UserId && x.IsChecked);            
        }

        public void Verify(string id,string userId)
        {
            if (IsNotOwner(id, userId) == true) throw new BusinessException("Bạn không thể sử dụng domain đã được sử dụng bởi tài khoản khác");

            var domain = _dbSet.FirstOrDefault(x => x.Id == id && x.UserId==userId);
            if (domain == null)
            {
                //throw new BusinessException("Bạn không thể xác thực domain này");
                AddDomain(new Domain()
                {
                    Id= id,
                    UserId= userId
                });
                domain = _dbSet.FirstOrDefault(x => x.Id == id && x.UserId == userId);
            }
            //_log.Info($"Verify domain {id} to {DNS_SERVER}");

            //System.Net.IPHostEntry host;
            //host = System.Net.Dns.GetHostEntry(id);
            //var l = host.AddressList.ToList();
            //_log.Info(l.Select(x=>x.Address).ToList());
            //_log.Info(System.Net.IPAddress.Parse(DNS_SERVER).Address);

            bool isValidDomain = Core.Utils.StringUtils.ValidateIpByDomain(id, DNS_SERVER);
            domain.IsChecked = isValidDomain;
            domain.LastCheckedDate = DateTime.Now;
            this.Commit();
            if(isValidDomain==false) throw new BusinessException("Domain chưa trỏ A về " + DNS_SERVER + " hoặc trỏ domain chưa có hiệu lực. Bạn vui lòng kiểm tra lại!");
            //tạo host default
            else new Core.BLL.FileServices.FileBuilder(id, "", "").Create("");
        }

        public void Delete(string id , string userId)
        {
            var col = _dbSet.FirstOrDefault(x => x.Id == id);
            if (col != null)
            {
                if (IsOwnerOrAdmin(col.UserId, userId) == false) return;
                _dbSet.Remove(col);
                this.Commit();
            }
        }

    }
}
