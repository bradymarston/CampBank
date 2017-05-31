using CampBank.Core.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Cabin> Cabins { get; set; }
        public DbSet<Kid> Kids { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
    }
}
