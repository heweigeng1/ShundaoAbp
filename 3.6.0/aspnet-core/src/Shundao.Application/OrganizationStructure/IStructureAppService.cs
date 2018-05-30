using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Shundao.OrganizationStructure.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Shundao.OrganizationStructure
{
    public interface IStructureAppService:IAsyncCrudAppService<StructureDto,Guid,PagedResultRequestDto,CreateStructureDto,StructureDto>
    {
        void MoveNode();
    }
}
