using System.Threading.Tasks;
using Abp.Application.Services;
using Shundao.Sessions.Dto;

namespace Shundao.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
