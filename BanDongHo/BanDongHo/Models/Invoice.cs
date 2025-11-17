using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BanDongHo.Models
{
    public class Invoice
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string UserId { get; set; } = string.Empty;

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;

        [Required]
        [Display(Name = "Created At")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        // Navigation property: 1 Hóa đơn có nhiều Chi tiết hóa đơn
        public ICollection<InvoiceDetail> InvoiceDetails { get; set; } = new List<InvoiceDetail>();


        // Tính tổng tiền của hóa đơn nhưng không lưu vào DB
        [NotMapped]
        public int TotalAmount => InvoiceDetails.Sum(detail => detail.Total);

    }
}
