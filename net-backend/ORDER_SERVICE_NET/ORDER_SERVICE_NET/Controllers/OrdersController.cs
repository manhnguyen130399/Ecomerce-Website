using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ORDER_SERVICE_NET.Services.OrderServices;
using ORDER_SERVICE_NET.ViewModels.Commons.Pagging;
using ORDER_SERVICE_NET.ViewModels.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ORDER_SERVICE_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create(OrderCreateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _orderService.Create(request);

            if(!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetOrderDetails([FromQuery] PaggingRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _orderService.GetAll(request);

            if (!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("GetAllByUser/{email}")]
        public async Task<IActionResult> GetAllByUser(string email)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _orderService.GetAllByUser(email);

            if (!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("GetById/{orderId}")]
        public async Task<IActionResult> GetById(int orderId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _orderService.GetById(orderId);

            if (!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }


        [HttpGet("GetOrderDetails/{orderId}")]
        public async Task<IActionResult> GetOrderDetails(int orderId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _orderService.GetOrderDetails(orderId);

            if(!result.IsSuccessed) return BadRequest(result);

            return Ok(result);
        }
    }
}
