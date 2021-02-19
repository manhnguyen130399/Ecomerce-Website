using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using USER_SERVICE_NET.Models;
using USER_SERVICE_NET.Services.Emails;
using USER_SERVICE_NET.ViewModels.CronJob;
using USER_SERVICE_NET.ViewModels.Emails;

namespace USER_SERVICE_NET.Services.CronJob
{

    public class SendPromotionService : CronJobService
    {
        private readonly IServiceProvider _services;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public SendPromotionService(IScheduleConfig<SendPromotionService> config, IServiceProvider services, IWebHostEnvironment webHostEnvironment)
            : base(config.CronExpression, config.TimeZoneInfo)
        {
            _services = services;
            _webHostEnvironment = webHostEnvironment;
        }

        public override async Task DoWork(CancellationToken cancellationToken)
        {
            using (var scope = _services.CreateScope())
            {
                var _context = scope.ServiceProvider.GetRequiredService<ShopicaContext>();

                var listCutomerMails = await _context.Customer.Select(x => x.Email).ToListAsync();

                var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "EmailTemplate", "ResetPassword.html");
                string contentTemplate = File.ReadAllText(filePath);

                var emailRequest = new EmailRequest();
                emailRequest.Subject = "Promotion code daily";
                emailRequest.Recipients = listCutomerMails;
                emailRequest.Content = contentTemplate;
         
                var _emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();

                await _emailService.SendEmailAsync(emailRequest);
            }
           
        }
    }
}
