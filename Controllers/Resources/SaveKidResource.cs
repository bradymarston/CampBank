using CampBank.Core;
using CampBank.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampBank.Controllers.Resources
{
    public class SaveKidResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CabinId { get; set; }

        public Kid ToData()
        {
            return new Kid
            {
                Name = Name,
                CabinId = CabinId
            };
        }

        public async Task UpdateDataAsync(Kid data, ICabinRepository cabinRepository)
        {
            data.Name = Name;
            if (data.CabinId != CabinId)
            {
                data.CabinId = CabinId;
                data.Cabin = await cabinRepository.GetCabinAsync(CabinId);
            }
        }
    }
}
