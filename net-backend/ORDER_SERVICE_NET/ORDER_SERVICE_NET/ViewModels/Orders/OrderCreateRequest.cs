using ORDER_SERVICE_NET.ViewModels.Address;
using ORDER_SERVICE_NET.ViewModels.OrderDetails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ORDER_SERVICE_NET.ViewModels.Orders
{
    public class OrderCreateRequest
    {
        public string CustomerName { set; get; }
        public AddressInfo Address { set; get; }
        public string Email { set; get; }
        public string Phone { set; get; }
        public List<OrderOneStoreRequest> OrderOneStores { set; get; }
    }
}
