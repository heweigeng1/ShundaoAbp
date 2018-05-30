using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Shundao.OrganizationStructure.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Shundao.OrganizationStructure
{
    public class StructureAppService : AsyncCrudAppService<Structure, StructureDto, Guid, PagedResultRequestDto, CreateStructureDto, StructureDto>, IStructureAppService
    {
        private readonly IRepository<Structure, Guid> _repository;
        public StructureAppService(IRepository<Structure, Guid> repository) :base(repository)
        {
            _repository = repository;
        }

        public void MoveNode()
        {
            throw new NotImplementedException();
        }
    }
}
