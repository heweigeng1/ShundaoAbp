using Abp.Domain.Repositories;
using Abp.Runtime.Caching;
using AbpTree.Domain;
using System;

namespace Shundao.OrganizationStructure
{
    public class StructureManager : TreeManager<Structure>
    {
        public StructureManager(IRepository<Structure, Guid> _repository,ICacheManager cache) :base(_repository,cache)
        {

        }
    }
}
