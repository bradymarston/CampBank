using CampBank.Core.Model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Controllers.Resources
{
    public class CabinResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<KidResource> Kids { get; set; }

        public CabinResource()
        {
            Kids = new Collection<KidResource>();
        }

        public static CabinResource FromData(Cabin data)
        {
            var resource = new CabinResource
            {
                Id = data.Id,
                Name = data.Name
            };

            if (data.Kids != null)
            {
                resource.Kids = data.Kids.Select(k => KidResource.FromData(k)).ToList();
            }

            return resource;
        }
    }
}
