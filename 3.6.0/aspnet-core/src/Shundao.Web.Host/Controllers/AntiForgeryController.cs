using Microsoft.AspNetCore.Antiforgery;
using Shundao.Controllers;

namespace Shundao.Web.Host.Controllers
{
    public class AntiForgeryController : ShundaoControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
