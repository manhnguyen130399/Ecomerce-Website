using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ORDER_SERVICE_NET.ViewModels.Orders
{
    public class OrderNotify
    {
        public int OrderId { get; set; }
        public string Content { get; set; }
        public string Created_At { get; set; }
        public string Type { get; set; }
    }
}
