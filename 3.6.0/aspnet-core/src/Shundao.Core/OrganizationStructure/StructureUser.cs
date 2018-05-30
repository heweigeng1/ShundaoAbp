using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Shundao.OrganizationStructure
{
    public class StructureUser : Entity<Guid>, IMayHaveTenant
    {
        public long UserId { get; set; }
        public Guid StructureId { get; set; }
        public int? TenantId { get; set; }
    }
}
