using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Shundao.Paged
{
    public interface IPageAndFilteredInput<TEntity>
    {
        PageRequest Pagination { get; set; }
        IQueryable<TEntity> Filtered(IQueryable<TEntity> query);
    }
}
