using CampBank.Core;
using CampBank.Core.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Persistence
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IKidRepository _kidRepository;

        public TransactionRepository(ApplicationDbContext context, IKidRepository kidRepository)
        {
            _context = context;
            _kidRepository = kidRepository;
        }

        public async Task AddAsync(Transaction newTransaction)
        {
            var kid = await _kidRepository.GetKidAsync(newTransaction.KidId);

            newTransaction.Kid = kid;

            kid.Transactions.Add(newTransaction);

            _context.Add(newTransaction);
        }

        public async Task<Transaction> GetTransactionAsync(int transactionId, bool includeRelated = false)
        {
            if (!includeRelated)
                return await _context.Transactions.FindAsync(transactionId);

            return await _context.Transactions.Include(c => c.Kid).SingleOrDefaultAsync(c => c.Id == transactionId);
        }

        public async Task<ICollection<Transaction>> GetTransactionsAsync(int kidId = 0, bool includeRelated = false)
        {
            if (!includeRelated && kidId == 0)
                return await _context.Transactions.ToListAsync();

            if (includeRelated && kidId == 0)
                return await _context.Transactions.Include(c => c.Kid).ToListAsync();

            if (!includeRelated && kidId > 0)
                return await _context.Transactions.Where(t => t.KidId == kidId).ToArrayAsync();

            return await _context.Transactions.Where(t => t.KidId == kidId).Include(t => t.Kid).ToListAsync();
        }

        public async Task<bool> TransactionExistsAsync(int transactionId)
        {
            return (await _context.Transactions.CountAsync(c => c.Id == transactionId)) > 0;
        }
    }
}
