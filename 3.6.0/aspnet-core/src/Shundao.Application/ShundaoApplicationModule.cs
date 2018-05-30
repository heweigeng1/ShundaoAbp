using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AbpTree;
using Shundao.Authorization;
using WxOpenApi;

namespace Shundao
{
    [DependsOn(
        typeof(ShundaoCoreModule),
        typeof(AbpAutoMapperModule),
        typeof(WxOpenApiModule),
        typeof(AbpTreeModule)
        )]
    public class ShundaoApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<ShundaoAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(ShundaoApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}
