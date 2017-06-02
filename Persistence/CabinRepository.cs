using CampBank.Core;
using CampBank.Core.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Persistence
{
    public class CabinRepository : ICabinRepository
    {
        private readonly ApplicationDbContext _context;

        public CabinRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(Cabin newCabin)
        {
            _context.Add(newCabin);
        }

        public void Remove(Cabin cabinToDelete)
        {
            _context.Remove(cabinToDelete);
        }

        public async Task<Cabin> GetCabinAsync(int cabinId, bool includeRelated = false)
        {
            if (!includeRelated)
                return await _context.Cabins.FindAsync(cabinId);

            return await _context.Cabins.Include(c => c.Kids).ThenInclude(k => k.Transactions).SingleOrDefaultAsync(c => c.Id == cabinId);
        }

        public async Task<ICollection<Cabin>> GetCabinsAsync(bool includeRelated = false)
        {
            if (!includeRelated)
                return await _context.Cabins.ToListAsync();

            return await _context.Cabins.Include(c => c.Kids).ThenInclude(k => k.Transactions).ToListAsync();
        }

        public async Task<bool> CabinExistsAsync(int cabinId)
        {
            return (await _context.Cabins.CountAsync(c => c.Id == cabinId)) > 0;
        }
    }
}