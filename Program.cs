using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CampBank.Persistence;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.CommandLine;
using Microsoft.Extensions.DependencyInjection;

namespace CampBank
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);

            var scope = host.Services.CreateScope();

            ((ApplicationDbContext)scope.ServiceProvider.GetService(typeof(ApplicationDbContext))).Database.Migrate();

            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
