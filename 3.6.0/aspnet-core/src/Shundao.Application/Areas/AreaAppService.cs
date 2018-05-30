using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Web.Models;
using Shundao.Areas.Dto;
using WxOpenApi.AppPay;
using System.Linq;
using Shundao.Paged;

namespace Shundao.Areas
{
    public class AreaAppService : AsyncSundaoAbpCrudAppService<Area, AreaDto, Guid, SearchAreaInput, CreateAreaDto, AreaDto>, IAreaAppService
    {
        private readonly IRepository<Area, Guid> _areaRepository;
        private readonly AreaManager _areaManager;
        public AreaAppService(AreaManager areaManager, IRepository<Area, Guid> areaRepository, MobliePayAppService mobliePayAppService) : base(areaRepository)
        {
            _areaRepository = areaRepository;
            _areaManager = areaManager;
        }
        
        public AreaDto GetAreaMap()
        {
            var list = _areaManager.GetAllListCache();
            var area = list.Find(c => c.NodeName == "中国");
            return ObjectMapper.Map<AreaDto>(_areaManager.InitTree(list, area));
        }
    }
}
