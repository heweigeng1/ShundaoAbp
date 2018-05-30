using Abp.Application.Services.Dto;
using System.Linq;
using Newtonsoft.Json;
using System;
using System.Linq.Expressions;
using Shundao.Paged;

namespace Shundao.Areas.Dto
{
    public class SearchAreaInput :  IPageAndFilteredInput<Area>
    {
        public string NodeName { get; set; }
        public PageRequest Pagination { get; set; }
        public IQueryable<Area> Filtered(IQueryable<Area> query)
        {
            if (!string.IsNullOrEmpty(NodeName))
            {
                query = query.Where(c => c.NodeName.Contains(NodeName));
            }
            return query;
        }
    }
}
