using Abp.Domain.Entities;
using AbpTree.Domain;
using System.ComponentModel.DataAnnotations;

namespace Shundao.OrganizationStructure
{
    /// <summary>
    /// 结构
    /// </summary>
    public class Structure : AbpTreeEntity<Structure>,IMayHaveTenant
    {
        public const int CodeMaxLength = 32;
        [StringLength(CodeMaxLength)]
        public string Code { get; set; }
        /// <summary>
        /// 负责人
        /// </summary>
        public long? Principal { get; set; }
        public int? TenantId { get ; set ; }
    }
}
