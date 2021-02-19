using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace USER_SERVICE_NET.ViewModels.Promotions
{
    public class PromotionResponse
    {
        public string QrCode { get; set; }
        public string Code { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int Discount { get; set; }
        public string StoreName { get; set; }
        public string StoreUrl { get; set; }
    }
}
