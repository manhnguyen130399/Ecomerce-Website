using Microsoft.EntityFrameworkCore;
using ORDER_SERVICE_NET.Models;
using ORDER_SERVICE_NET.Services.ProductServices;
using ORDER_SERVICE_NET.ViewModels.Carts;
using ORDER_SERVICE_NET.ViewModels.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ORDER_SERVICE_NET.Services.CartServices
{
    public class CartService : ICartService
    {
        private readonly ShopicaContext _context;
        private readonly IProductService _productService;
        public CartService(ShopicaContext context, IProductService productService)
        {
            _context = context;
            _productService = productService;
        }
        public async Task<APIResult<bool>> AddToCart(CartItemCreateRequest request)
        {
            var cart = await _context.Carts
                .Include(c => c.CartDetail)
                .FirstOrDefaultAsync(c => c.Id == request.CartID);
            if (cart == null)
            {

                var newCart = new Carts()
                {
                    CustomerId = request.CustomerId,
                    CartDetail = new List<CartDetail>()
                    {
                        new CartDetail()
                        {
                            ProductDetailId = request.ProductDetailID,
                            Quantity = request.Quantity
                        }
                    },
                    Total = request.Quantity * request.Price 
                };

                _context.Carts.Add(newCart);

                await _context.SaveChangesAsync();

                return new APIResultSuccess<bool>();
            }

            cart.Total += request.Quantity * request.Price;

            var cartDetail = cart.CartDetail
                .FirstOrDefault(c => c.CartId == request.CartID && c.ProductDetailId == request.ProductDetailID);

            if(cartDetail == null)
            {

                var newCartDetail = new CartDetail()
                {
                    ProductDetailId = request.ProductDetailID,
                    Quantity = request.Quantity,
                    CartId = request.CartID,
                };

                cart.CartDetail.Add(newCartDetail);

                await _context.SaveChangesAsync();

                return new APIResultSuccess<bool>();

            }

            cartDetail.Quantity += request.Quantity;

            await _context.SaveChangesAsync();

            return new APIResultSuccess<bool>();
        }

        public Task<APIResult<bool>> Delete(int cartId)
        {
            throw new NotImplementedException();
        }

        public Task<APIResult<bool>> DeleteAll(int cartId)
        {
            throw new NotImplementedException();
        }

        public async Task<APIResult<bool>> DeleteItem(int cartId, int productDetailId, decimal priceChange)
        {
            var cart = await _context.Carts
                .Include(c => c.CartDetail)
                .FirstOrDefaultAsync(c => c.Id == cartId);
            if (cart != null)
            {
                var cartDetail = cart.CartDetail.FirstOrDefault(c => c.ProductDetailId == productDetailId);

                if (cartDetail != null)
                {
                    cart.Total -= priceChange;

                    _context.CartDetail.Remove(cartDetail);

                    await _context.SaveChangesAsync();

                    return new APIResultSuccess<bool>();
                }

                return new APIResultSuccess<bool>();
            }
            return new APIResultSuccess<bool>();

        }

        public async Task<APIResult<CartView>> GetById(int customerId)
        {
            var carts = await _context.Carts
                .Include(x => x.CartDetail)
                .FirstOrDefaultAsync(x => x.CustomerId == customerId);

            var listProductDetailId = carts.CartDetail.Select(x => x.ProductDetailId).ToList();

            var listProduct = await _productService.GetListProduct(listProductDetailId);

            var listProductDetail = from cd in carts.CartDetail
                         join l in listProduct.Data on cd.ProductDetailId equals l.ProductDetailId
                         select new { cd , l };

            var cartItemView = listProductDetail.Select(x => new CartItemView()
            {
                Quantity = x.cd.Quantity,
                Price = x.l.Price,
                ProductName = x.l.ProductName
            }).ToList();

            var result = new CartView()
            {
                Id = carts.Id,
                Total = carts.Total,
                CartItems = cartItemView
            };

            return new APIResultSuccess<CartView>(result);

        }

        public Task<APIResult<bool>> Update(CartCreateRequest request)
        {
            throw new NotImplementedException();
        }

        public async Task<APIResult<bool>> ChangeQuantity(CartItemCreateRequest request)
        {
            var cart = await _context.Carts
                .Include(c => c.CartDetail)
                .FirstOrDefaultAsync(c => c.Id == request.CartID);
            if (cart != null)
            {
                var cartDetail = cart.CartDetail.FirstOrDefault(cd => cd.ProductDetailId == request.ProductDetailID);

                if (cartDetail != null)
                {
                    cart.Total -= (cartDetail.Quantity - request.Quantity) * request.Price;
                    cartDetail.Quantity = request.Quantity;
                    await _context.SaveChangesAsync();
                    return new APIResultSuccess<bool>();
                }
                return new APIResultErrors<bool>();
            }
            return new APIResultErrors<bool>();
        }
    }
}
