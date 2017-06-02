using CampBank.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Controllers.Resources
{
    public class TransactionResource
    {
        public int Id { get; set; }
        public TransactionType Type { get; set; }
        public float Amount { get; set; }
        public KidResource Kid { get; set; }
        public string UserName { get; set; }
        public DateTime TimeStamp { get; set; }

        public static TransactionResource FromData(Transaction data, bool includeRelated = false)
        {
            var resource = new TransactionResource
            {
                Id = data.Id,
                Type = data.Type,
                Amount = data.Amount,
                TimeStamp = data.TimeStamp,
                UserName = data.UserName
            };

            if (includeRelated)
                resource.Kid = KidResource.FromData(data.Kid);

            return resource;
        }
    }
}
