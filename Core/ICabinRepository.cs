using System.Collections.Generic;
using System.Threading.Tasks;
using CampBank.Core.Model;

namespace CampBank.Core
{
    public interface ICabinRepository
    {
        void Add(Cabin newCabin);
        Task<Cabin> GetCabinAsync(int cabinId, bool includeRelated = false);
        Task<ICollection<Cabin>> GetCabinsAsync(bool includeRelated = false);
        Task<bool> CabinExistsAsync(int cabinId);
        void Remove(Cabin cabinToDelete);
    }
}