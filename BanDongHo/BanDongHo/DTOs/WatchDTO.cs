using System.ComponentModel.DataAnnotations;

namespace BanDongHo.DTOs
{
    public class WatchDTO
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Watch name is required!")]
        [MaxLength(100, ErrorMessage = "Watch name cannot exceed 100 characters")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Price is required")]
        [Range(0, 1000000000, ErrorMessage = "Price must be between 0 and 1,000,000,000.")]
        public int Price { get; set; }

        public string? ImageUrl { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}
