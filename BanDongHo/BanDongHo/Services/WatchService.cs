using BanDongHo.Models;
using BanDongHo.Repositories;
using Serilog;

namespace BanDongHo.Services
{
    public class WatchService : IWatchService
    {
        private readonly IWatchRepository _repo;
        private readonly ILogger<WatchService> _logger;

        public WatchService(IWatchRepository repo, ILogger<WatchService> logger)
        {
            _repo = repo;
            _logger = logger;
        }

        public async Task<IEnumerable<Watch>> GetAllAsync()
        {
            try
            {
                var watches = await _repo.GetAllAsync();
                _logger.LogInformation("Retrieving all watches");
                return watches;
            }
            catch (Exception ex)
            {
                _logger.LogError("{ExceptionType} - {Message}", ex.GetType().Name, ex.Message);
                throw;
            }
        }

        public async Task<Watch?> GetByIdAsync(Guid id)
        {
            try
            {
                var watch = await _repo.GetByIdAsync(id);

                if (watch == null)
                {
                    _logger.LogWarning("GetById: Watch with ID {Id} not found", id);
                }
                else
                {
                    _logger.LogInformation("GetById: Found watch {Name} with ID {Id}", watch.Name, watch.Id);
                }
                return watch;
            }
            catch (Exception ex)
            {
                _logger.LogError("{ExceptionType} - {Message}", ex.GetType().Name, ex.Message);
                throw;
            }
        }

        public async Task CreateAsync(Watch watch)
        {
            try
            {
                var exists = await _repo.GetByNameAsync(watch.Name);
                if (exists != null)
                {
                    _logger.LogWarning("Create: Watch with name {Name} already exists", watch.Name);
                    throw new InvalidOperationException($"Watch with name '{watch.Name}' already exists.");
                }

                await _repo.CreateAsync(watch);
                _logger.LogInformation("Created new watch {Name} with ID {Id}", watch.Name, watch.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError("{ExceptionType} - {Message}", ex.GetType().Name, ex.Message);
                throw;
            }
        }

        public async Task<bool> UpdateAsync(Guid id, Watch watch)
        {
            try
            {
                var existingWatch = await _repo.GetByIdAsync(id);
                if (existingWatch == null)
                {
                    _logger.LogWarning("Update: Watch with ID {Id} not found", id);
                    return false;
                }
                var otherWatch = await _repo.GetByNameAsync(watch.Name);
                if (otherWatch != null && otherWatch.Id != id)
                {
                    _logger.LogWarning("Update: Watch with name {Name} already exists", watch.Name);
                    throw new InvalidOperationException($"Watch with name '{watch.Name}' already exists.");
                }
                existingWatch.Name = watch.Name;
                existingWatch.Price = watch.Price;
                existingWatch.ImageUrl = watch.ImageUrl;
                await _repo.UpdateAsync(existingWatch);
                _logger.LogInformation("Updated watch {Name} with ID {Id}", existingWatch.Name, existingWatch.Id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError("{ExceptionType} - {Message}", ex.GetType().Name, ex.Message);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                var existingWatch = await _repo.GetByIdAsync(id);
                if (existingWatch == null)
                {
                    _logger.LogWarning("Delete: Watch with ID {Id} not found", id);
                    return false;
                }
                await _repo.DeleteAsync(id);
                _logger.LogInformation("Deleted watch with ID {Id}", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError("{ExceptionType} - {Message}", ex.GetType().Name, ex.Message);
                throw;
            }
        }
    }
}
