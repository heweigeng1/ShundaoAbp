using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Shundao.Roles.Dto;
using Shundao.Users.Dto;

namespace Shundao.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, SearchUserInput, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
