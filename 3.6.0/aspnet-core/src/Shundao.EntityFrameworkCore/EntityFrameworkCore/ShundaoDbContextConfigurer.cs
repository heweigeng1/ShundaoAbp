using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Shundao.EntityFrameworkCore
{
    public static class ShundaoDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ShundaoDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ShundaoDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
