using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ORDER_SERVICE_NET.ViewModels.Notifys
{
    public class NotifyView
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int StoreId { get; set; }
        public string Type { get; set; }
        public int IsRead { get; set; }
        public string Created_At { get; set; }
    }
}
