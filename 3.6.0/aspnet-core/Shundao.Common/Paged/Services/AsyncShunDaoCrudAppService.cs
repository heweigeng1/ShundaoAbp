using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.ObjectMapping;
using Microsoft.AspNetCore.Mvc;
using Shundao.Common.Paged.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Shundao.Common.Paged.Services
{
    public abstract class AsyncShundaoCrudAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreatedInput, TUpdatedInput> : CrudAppServiceBase<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreatedInput, TUpdatedInput>, IAsyncShundaoCrudAppService<TEntityDto, TPrimaryKey, TGetAllInput, TCreatedInput, TUpdatedInput>
        where TUpdatedInput : IEntityDto<TPrimaryKey>
        where TEntityDto : IEntityDto<TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        private readonly IRepository<TEntity, TPrimaryKey> _repository;
        public AsyncShundaoCrudAppService(IRepository<TEntity, TPrimaryKey> repository) : base(repository)
        {
            _repository = repository;
        }
        public virtual async Task<TEntityDto> Create(TCreatedInput input)
        {
            var entity = MapToEntity(input);
            await _repository.InsertAsync(entity);
            await UnitOfWorkManager.Current.SaveChangesAsync();
            return MapToEntityDto(entity);
        }

        public virtual Task Delete(EntityDto<TPrimaryKey> input)
        {
            throw new NotImplementedException();
        }
        //[HttpPost]
        public virtual Task<TEntityDto> Get(EntityDto<TPrimaryKey> input)
        {
            throw new NotImplementedException();
        }

        public virtual Task<PagedResultDto<TEntityDto>> GetAll(TGetAllInput input)
        {
            throw new NotImplementedException();
        }

        public virtual Task<TEntityDto> Update(TUpdatedInput input)
        {
            throw new NotImplementedException();
        }
    }
}
