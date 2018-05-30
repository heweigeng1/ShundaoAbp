using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Shundao.Configuration;
using Shundao.Web;

namespace Shundao.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class ShundaoDbContextFactory : IDesignTimeDbContextFactory<ShundaoDbContext>
    {
        public ShundaoDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ShundaoDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            ShundaoDbContextConfigurer.Configure(builder, configuration.GetConnectionString(ShundaoConsts.ConnectionStringName));

            return new ShundaoDbContext(builder.Options);
        }
    }
}
