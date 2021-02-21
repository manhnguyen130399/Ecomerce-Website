using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using ORDER_SERVICE_NET.Models;
using ORDER_SERVICE_NET.Services.ProductServices;
using ORDER_SERVICE_NET.Utilities;
using ORDER_SERVICE_NET.ViewModels.Commons;
using ORDER_SERVICE_NET.ViewModels.Commons.Pagging;
using ORDER_SERVICE_NET.ViewModels.OrderDetails;
using ORDER_SERVICE_NET.ViewModels.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ORDER_SERVICE_NET.Services.OrderServices
{
    public class OrderService : IOrderService
    {
        private readonly ShopicaContext _context;
        private readonly IProductService _productService;
        public OrderService(ShopicaContext context, IProductService productService)
        {
            _context = context;
            _productService = productService;
        }
        public async Task<APIResult<string>> Create(OrderCreateRequest request)
        {
            try
            {
                var qrCodeData = await _productService.GetOrderQrCode(request);

                List<OrderDetail> orderDetails = new List<OrderDetail>();
                foreach (var item in request.OrderDetails)
                {
                    var orderDetail = new OrderDetail
                    {
                        ProductDetailId = item.ProductDetailId,
                        Quantity = item.Quantity,
                        TotalPriceProduct = item.TotalPriceProduct,
                    };
                    orderDetails.Add(orderDetail);
                    _context.OrderDetail.Add(orderDetail);
                }

                var order = new Orders()
                {
                    CustomerName = request.CustomerName,
                    Address = request.Address,
                    Email = request.Email,
                    Phone = request.Phone,
                    State = Constant.PENDING,
                    Notes = request.Notes,
                    QrCode = qrCodeData.Code=="OK"? qrCodeData.Data: null,
                    Total = request.Total,
                    DiscountAmount = request.Discount,
                    CreateAt = DateTime.Now.ToString("yyyy-MM-dd H:mm:ss"),
                    OrderDetail = orderDetails,
                    IsDeleted = 0,
                };

                _context.Orders.Add(order);

                if (request.PromotionId != 0)
                {
                    order.PromotionId = request.PromotionId;

                    var promotion = new CustomerPromo()
                    {
                        UsedAt = DateTime.Now.ToString("yyyy-MM-dd H:mm:ss"),
                        CustomerPhone = request.Phone,
                        PromotionId = request.PromotionId
                    };

                    _context.CustomerPromo.Add(promotion);
                }

                await _context.SaveChangesAsync();

                return new APIResultSuccess<string>(order.Id.ToString());
            }
            catch (Exception ex)
            {
                return new APIResultErrors<string>(ex.Message);
            }
        }

        public async Task<APIResult<bool>> Delete(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if(order == null)
            {
                return new APIResultErrors<bool>("Not found");
            }

            order.IsDeleted = 1;
            await _context.SaveChangesAsync();

            return new APIResultSuccess<bool>();
        }

        public async Task<APIResult<PaggingView<OrderView>>> GetAll(PaggingRequest request)
        {
            var listOrder = await _context.Orders.ToListAsync();

            int totalRow = listOrder.Count();

            var data = listOrder
                .Skip(request.pageSize * (request.pageIndex -1))
                .Take(request.pageSize)
                .Select(x => new OrderView()
                {
                    Id = x.Id,
                    CustomerName = x.CustomerName,
                    State = x.State,
                    Total = x.Total,
                    CreateAt = x.CreateAt,
                    Notes = x.Notes,
                    Discount = x.DiscountAmount
                }).ToList();

            var result = new PaggingView<OrderView>()
            {
                Pageindex = request.pageIndex,
                PageSize = request.pageSize,
                Datas = data,
                TotalRecord = totalRow
            };

            return new APIResultSuccess<PaggingView<OrderView>>(result);
        }

        public async Task<APIResult<List<OrderView>>> GetAllByUser(string email)
        {
            var query = from p in _context.Orders
                        where p.Email == email
                        select p;

            var data = await query
                .Select(x => new OrderView()
                {
                    Id = x.Id,
                    CreateAt = x.CreateAt,
                    Notes = x.Notes,
                    Email = x.Email,
                    Phone = x.Phone,
                    Address = x.Address,
                    CustomerName = x.CustomerName,
                    QrCode = x.QrCode,
                    State = x.State,
                    Total = x.Total,
                    Discount = x.DiscountAmount,
                }).ToListAsync();

            return new APIResultSuccess<List<OrderView>>(data);
        }

        public async Task<APIResult<OrderView>> GetById(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);

            if(order == null)
            {
                return new APIResultErrors<OrderView>("Not found");
            }

            var orderView = new OrderView()
            {
                Id = order.Id,
                CreateAt = order.CreateAt,
                Notes = order.Notes,
                Email = order.Email,
                Phone = order.Phone,
                Address = order.Address,
                CustomerName = order.CustomerName,
                QrCode = order.QrCode,
                State = order.State,
                Total = order.Total,
                Discount = order.DiscountAmount
            };

            return new APIResultSuccess<OrderView>(orderView);
        }

        public async Task<APIResult<List<OrderDetailView>>> GetOrderDetails(int orderId)
        {
            var listOrderDetail = await _context.OrderDetail.Where(x=>x.OrderId == orderId).ToListAsync();

            var listProductDetailId = listOrderDetail.Select(x => x.ProductDetailId).ToList();

            var listProductDetailInfo = await _productService.GetListProduct(listProductDetailId);

            var listData = from q in listOrderDetail
                           join p in listProductDetailInfo.Data on q.ProductDetailId equals p.ProductDetailId
                           select new { q, p };

            var data = listData
             .Select(x => new OrderDetailView()
             {
                 ProductName = x.p.ProductName,
                 ProductDetailId = x.p.ProductDetailId,
                 Quantity = x.q.Quantity,
                 TotalPriceProduct = x.q.TotalPriceProduct,
             }).ToList();

            return new APIResultSuccess<List<OrderDetailView>>(data);
        }

        public async Task<APIResult<bool>> UpdateStatus(string state, int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return new APIResultErrors<bool>("Not found");
            }

            order.State = state;

            await _context.SaveChangesAsync();

            return new APIResultSuccess<bool>();
        }
    }
}
