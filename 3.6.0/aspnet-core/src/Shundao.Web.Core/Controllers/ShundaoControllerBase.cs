using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Shundao.Controllers
{
    public abstract class ShundaoControllerBase: AbpController
    {
        protected ShundaoControllerBase()
        {
            LocalizationSourceName = ShundaoConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
