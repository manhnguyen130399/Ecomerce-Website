using ORDER_SERVICE_NET.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ORDER_SERVICE_NET.ViewModels.Carts
{
    public class CartItemView
    {
        public string ProductName { get; set; }
        public int Quantity { set; get; }
        public decimal Price { set; get; }
    }
}
