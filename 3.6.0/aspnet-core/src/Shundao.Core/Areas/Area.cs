using AbpTree.Domain;
using System.ComponentModel.DataAnnotations;

namespace Shundao.Areas
{
    public class Area : AbpTreeEntity<Area>
    {
        public const int CodeMaxLength = 32;

        [StringLength(CodeMaxLength)]
        public string Code { get; set; }
    }
}
