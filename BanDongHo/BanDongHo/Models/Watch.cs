using System.ComponentModel.DataAnnotations;

namespace BanDongHo.Models
{
    public class Watch
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required(ErrorMessage = "Watch name is required!")]
        [Display(Name = "Watch name")]
        [MaxLength(100, ErrorMessage = "Watch name cannot exceed 100 characters")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Price is required")]
        [Range(0, 1000000000, ErrorMessage = "Price must be between 0 and 1,000,000,000.")]
        public int Price { get; set; }

        [Required(ErrorMessage = "Image URL is required.")]
        [Display(Name = "Image")]
        [MaxLength(200, ErrorMessage = "Image URL cannot exceed 200 characters.")]
        public string ImageUrl { get; set; } = string.Empty;
    }
}
