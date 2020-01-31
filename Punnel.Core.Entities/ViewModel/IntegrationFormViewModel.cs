using Punnel.Core.Entities.Integration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.ViewModel
{
    [Serializable]
    public class IntegrationFormViewModel
    {
        public int SiteId { get; set; } 
        public string Name { get; set; }
        public string Domain { get; set; }
        public string ConfigId { get; set; }
        public string Notes { get; set; }
        public Guid? IntegrationId { get; set; }
        public string AccId { get; set; }
        public string ApiKey { get; set; }
        public string Email { get; set; }
        public string ListId { get; set; }
        public string ListName { get; set; }
        public bool Configured { get; set; }
        public bool Connected { get; set; }
        public bool IsExpired { get; set; }
        public string DataDisplay { get; set; }
        public int Type { get; set; }

    }

    [Serializable]
    public class IntegrationInfoModel
    {
        public Guid IntegrationId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public int SiteId { get; set; }
        public string ApiKey { get; set; }
        public string AccId { get; set; }
        public string ListId { get; set; }
    }
}
