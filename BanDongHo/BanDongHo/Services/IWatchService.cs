using BanDongHo.Models;

namespace BanDongHo.Services
{
    public interface IWatchService
    {
        Task<IEnumerable<Watch>> GetAllAsync();
        Task<Watch?> GetByIdAsync(Guid id);
        Task CreateAsync(Watch watch);
        Task<bool> UpdateAsync(Guid id, Watch watch);
        Task<bool> DeleteAsync(Guid id);
    }
}
