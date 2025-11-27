using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BanDongHo.Models
{
    public class CartItem
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string UserId { get; set; } = string.Empty;

        // Navigation property đến User
        public User User { get; set; } = null!;

        [Required]
        public Guid WatchId { get; set; }

        // Navigation property đến Watch
        public Watch Watch { get; set; } = null!;

        [Required]
        [Range(1, 1000)]
        public int Quantity { get; set; }

        [NotMapped]
        public int Total => Quantity * Watch.Price;
    }
}
