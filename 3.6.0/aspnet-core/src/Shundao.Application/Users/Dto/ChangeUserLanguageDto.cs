using System.ComponentModel.DataAnnotations;

namespace Shundao.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}