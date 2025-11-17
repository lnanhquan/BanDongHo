using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BanDongHo.Models
{
    public class InvoiceDetail
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        // ----- FK đến Hóa Đơn -----
        [Required]
        public Guid InvoiceId { get; set; }

        // Navigation property đến Hóa Đơn
        [ForeignKey("InvoiceId")]
        public Invoice Invoice { get; set; } = null!;

        // ----- FK đến Đồng Hồ -----
        [Required]
        public Guid WatchId { get; set; } 

        // Navigation property đến Đồng Hồ
        [ForeignKey("WatchId")]
        public Watch Watch { get; set; } = null!;

        [Required]
        [Range(1, 1000)]
        [Display(Name = "Quantity")]
        public int Quantity { get; set; }

        [Required]
        [Display(Name = "Price")]
        [Range(0, 1000000000, ErrorMessage = "Price must be between 0 and 1,000,000,000.")]
        public int Price { get; set; }

        // Tính tổng tiền của Chi tiết hóa đơn nhưng không lưu vào DB
        [NotMapped]
        public int Total => Quantity * Price;
    }
}
