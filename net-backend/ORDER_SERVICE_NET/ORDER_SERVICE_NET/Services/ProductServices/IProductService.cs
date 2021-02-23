﻿using ORDER_SERVICE_NET.ViewModels.Commons;
using ORDER_SERVICE_NET.ViewModels.Orders;
using ORDER_SERVICE_NET.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ORDER_SERVICE_NET.Services.ProductServices
{
    public interface IProductService
    {
        Task<APIResult<List<ProductView>>> GetListProduct(List<int> productDetailIdList);
        Task<APIResult<List<string>>> GetOrderQrCode(OrderCreateRequest request);
    }
}
