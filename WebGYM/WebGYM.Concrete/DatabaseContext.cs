using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebGYM.Models;

namespace WebGYM.Concrete
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            
        }

        public DbSet<SchemeMaster> SchemeMaster { get; set; }
        public DbSet<PeriodTB> PeriodTb { get; set; }
        public DbSet<PlanMaster> PlanMaster { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<MemberRegistration> MemberRegistration { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<UsersInRoles> UsersInRoles { get; set; }
        public DbSet<PaymentDetails> PaymentDetails { get; set; }
    }
}
