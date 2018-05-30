using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Shundao.Common.Paged.Dto
{
    public class AntdProPagedDto: PagedResultRequestDto
    {
        [Display(Name = "pageSize")]
        [JsonProperty("pageSize")]
        public override int MaxResultCount { get; set; }
        [JsonProperty("skip")]
        public override int SkipCount { get; set; }
        [Display(Name = "sorter")]
        [JsonProperty("sorter")]
        public string Sorter { get; set; }
        [Display(Name = "current")]
        [JsonProperty("current")]
        public string Current { get; set; }
    }
}
