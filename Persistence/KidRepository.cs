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

        public async Task<Kid> GetKidAsync(int kidId, bool includeRelated = false)
        {
            if (!includeRelated)
                return await _context.Kids.FindAsync(kidId);

            return await _context.Kids.Include(k => k.Cabin).SingleOrDefaultAsync(k => k.Id == kidId);
        }

        public async Task<ICollection<Kid>> GetKidsAsync(bool includeRelated = false)
        {
            if (!includeRelated)
                return await _context.Kids.ToListAsync();

            return await _context.Kids.Include(k => k.Cabin).ToListAsync();
        }

        public async Task<bool> KidExistsAsync(int kidId)
        {
            return (await _context.Kids.CountAsync(k => k.Id == kidId)) > 0;
        }
    }
}
