using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Runtime.Caching;
using AbpTree.Domain;
using System;

namespace Shundao.Areas
{
    public class AreaManager : TreeManager<Area>, ISingletonDependency
    {
        public AreaManager(IRepository<Area,Guid> repository,ICacheManager cache) : base(repository,cache)
        {

        }
    }
}
