﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Shundao.Configuration;
using WxOpenApi;

namespace Shundao.Web.Host.Startup
{
    [DependsOn(
       typeof(ShundaoWebCoreModule))]
    public class ShundaoWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public ShundaoWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ShundaoWebHostModule).GetAssembly());
        }
    }
}
