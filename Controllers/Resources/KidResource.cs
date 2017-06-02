using CampBank.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Controllers.Resources
{
    public class KidResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Balance { get; set; }
        public int CabinId { get; set; }
        public CabinResource Cabin { get; set; }
        public ICollection<TransactionResource> Transactions { get; set; }

        public static KidResource FromData(Kid data, bool includeRelated = false)
        {
            var resource = new KidResource
            {
                Id = data.Id,
                Name = data.Name,
                Balance = data.Balance,
                CabinId = data.CabinId
            };

            if (includeRelated)
            {
                resource.Cabin = CabinResource.FromData(data.Cabin);
                resource.Transactions = data.Transactions.Select(t => new TransactionResource
                {
                    Id = t.Id,
                    Type = t.Type,
                    Amount = t.Amount,
                    UserName = t.UserName,
                    TimeStamp = t.TimeStamp
                }).ToList();
            }

            return resource;
        }
    }
}
