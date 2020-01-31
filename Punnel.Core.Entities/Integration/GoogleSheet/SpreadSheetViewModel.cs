using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities.Integration.GoogleSheet
{
    public class SpreadPunnelSheetViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int? SheetId { get; set; }
    }
    public class SpreadSheetViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<SheetViewModel> Sheets { get; set; }
    }

    public class SheetViewModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
    }
}
