using Abp.Authorization;
using Shundao.Authorization.Roles;
using Shundao.Authorization.Users;

namespace Shundao.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
