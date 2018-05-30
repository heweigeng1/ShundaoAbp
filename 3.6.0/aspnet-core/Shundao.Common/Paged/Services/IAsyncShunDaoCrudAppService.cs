using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Shundao.Common.Paged.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Shundao.Common.Paged.Services
{
    public interface IAsyncShundaoCrudAppService<TEntityDto, TPrimaryKey, TGetAllInput, TCreatedInput, TUpdatedInput>
    {
        Task<TEntityDto> Create(TCreatedInput input);
        Task Delete(EntityDto<TPrimaryKey> input);
        Task<TEntityDto> Update(TUpdatedInput input);
        Task<TEntityDto> Get(EntityDto<TPrimaryKey> input);
        Task<PagedResultDto<TEntityDto>> GetAll(TGetAllInput input);
    }
}
