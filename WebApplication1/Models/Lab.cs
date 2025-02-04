using WebApplication1.Models.Entities;

namespace WebApplication1.Models.Entities
{
    public class Lab
    {
        public int Id { get; set; }
        public int VulnerabilityId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Solution { get; set; }
        public DifficultyLevel Difficulty { get; set; }
        public DateTime CreatedAt { get; set; }

        public Vulnerability Vulnerability { get; set; }
    }

    public enum DifficultyLevel
    {
        Easy,
        Medium,
        Hard
    }
}