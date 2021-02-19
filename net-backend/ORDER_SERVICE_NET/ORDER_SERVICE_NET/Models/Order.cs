using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ORDER_SERVICE_NET.Models
{
    public partial class Order
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string State { get; set; }
        public string QrCode { get; set; }
        public decimal? Total { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public int StoreId { get; set; }
        public int? PromotionId { get; set; }
    }
}
