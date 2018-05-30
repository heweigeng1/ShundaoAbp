using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AbpTree.Dtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Shundao.OrganizationStructure.Dto
{
    [AutoMapFrom(typeof(Structure))]
    public class CreateStructureDto : AbpTreeDto<CreateStructureDto>
    {
        [Required]
        [StringLength(Structure.CodeMaxLength)]
        public string Code { get; set; }
        /// <summary>
        /// 负责人
        /// </summary>
        public long? Principal { get; set; }
    }
}
