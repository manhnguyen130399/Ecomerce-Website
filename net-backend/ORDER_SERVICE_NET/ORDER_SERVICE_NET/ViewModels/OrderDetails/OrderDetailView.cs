using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ORDER_SERVICE_NET.ViewModels.OrderDetails
{
    public class OrderDetailView
    {
        public int Quantity { get; set; }
        public decimal TotalPriceProduct { get; set; }
        public string ProductName { get; set; }
        public int ProductDetailId { get; set; }
    }
}
