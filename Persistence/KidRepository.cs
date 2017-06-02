using CampBank.Core;
using CampBank.Core.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Persistence
{
    public class KidRepository : IKidRepository
    {
        private readonly ApplicationDbContext _context;

        public KidRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(Kid newKid)
        {
            _context.Add(newKid);
        }

        public void Remove(Kid kidToDelete)
        {
            _context.Remove(kidToDelete);
        }

        public void AddTransaction(Kid kid, TransactionType type, float amount, string userName)
        {
            var newTransaction = new Transaction
            {
                Type = type,
                Amount = amount,
                KidId = kid.Id,
                Kid = kid,
                UserName = userName,
                TimeStamp = DateTime.UtcNow
            };

            kid.Transactions.Add(newTransaction);

            _context.Add(newTransaction);
        }

        public async Task<Kid> GetKidAsync(int kidId, bool includeRelated = false)
        {
            if (!includeRelated)
                return await _context.Kids.FindAsync(kidId);

            return await _context.Kids.Include(k => k.Cabin).Include(k => k.Transactions).SingleOrDefaultAsync(k => k.Id == kidId);
        }

        public async Task<ICollection<Kid>> GetKidsAsync(bool includeRelated = false)
        {
            if (!includeRelated)
                return await _context.Kids.ToListAsync();

            return await _context.Kids.Include(k => k.Cabin).Include(k => k.Transactions).ToListAsync();
        }

        public async Task<bool> KidExistsAsync(int kidId)
        {
            return (await _context.Kids.CountAsync(k => k.Id == kidId)) > 0;
        }
    }
}
