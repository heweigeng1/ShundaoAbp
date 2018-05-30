using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Shundao.Authorization.Roles;
using Shundao.Authorization.Users;
using Shundao.MultiTenancy;
using Shundao.Areas;

namespace Shundao.EntityFrameworkCore
{
    public class ShundaoDbContext : AbpZeroDbContext<Tenant, Role, User, ShundaoDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Area> Areas { get; set; }
        public ShundaoDbContext(DbContextOptions<ShundaoDbContext> options)
            : base(options)
        {
        }
    }
}
