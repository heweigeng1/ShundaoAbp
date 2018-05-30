using Abp.AutoMapper;
using AbpTree.Domain;
using AbpTree.Dtos;
using System;
using System.ComponentModel.DataAnnotations;

namespace Shundao.Areas.Dto
{
    [AutoMap(typeof(Area))]
    public class CreateAreaDto 
    {
        public Guid? ParentId { get; set; }
        [StringLength(AbpTreeEntity<Area>.NodeNameMaxLength)]
        public string NodeName { get; set; }
        /// <summary>
        /// 路径
        /// </summary>
        public string Path { get; set; }
        /// <summary>
        /// 深度
        /// </summary>
        public int Depth { get; set; }
        /// <summary>
        /// 排序
        /// </summary>
        public int Sorted { get; set; }
    }
}
