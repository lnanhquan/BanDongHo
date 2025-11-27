namespace BanDongHo.DTOs
{
    public class CartItemDTO
    {
        public Guid Id { get; set; }
        public Guid WatchId { get; set; }
        public string WatchName { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int Total => Price * Quantity;
    }
}
