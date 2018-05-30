using Shundao.Authorization.Users;
using Shundao.Paged;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Shundao.Users.Dto
{
    public class SearchUserInput : IPageAndFilteredInput<User>
    {
        public string UserName { get; set; }
        public PageRequest Pagination { get; set ; }

        public IQueryable<User> Filtered(IQueryable<User> query)
        {
            if (!string.IsNullOrEmpty(UserName))
            {
                query = query.Where(c => c.UserName.Contains(UserName));
            }
            return query;
        }
    }
}
