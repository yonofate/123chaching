
namespace Punnel.Core.Entities.RequestModel
{
    public class UserProfileQuery: BaseQuery
    {
        public string Role { get; set; }
        public int? UserStatus { get; set; }
        public int? SystemStatus { get; set; }
        public int? Level { get; set; }
        public int? DateType { get; set; }
        public string StaffId { get; set; }
    }
}
