using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Newtonsoft.Json;
using ORDER_SERVICE_NET.Hubs;
using ORDER_SERVICE_NET.Models;
using ORDER_SERVICE_NET.Services.ProductServices;
using ORDER_SERVICE_NET.Utilities;
using ORDER_SERVICE_NET.ViewModels.Address;
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
        private readonly IHubContext<NotificationHub> _hubContext;
        public OrderService(ShopicaContext context, IProductService productService, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _productService = productService;
            _hubContext = hubContext;
        }
        public async Task<APIResult<string>> Create(OrderCreateRequest request)
        {
            try
            {
                var qrString = Helppers.GenerateQrString(request);
                var qrCodeData = await _productService.GetOrderQrCode(qrString);
                string address = JsonConvert.SerializeObject(request.Address);
                List<Orders> listOrders = new List<Orders>();

                foreach (var orderStore in request.OrderOneStores)
                {
                    var order = new Orders()
                    {
                        CustomerName = request.CustomerName,
                        Address = address,
                        Email = request.Email,
                        Phone = request.Phone,
                        State = Constant.PENDING,
                        Notes = orderStore.Notes,
                        QrCode = qrCodeData.Message == "OK" ? qrCodeData.Data : null,
                        Total = orderStore.Total,
                        Discount = orderStore.Discount,
                        CreateAt = DateTime.Now.ToString("yyyy-MM-dd H:mm:ss"),
                        StoreId = orderStore.StoreId,
                    };

                    foreach (var item in orderStore.OrderDetails)
                    {
                        var orderDetail = new OrderDetail
                        {
                            ProductDetailId = item.ProductDetailId,
                            Quantity = item.Quantity,
                            TotalPriceProduct = item.TotalPriceProduct,
                        };
                        order.OrderDetail.Add(orderDetail);
                    }

                    listOrders.Add(order);

                    _context.Orders.Add(order);

                    if (orderStore.PromotionId != 0)
                    {
                        order.PromotionId = orderStore.PromotionId;

                        var promotion = new CustomerPromo()
                        {
                            UsedAt = DateTime.Now.ToString("yyyy-MM-dd H:mm:ss"),
                            CustomerPhone = request.Phone,
                            PromotionId = orderStore.PromotionId
                        };

                        _context.CustomerPromo.Add(promotion);
                    }
                }

                await _context.SaveChangesAsync();

                foreach(var item in listOrders)
                {
                    var notify = new Notify()
                    {
                        Content = "You have a new order with orderId - " + item.Id,
                        StoreId = item.StoreId,
                        OrderId = item.Id,
                        Type = "Info",
                        IsRead = 0,
                        Created_At = DateTime.Now.ToString("yyyy-MM-dd H:mm:ss")
                    };

                    _context.Notify.Add(notify);
                    await _hubContext.Clients.User(item.StoreId.ToString()).SendAsync("NewOrderNotify", notify);
                }

                await _context.SaveChangesAsync();

                return new APIResultSuccess<string>("Order successfully");
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
            _context.Orders.Remove(order);

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
                    Discount = x.Discount
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
                    Address = JsonConvert.DeserializeObject<AddressInfo>(x.Address),
                    CustomerName = x.CustomerName,
                    QrCode = x.QrCode,
                    State = x.State,
                    Total = x.Total,
                    Discount = x.Discount,
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
                Address = JsonConvert.DeserializeObject<AddressInfo>(order.Address),
                CustomerName = order.CustomerName,
                QrCode = order.QrCode,
                State = order.State,
                Total = order.Total,
                Discount = order.Discount
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
