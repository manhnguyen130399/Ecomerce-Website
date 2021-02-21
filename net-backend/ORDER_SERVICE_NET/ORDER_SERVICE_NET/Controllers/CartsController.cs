using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ORDER_SERVICE_NET.Services.CartServices;
using ORDER_SERVICE_NET.ViewModels.Carts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ORDER_SERVICE_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartsController : ControllerBase
    {
        private readonly ICartService _cartService;
        public CartsController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("GetCart/{customerId}")]
        public async Task<IActionResult> GetCart(int customerId)
        {
            var result = await _cartService.GetById(customerId);

            if (!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("DeleteCartItem")]
        public async Task<IActionResult> GetCart(int cartId, int productDetailId, decimal priceChange)
        {
            var result = await _cartService.DeleteItem(cartId, productDetailId, priceChange);

            if (!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("AddToCart")]
        public async Task<IActionResult> AddToCart(CartItemCreateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _cartService.AddToCart(request);

            if (!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("ChangeQuantity")]
        public async Task<IActionResult> ChangeQuantity(CartItemCreateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _cartService.ChangeQuantity(request);

            if (!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }
    }
}
