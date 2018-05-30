using Abp.AutoMapper;
using AbpTree.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Shundao.OrganizationStructure.Dto
{
    [AutoMapFrom(typeof(Structure))]
    public class StructureDto:AbpTreeDto<StructureDto>
    {
        public string Code { get; set; }
        /// <summary>
        /// 负责人
        /// </summary>
        public long? Principal { get; set; }
    }
}
