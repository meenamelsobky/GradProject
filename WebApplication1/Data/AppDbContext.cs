using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models.Entities; // Replace with your namespace

namespace WebApplication1.Data
{
    public class AppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public DbSet<Vulnerability> Vulnerabilities { get; set; }
        public DbSet<Lab> Labs { get; set; }
        public DbSet<UserVulnerability> UserVulnerabilities { get; set; }

        // Remove the OnConfiguring method (configuration is handled in Program.cs)

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Required for Identity

            // Configure composite key for UserVulnerability
            modelBuilder.Entity<UserVulnerability>()
                .HasKey(uv => new { uv.UserId, uv.VulnerabilityId });

            // Configure relationships
            modelBuilder.Entity<UserVulnerability>()
                .HasOne(uv => uv.User)
                .WithMany(u => u.UserVulnerabilities)
                .HasForeignKey(uv => uv.UserId);

            modelBuilder.Entity<UserVulnerability>()
                .HasOne(uv => uv.Vulnerability)
                .WithMany(v => v.UserVulnerabilities)
                .HasForeignKey(uv => uv.VulnerabilityId);

            modelBuilder.Entity<Lab>()
                .HasOne(l => l.Vulnerability)
                .WithMany(v => v.Labs)
                .HasForeignKey(l => l.VulnerabilityId);
        }
    }
}