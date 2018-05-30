using Abp.AutoMapper;
using AbpTree.Dtos;
using System.ComponentModel.DataAnnotations;

namespace Shundao.Areas.Dto
{
    [AutoMap(typeof(Area))]
    public class AreaDto : AbpTreeDto<AreaDto>
    {
        public string Code { get; set; }
    }
}
