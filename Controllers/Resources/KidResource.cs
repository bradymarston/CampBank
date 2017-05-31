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

        public static KidResource FromData(Kid data)
        {
            var resource = new KidResource
            {
                Id = data.Id,
                Name = data.Name,
                Balance = data.Balance,
                CabinId = data.CabinId
            };

            if (data.Cabin != null)
                resource.Cabin = CabinResource.FromData(data.Cabin);

            return resource;
        }
    }
}
