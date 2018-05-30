using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Shundao.MultiTenancy.Dto;

namespace Shundao.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}
