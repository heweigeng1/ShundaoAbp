using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using Shundao.Configuration.Dto;

namespace Shundao.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : ShundaoAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
