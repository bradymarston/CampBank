using System.Collections.Generic;
using System.Threading.Tasks;
using CampBank.Core.Model;

namespace CampBank.Persistence
{
    public interface ITransactionRepository
    {
        Task AddAsync(Transaction newTransaction);
        Task<Transaction> GetTransactionAsync(int transactionId, bool includeRelated = false);
        Task<ICollection<Transaction>> GetTransactionsAsync(int kidId = 0, bool includeRelated = false);
        Task<bool> TransactionExistsAsync(int transactionId);
    }
}