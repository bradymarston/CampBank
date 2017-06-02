using System.Collections.Generic;
using System.Threading.Tasks;
using CampBank.Core.Model;

namespace CampBank.Core
{
    public interface IKidRepository
    {
        void Add(Kid newKid);
        Task<Kid> GetKidAsync(int kidId, bool includeRelated = false);
        Task<ICollection<Kid>> GetKidsAsync(bool includeRelated = false);
        Task<bool> KidExistsAsync(int kidId);
        void Remove(Kid kidToDelete);
        void AddTransaction(Kid kid, TransactionType type, float amount, string userName);
    }
}