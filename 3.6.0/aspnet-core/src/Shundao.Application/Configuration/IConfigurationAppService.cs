using System.Threading.Tasks;
using Shundao.Configuration.Dto;

namespace Shundao.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
