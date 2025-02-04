using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using WebApplication1.Models.Entities;


namespace WebApplication1.Models.Entities
{
    public class User : IdentityUser<int>
    {
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<UserVulnerability> UserVulnerabilities { get; set; }
    }
}